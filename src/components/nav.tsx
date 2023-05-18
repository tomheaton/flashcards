import { Link, useLocation } from "react-router-dom";

const routes: { path: string; name: string }[] = [
  { path: "/", name: "Home" },
  { path: "/questions", name: "Questions" },
  { path: "/test", name: "Test" },
  { path: "/create", name: "Create" },
];

export default function Nav() {
  const location = useLocation();

  return (
    <div className="m-2 space-x-4">
      {routes.map((route) => (
        <Link to={route.path} key={route.path}>
          <button
            className={`rounded-full px-2 py-1 text-sm font-semibold hover:cursor-pointer hover:text-white ${
              location.pathname === route.path ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            {route.name}
          </button>
        </Link>
      ))}
    </div>
  );
}
