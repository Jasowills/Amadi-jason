import { useState, useEffect } from "react";
import { projects as fallbackProjects } from "../data/projects";

const GITHUB_USERNAME = "Jasowills";
const GITHUB_API = "https://api.github.com";

/**
 * Fetches repos from GitHub REST API, sorted by most recently pushed.
 * Filters out forks and profile-config repos.
 * Falls back to static data in projects.js if the API is unreachable.
 */
export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRepos() {
      try {
        const res = await fetch(
          `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=30&type=owner`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github.v3+json" },
          },
        );

        if (!res.ok) throw new Error(`GitHub API ${res.status}`);

        const data = await res.json();

        const filtered = data
          .filter(
            (r) =>
              !r.fork &&
              r.name !== GITHUB_USERNAME && // exclude profile config repo
              r.name !== "docs", // exclude docs repo
          )
          .slice(0, 8)
          .map((r) => ({
            title: formatRepoName(r.name),
            description: r.description || "",
            tech: [r.language].filter(Boolean),
            github: r.html_url,
            live: r.homepage || null,
            stars: r.stargazers_count,
            language: r.language,
            pushedAt: r.pushed_at,
          }));

        setRepos(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          // Fall back to static data
          setRepos(
            fallbackProjects.map((p) => ({
              ...p,
              stars: 0,
              language: p.tech[0] || null,
              pushedAt: null,
            })),
          );
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
    return () => controller.abort();
  }, []);

  return { repos, loading, error };
}

/** Converts repo-name-slug to Title Case */
function formatRepoName(name) {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
