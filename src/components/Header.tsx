import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <>
      <div className="top-space" aria-hidden="true" />
      <header className="site-header">
        <div className="column">
          <a className="brand" href="/">
            <span className="brand-tile" aria-hidden="true">
              ja
            </span>
            <span className="brand-text">
              <h1 className="brand-name">Jason Amadi</h1>
              <span className="brand-lagos" aria-hidden="true">
                lagos
              </span>
            </span>
            {/* The accessible name must contain the visible label, so it
                is content derived plus this invisible intent text. */}
            <span className="sr-only">go home</span>
          </a>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
