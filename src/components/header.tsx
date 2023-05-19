import { Link, useLocation } from "react-router-dom";

const routes: { path: string; name: string }[] = [
  { path: "/", name: "Home" },
  { path: "/create", name: "Create" },
  { path: "/questions", name: "Questions" },
  { path: "/practice", name: "Practice" },
  { path: "/stats", name: "Stats" },
];

export default function Header() {
  const location = useLocation();

  const currentRoute = routes.find((route) => route.path === location.pathname);

  return (
    <div className="mb-4 flex flex-col items-center space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tighter">{currentRoute?.name ?? "Error"}</h1>
      <div className="space-x-4">
        {routes.map((route) => (
          <Link
            to={route.path}
            key={route.path}
            className={`rounded-full px-2 py-1 text-sm font-semibold hover:text-white ${
              location.pathname === route.path ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
