export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="column">
        <span>{year}</span>
        <span>Lagos, Nigeria</span>
      </div>
    </footer>
  );
}
