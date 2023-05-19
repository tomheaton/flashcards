import { BaseDirectory, exists } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import Header from "../components/header";
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
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center">
        <p className="text-sm font-semibold">Welcome to Flashcards!</p>
      </main>
    </div>
  );
}
