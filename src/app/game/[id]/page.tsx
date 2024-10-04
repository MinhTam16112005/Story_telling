'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

type Choice = {
  text: string;
  next: string;
};

type StoryNode = {
  content: string;
  choices: Choice[];
};

type GameState = {
  title: string;
  currentNode: string;
  nodes: Record<string, StoryNode>;
  history: string[];
};

export default function Page({ params }: { params: { id: string } }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const storyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/storyData.json')
      .then((response) => response.json())
      .then((data) => {
        const gameData = data[params.id];
        setGameState({
          title: gameData.title,
          currentNode: 'start',
          nodes: gameData.nodes,
          history: [gameData.nodes.start.content],
        });
      });
  }, [params.id]);

  useEffect(() => {
    if (storyBoxRef.current) {
      storyBoxRef.current.scrollTop = storyBoxRef.current.scrollHeight;
    }
  }, [gameState?.history]);

  const handleChoice = (choice: Choice) => {
    if (!gameState) return;
    const newNode = gameState.nodes[choice.next];
    setGameState((prevState) => ({
      ...prevState!,
      currentNode: choice.next,
      history: [...prevState!.history, newNode.content],
    }));
  };

  if (!gameState) return <div>Loading...</div>;

  const currentNode = gameState.nodes[gameState.currentNode];

  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">{gameState.title}</h1>

      <div
        ref={storyBoxRef}
        className="w-3/5 bg-gray-100 p-6 rounded-lg shadow-md mb-8 whitespace-pre-wrap overflow-y-auto max-h-[70vh]"
      >
        {gameState.history.map((content, index) => (
          <p key={index} className="text-lg mb-4">
            {content}
          </p>
        ))}
      </div>

      <div className="w-3/5 flex justify-between gap-4">
        {currentNode.choices.map((choice, index) => (
          <button
            key={index}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={() => handleChoice(choice)}
          >
            {choice.text}
          </button>
        ))}
      </div>

      <Link href="/" className="mt-8 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
