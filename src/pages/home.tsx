import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createDataFile } from "../utils/file";

export default function Home() {
  useEffect(() => {
    (async () => {
      // if (!(await exists("./data", {
      //   dir: BaseDirectory.Desktop
      // }))) {
      //   console.log("Creating data folder")
      //   await createDataFolder();
      // } else {
      //   console.log("Data folder already exists")
      // }
      if (
        !(await exists("./data.json", {
          dir: BaseDirectory.Desktop,
        }))
      ) {
        console.log("Creating data file");
        await createDataFile();
      } else {
        console.log("Data file already exists");
      }
    })();
  }, []);

  return (
    <div className="mt-20 flex w-full flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tighter">flashcards</h1>
      <div className="space-x-4">
        <Link to={`/create`}>
          <button>Create</button>
        </Link>
        <Link to={`/questions`}>
          <button>Questions</button>
        </Link>
        <Link to={`/test`}>
          <button>Test</button>
        </Link>
      </div>
    </div>
  );
}
