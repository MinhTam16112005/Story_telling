'use client'; // This tells the system that this page runs on the user's browser, not on the server.

// Imports needed libraries and functions
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Defines a choice with text and the next part of the story
type Choice = {
  text: string;
  next: string;
};

// Defines each part of the story with content and choices
type StoryNode = {
  content: string;
  choices: Choice[];
};

// Keeps track of the game's title, current part, all parts, and history
type GameState = {
  title: string;
  currentNode: string;
  nodes: Record<string, StoryNode>;
  history: string[];
};

export default function Page({ params }: { params: { id: string } }) {
  // Stores the current game state (title, current story, etc.)
  const [gameState, setGameState] = useState<GameState | null>(null);
  // Ref for controlling the scrolling of the story box
  const storyBoxRef = useRef<HTMLDivElement>(null);

  // Fetches story data when the page loads and sets the game state
  useEffect(() => {
    fetch('/storyData.json')
      //Once you get the data from fetch, convert it to JSON format
      .then((response) => response.json())
      //After the data is converted to JSON, this block runs with the data you fetched.
      .then((data) => {
        //This line gets the specific game data you want based on the id in the URL.
        const gameData = data[params.id];
        //This line sets the game state with the title, starting point, all parts of the story, and the history.
        setGameState({
          title: gameData.title,
          currentNode: 'start',
          nodes: gameData.nodes,
          history: [gameData.nodes.start.content],
        });
      });
  }, [params.id]);

  // Scrolls the story box to the bottom whenever new content is added
  useEffect(() => {
    if (storyBoxRef.current) {
      storyBoxRef.current.scrollTop = storyBoxRef.current.scrollHeight;
    }
  }, [gameState?.history]);

  // Updates the game state when a choice is selected
  const handleChoice = (choice: Choice) => {
    if (!gameState) return;
    //This retrieves the next part of the story (a "node") based on the player’s choice.
    const newNode = gameState.nodes[choice.next];
    //This updates the game state with the new part of the story, the player’s choice, and the updated history.
    setGameState((prevState) => ({
      ...prevState!,
      currentNode: choice.next,
      history: [...prevState!.history, newNode.content],
    }));
  };

  // Shows "Loading..." while the game state is being fetched
  if (!gameState) return <div>Loading...</div>;

  // Gets the current part of the story based on the state
  const currentNode = gameState.nodes[gameState.currentNode];

  // Renders the story, choices, and link back to the homepage
  return (
    <div className="min-h-screen p-8 bg-white text-black flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">{gameState.title}</h1>

      {/* Shows the story content seen so far */}
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

      {/* Renders buttons for choices the player can select */}
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

      {/* Link to go back to the homepage */}
      <Link href="/" className="mt-8 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
