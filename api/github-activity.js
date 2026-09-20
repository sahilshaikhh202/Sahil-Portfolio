const GITHUB_USERNAME = "sahilshaikhh202";
const GITHUB_CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

const parseTotalContributions = (html) => {
  const match = html.match(/<h2[^>]*>\s*([\d,]+)\s*contributions?\s*in the last year\s*<\/h2>/i);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, ""));
};

const parseContributionCells = (html) => {
  const dateMatches = [...html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*><\/td>\s*(?:<tool-tip[^>]*>(.*?)<\/tool-tip>)?/gi)];

  const contributionMap = new Map();

  dateMatches.forEach((match) => {
    const [, dateString, level, tooltipText = ""] = match;
    const countMatch = tooltipText.match(/(\d+)\s+contribution/i) || tooltipText.match(/No contributions/i);
    const count = countMatch && !/No contributions/i.test(tooltipText) ? Number(countMatch[1]) : 0;

    if (!dateString) return;

    contributionMap.set(dateString, {
      date: dateString,
      count,
      level: Number(level),
    });
  });

  return contributionMap;
};

const buildCalendarWeeks = (contributionMap) => {
  const dates = [...contributionMap.keys()].sort();
  if (dates.length === 0) return [];

  const earliestDate = new Date(`${dates[0]}T00:00:00`);
  const latestDate = new Date(`${dates[dates.length - 1]}T00:00:00`);

  const gridStart = new Date(earliestDate);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const gridEnd = new Date(latestDate);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  const weeks = [];
  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const week = [];

    for (let i = 0; i < 7; i += 1) {
      const dateKey = cursor.toISOString().slice(0, 10);
      const contribution = contributionMap.get(dateKey) ?? { date: dateKey, count: 0, level: 0 };
      week.push(contribution);
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
};

export default async function handler(request, response) {
  try {
    const result = await fetch(GITHUB_CONTRIBUTIONS_URL, {
      headers: {
        "User-Agent": "portfolio-github-activity",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!result.ok) {
      return response.status(result.status).json({
        totalContributions: 0,
        weeks: [],
        error: "GitHub public contribution page is unavailable.",
      });
    }

    const html = await result.text();
    const totalContributions = parseTotalContributions(html);
    const contributionMap = parseContributionCells(html);
    const weeks = buildCalendarWeeks(contributionMap);

    if (!weeks.length) {
      return response.status(404).json({
        totalContributions: 0,
        weeks: [],
        error: "GitHub contribution calendar could not be parsed.",
      });
    }

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return response.status(200).json({
      totalContributions,
      weeks,
    });
  } catch (error) {
    return response.status(503).json({
      totalContributions: 0,
      weeks: [],
      error: "Failed to load the public GitHub contribution calendar.",
    });
  }
}
