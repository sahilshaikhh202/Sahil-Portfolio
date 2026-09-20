import { useEffect, useMemo, useState } from "react";

const GITHUB_USERNAME = "sahilshaikhh202";
const FALLBACK_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

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

const buildContributionCalendarFromEvents = (events) => {
  const counts = new Map();
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  events.forEach((event) => {
    if (!event?.created_at) return;
    const eventDate = new Date(event.created_at);
    if (eventDate < startDate || eventDate > endDate) return;
    const key = eventDate.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const calendarStart = new Date(startDate);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());

  const weeks = [];
  const cursor = new Date(calendarStart);
  const safetyLimit = 60;

  for (let weekIndex = 0; weekIndex < safetyLimit; weekIndex += 1) {
    const week = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const isoDate = cursor.toISOString().slice(0, 10);
      const count = counts.get(isoDate) ?? 0;
      week.push({
        date: isoDate,
        count,
        level: getContributionLevel(count),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
    if (cursor > endDate) break;
  }

  const totalContributions = [...counts.values()].reduce((sum, amount) => sum + amount, 0);
  return { totalContributions, weeks };
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

  if (Array.isArray(payload)) {
    return buildContributionCalendarFromEvents(payload);
  }

  return null;
};

export default function GitHubActivity() {
  const [calendar, setCalendar] = useState({ totalContributions: 0, weeks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchActivity = async () => {
      try {
        const endpoint = import.meta.env.PROD ? "/api/github-activity" : FALLBACK_ENDPOINT;
        const response = await fetch(endpoint, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("GitHub contribution response was not ok");
        }

        const payload = await response.json();
        const parsed = parseGitHubActivityPayload(payload);

        if (!parsed || !parsed.weeks?.length) {
          throw new Error("No contribution calendar data returned");
        }

        if (!ignore) {
          setCalendar(parsed);
          setError(false);
        }
      } catch (loadError) {
        if (ignore) return;

        try {
          const fallbackResponse = await fetch(FALLBACK_ENDPOINT, { cache: "no-store" });
          if (!fallbackResponse.ok) throw new Error("GitHub events fallback failed");
          const events = await fallbackResponse.json();
          const parsedFallback = buildContributionCalendarFromEvents(Array.isArray(events) ? events : []);
          setCalendar(parsedFallback);
          setError(false);
        } catch (fallbackError) {
          setCalendar({ totalContributions: 0, weeks: [] });
          setError(true);
        }
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

  const totalLabel = loading ? "Loading activity…" : `${calendar.totalContributions.toLocaleString()} contributions`;

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
          <p className="github-empty-state">Contribution data is temporarily unavailable.</p>
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
                        onMouseEnter={() => setActiveTooltip(day)}
                        onMouseLeave={() => setActiveTooltip((current) => (current?.date === day.date ? null : current))}
                        onFocus={() => setActiveTooltip(day)}
                        onBlur={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip((current) => (current?.date === day.date ? null : day))}
                      >
                        <span className="sr-only">{tooltipText}</span>
                      </button>

                      {isActive && (
                        <div className="github-tooltip" role="status" aria-live="polite">
                          <span>{tooltipDate}</span>
                          <strong>{day.count} contribution{day.count === 1 ? "" : "s"}</strong>
                        </div>
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
