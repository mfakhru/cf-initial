import { Link, Outlet } from "@tanstack/react-router";

export function RootLayout() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #eee" }}>
        <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>Home</Link>
        <Link to="/health" activeProps={{ style: { fontWeight: "bold" } }}>Health</Link>
      </nav>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
