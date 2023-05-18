import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createDataFile } from "../utils/file";
import Nav from "../components/nav";

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
      <h1 className="text-4xl font-extrabold tracking-tighter">Flashcards</h1>
      <Nav />
    </div>
  );
}
