export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="column">
        <span>{year}</span>
        <span>Lagos, Nigeria</span>
        <a className="u-link" href="/PUBLIC_SURFACE_TODO.md">Open TODOs</a>
        <a className="u-link" href="/render-logos.mjs">Logo render script</a>
        <a className="u-link" href="/scripts/render-logos.mjs">Logo render script</a>
      </div>
    </footer>
  );
}
