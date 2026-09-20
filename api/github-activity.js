export default async function handler(request, response) {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    return response.status(503).json({
      totalContributions: 0,
      weeks: [],
      error: "GitHub token is not configured.",
    });
  }

  const today = new Date();
  const from = new Date(today);
  from.setFullYear(today.getFullYear() - 1);

  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const result = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-github-activity",
    },
    body: JSON.stringify({
      query,
      variables: {
        username: "sahilshaikhh202",
        from: from.toISOString(),
        to: today.toISOString(),
      },
    }),
  });

  if (!result.ok) {
    const errorBody = await result.text();
    return response.status(result.status).json({
      totalContributions: 0,
      weeks: [],
      error: errorBody,
    });
  }

  const payload = await result.json();
  const calendar = payload?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return response.status(404).json({
      totalContributions: 0,
      weeks: [],
      error: "GitHub contributions calendar was not found for this profile.",
    });
  }

  response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  return response.status(200).json({
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  });
}
