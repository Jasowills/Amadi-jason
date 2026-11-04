import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <div className="column">
        <a className="brand" href="/" aria-label="Jason Amadi, home">
          <span className="brand-tile" aria-hidden="true">
            ja
          </span>
          <span className="brand-text">
            <h1 className="brand-name">Jason Amadi</h1>
            <span className="brand-lagos" aria-hidden="true">
              lagos
            </span>
          </span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
