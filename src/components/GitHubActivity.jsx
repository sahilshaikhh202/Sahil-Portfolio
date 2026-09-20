import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const GITHUB_USERNAME = "sahilshaikhh202";

const isValidDate = (value) => value && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

const getContributionLevel = (count) => {
  if (count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
};

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const normalizeWeeks = (weeks) => {
  if (!Array.isArray(weeks)) return [];

  return weeks.map((week) =>
    (week?.contributionDays ?? week ?? []).map((day) => {
      const date = day?.date ?? day?.day;
      if (!date || !isValidDate(date)) return null;

      const count = Number(day?.contributionCount ?? day?.count ?? 0);
      return {
        date,
        count,
        level: getContributionLevel(count),
      };
    }).filter(Boolean),
  );
};

const parseGitHubActivityPayload = (payload) => {
  if (!payload) return null;

  if (payload.weeks) {
    const normalizedWeeks = normalizeWeeks(payload.weeks);
    const totalContributions = Number(payload.totalContributions ?? normalizedWeeks.flat().reduce((sum, day) => sum + Number(day.count ?? 0), 0));
    return {
      totalContributions,
      weeks: normalizedWeeks,
    };
  }

  if (payload.contributionCalendar?.weeks) {
    const normalizedWeeks = normalizeWeeks(payload.contributionCalendar.weeks);
    const totalContributions = Number(payload.contributionCalendar.totalContributions ?? normalizedWeeks.flat().reduce((sum, day) => sum + Number(day.count ?? 0), 0));
    return {
      totalContributions,
      weeks: normalizedWeeks,
    };
  }

  return null;
};

export default function GitHubActivity() {
  const [calendar, setCalendar] = useState({ totalContributions: 0, weeks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const showTooltip = (day, event) => {
    const cellBounds = event.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      ...day,
      tooltipX: cellBounds.left + cellBounds.width / 2,
      tooltipY: cellBounds.top - 10,
    });
  };

  useEffect(() => {
    let ignore = false;

    const fetchActivity = async () => {
      try {
        const response = await fetch("/api/github-activity", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("GitHub contribution data is unavailable in this environment.");
        }

        const payload = await response.json();
        const parsed = parseGitHubActivityPayload(payload);

        if (!parsed || !parsed.weeks?.length) {
          throw new Error("No contribution calendar data returned from GitHub.");
        }

        if (!ignore) {
          setCalendar(parsed);
          setError(false);
        }
      } catch (loadError) {
        if (ignore) return;
        setCalendar({ totalContributions: 0, weeks: [] });
        setError(true);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchActivity();

    return () => {
      ignore = true;
    };
  }, []);

  const monthLabels = useMemo(() => {
    const labels = [];
    let previousMonth = null;

    calendar.weeks.forEach((week, weekIndex) => {
      const firstDate = week?.[0]?.date;
      if (!firstDate || !isValidDate(firstDate)) return;
      const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(`${firstDate}T00:00:00`));
      if (monthLabel === previousMonth) return;
      previousMonth = monthLabel;
      labels.push({ label: monthLabel, index: weekIndex });
    });

    return labels;
  }, [calendar.weeks]);

  const flattenedCells = useMemo(
    () => calendar.weeks.flatMap((week, weekIndex) => week.map((day, dayIndex) => ({ ...day, weekIndex, dayIndex }))),
    [calendar.weeks],
  );

  const totalLabel = loading ? "Loading activity…" : error ? "Contribution data unavailable" : `${calendar.totalContributions.toLocaleString()} contributions`;

  return (
    <div className="github-activity">
      <div className="github-activity-header">
        <div className="github-activity-meta">
          <span className="eyebrow">Last 12 months</span>
          <strong>{totalLabel}</strong>
        </div>
        <a className="text-button github-profile-link" href="https://github.com/sahilshaikhh202" target="_blank" rel="noreferrer">View GitHub profile <span>↗</span></a>
      </div>

      <div className="github-graph-shell" aria-live="polite">
        {error ? (
          <p className="github-empty-state">GitHub contribution data is unavailable currently.</p>
        ) : (
          <div className="github-calendar" style={{"--calendar-weeks": Math.max(calendar.weeks.length, 1)}}>
            <div className="github-months" aria-hidden="true">
              {monthLabels.map(({ label, index }) => (
                <span key={`${label}-${index}`} style={{ gridColumn: `${index + 1}` }}>{label}</span>
              ))}
            </div>

            <div className="github-calendar-body">
              <div className="github-weekday-labels" aria-hidden="true">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="github-grid" role="grid" aria-label={`GitHub contribution calendar for ${GITHUB_USERNAME}`}>
                {flattenedCells.map((day) => {
                  const tooltipDate = formatDate(day.date);
                  const tooltipText = day.count === 0 ? `No contributions on ${tooltipDate}` : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${tooltipDate}`;
                  const isActive = activeTooltip?.date === day.date;

                  return (
                    <div key={`${day.date}-${day.weekIndex}-${day.dayIndex}`} className="github-cell-wrap" style={{ gridColumn: day.weekIndex + 1, gridRow: day.dayIndex + 1 }}>
                      <button
                        type="button"
                        className={`github-cell level-${day.level}`}
                        aria-label={tooltipText}
                        title={`${tooltipDate}\n${day.count} contribution${day.count === 1 ? "" : "s"}`}
                        onMouseEnter={(event) => showTooltip(day, event)}
                        onMouseLeave={() => setActiveTooltip((current) => (current?.date === day.date ? null : current))}
                        onFocus={(event) => showTooltip(day, event)}
                        onBlur={() => setActiveTooltip(null)}
                        onClick={(event) => setActiveTooltip((current) => (current?.date === day.date ? null : {
                          ...day,
                          tooltipX: event.currentTarget.getBoundingClientRect().left + event.currentTarget.offsetWidth / 2,
                          tooltipY: event.currentTarget.getBoundingClientRect().top - 10,
                        }))}
                      >
                        <span className="sr-only">{tooltipText}</span>
                      </button>

                      {isActive && createPortal(
                        <div className="github-tooltip" style={{ left: `${activeTooltip.tooltipX}px`, top: `${activeTooltip.tooltipY}px` }} role="status" aria-live="polite">
                          <span>{tooltipDate}</span>
                          <strong>{day.count} contribution{day.count === 1 ? "" : "s"}</strong>
                        </div>,
                        document.body,
                        `github-tooltip-${day.date}`,
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="github-legend" aria-label="Contribution level legend">
              <span>Less</span>
              <div className="github-legend-scale" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span key={level} className={`level-${level}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
