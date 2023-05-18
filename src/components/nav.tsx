import { Link, useLocation } from "react-router-dom";

const routes: { path: string; name: string }[] = [
  { path: "/", name: "Home" },
  { path: "/questions", name: "Questions" },
  { path: "/create", name: "Create" },
  { path: "/practice", name: "Practice" },
];

export default function Nav() {
  const location = useLocation();

  return (
    <div className="m-2 mb-4 space-x-4">
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
  );
}
