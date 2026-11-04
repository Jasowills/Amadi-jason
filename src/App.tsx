import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NotePage from "./components/NotePage";

// Minimal history router for / and /notes/<slug>. The deploy rewrites
// every path to index.html, so there is no server side beyond that.
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank") return;
      event.preventDefault();
      if (href !== window.location.pathname) {
        window.history.pushState({}, "", href);
      }
      setPath(href);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return path;
}

export default function App() {
  const path = useRoute();
  const noteMatch = path.match(/^\/notes\/([^/]+)\/?$/);
  const isHome = path === "/" || path === "";

  useEffect(() => {
    if (noteMatch) {
      const slug = noteMatch[1];
      const id = slug.replace(/^adr-/, "ADR-").toUpperCase();
      document.title = `${id}, Jason Amadi`;
    } else {
      document.title = "Jason Amadi, Software Engineer";
    }
  }, [noteMatch]);

  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="column" id="main-content">
        {isHome ? (
          <Home />
        ) : noteMatch ? (
          <NotePage slug={noteMatch[1]} />
        ) : (
          <div className="notfound">
            <h2>No page at that address</h2>
            <p>The page you are looking for does not exist, or moved.</p>
            <a className="u-link" href="/">
              Back home
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
