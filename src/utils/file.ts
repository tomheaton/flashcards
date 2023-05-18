import { BaseDirectory, createDir, readTextFile, writeFile } from "@tauri-apps/api/fs";
import type { FlashcardType } from "../types";

// TODO: Create a data folder on first run
export const createDataFolder = async () => {
  try {
    await createDir("data", {
      dir: BaseDirectory.Desktop,
      recursive: true,
    });
  } catch (e) {
    console.error(e);
  }
};

export const createDataFile = async () => {
  try {
    await writeFile(
      {
        contents: "[]",
        // path: `./data/data.json`,
        path: `data.json`,
      },
      {
        dir: BaseDirectory.Desktop,
      },
    );
  } catch (e) {
    console.error(e);
  }
};

export const readData = async () => {
  try {
    const data = await readTextFile("data.json", {
      dir: BaseDirectory.Desktop,
    });

    return data;
  } catch (e) {
    console.error(e);
  }
};

// TODO: better error handling
export const saveFlashcard = async (flashcard: FlashcardType) => {
  try {
    let flashcards: FlashcardType[] = [];

    const data = await readData();

    if (data) {
      const parsedData = JSON.parse(data) as FlashcardType[];
      flashcards = parsedData;
    }

    flashcards.push(flashcard);

    await writeFile(
      {
        contents: JSON.stringify(flashcards, null, 2),
        path: `data.json`,
      },
      {
        dir: BaseDirectory.Desktop,
      },
    );
  } catch (e) {
    console.error(e);
  }
};

// TODO: better error handling
export const updateFlashcard = async (flashcard: FlashcardType, index: number) => {
  try {
    let flashcards: FlashcardType[] = [];

    const data = await readData();

    if (data) {
      const parsedData = JSON.parse(data) as FlashcardType[];
      flashcards = parsedData;
    }

    // flashcards.push(flashcard);
    flashcards[index] = flashcard;

    await writeFile(
      {
        contents: JSON.stringify(flashcards, null, 2),
        path: `data.json`,
      },
      {
        dir: BaseDirectory.Desktop,
      },
    );
  } catch (e) {
    console.error(e);
  }
};
// TODO: better error handling
export const deleteFlashcard = async (index: number) => {
  try {
    let flashcards: FlashcardType[] = [];

    const data = await readData();

    if (data) {
      const parsedData = JSON.parse(data) as FlashcardType[];
      flashcards = parsedData;
    }

    flashcards.splice(index, 1);

    await writeFile(
      {
        contents: JSON.stringify(flashcards, null, 2),
        path: `data.json`,
      },
      {
        dir: BaseDirectory.Desktop,
      },
    );
  } catch (e) {
    console.error(e);
  }
};
