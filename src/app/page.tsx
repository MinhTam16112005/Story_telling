import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-white text-black">
      <header className="mb-16">
        <div className="text-right mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">Log in</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign up</button>
        </div>
        <h1 className="text-4xl font-bold text-center">Welcome to the world of Stories</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((game) => (
            <Link href={`/game/${game}`} key={game} className="block">
              <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
                <div className="h-16"></div>
                <div className="relative w-[400px] h-[400px]">
                  <Image
                    src={`/game${game}.jpg`}
                    alt={`Game ${game}`}
                    width={400}
                    height={400}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <p className="absolute bottom-[7rem] left-0 right-0 text-center text-2xl font-semibold">
                    Game {game}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2023 Story World. All rights reserved.</p>
      </footer>
    </div>
  );
}
