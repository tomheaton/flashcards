import Header from "../components/header";

export default function Error() {
  return (
    <div className="flex h-screen w-full flex-col py-20">
      <Header />

      <main className="flex flex-1 flex-col items-center">
        <p className="text-sm font-semibold">Oops!</p>
      </main>
    </div>
  );
}
