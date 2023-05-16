import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">Error!</h1>
      <Link to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
}
