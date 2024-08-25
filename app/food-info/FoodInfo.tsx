"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EnterIcon, LoadingIcon } from "@/lib/icons";

type Message = {
  role: "user" | "assistant";
  content: string;
  latency?: number;
};

type FoodInfo = {
  name: string;
  cholesterol: string;
  calories: string;
};

export default function FoodInfo() {
  const [input, setInput] = useState("");
  const [foodSuggestions, setFoodSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchFoodList() {
      try {
        const response = await fetch("https://aiten.vercel.app/api/list");
        if (!response.ok) {
          throw new Error("Failed to fetch food list");
        }
        const foodList: string[] = await response.json();
        setFoodSuggestions(foodList);
      } catch (error) {
        console.error("Error fetching food list:", error);
        toast.error("Error fetching food list.");
      }
    }

    fetchFoodList();

    function keyDown(e: KeyboardEvent) {
      if (e.key === "Enter") return inputRef.current?.focus();
      if (e.key === "Escape") return setInput("");
    }

    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  const [messages, submit, isPending] = useActionState<
  Array<Message>,
  string
>(async (prevMessages, foodName) => {
  const submittedAt = Date.now();

  const response = await fetch(`/api/food?name=${encodeURIComponent(foodName)}`, {
    method: "GET",
  });

  if (!response.ok) {
    if (response.status === 429) {
      toast.error("Too many requests. Please try again later.");
    } else {
      toast.error((await response.text()) || "An error occurred.");
    }

    return prevMessages;
  }

  const foodInfo: { food?: FoodInfo; error?: string } = await response.json();

  const latency = Date.now() - submittedAt;

  let assistantMessage = "Food information not found.";
  if (foodInfo.food) {
    assistantMessage = `Food Name: ${foodInfo.food.name}\nCholesterol: ${foodInfo.food.cholesterol}\nCalories: ${foodInfo.food.calories}`;
  } else if (foodInfo.error) {
    assistantMessage = foodInfo.error;
  }

  return [
    ...prevMessages,
    {
      role: "user",
      content: foodName,
    },
    {
      role: "assistant",
      content: assistantMessage,
      latency,
    },
  ];
}, []);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(input);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const suggestions = foodSuggestions.filter((food) =>
        food.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setInput(suggestion);
    setFilteredSuggestions([]);
  }

  return (
    <>
      <div className="pb-4 min-h-28" />

      <form
        className="rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 flex items-center w-full max-w-md border border-transparent hover:border-neutral-300 focus-within:border-neutral-400 hover:focus-within:border-neutral-400 dark:hover:border-neutral-700 dark:focus-within:border-neutral-600 dark:hover:focus-within:border-neutral-600 relative"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="bg-transparent focus:outline-none p-4 w-full placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          required
          placeholder="Enter a food item"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
        />

        <button
          type="submit"
          className="p-4 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
          disabled={isPending}
          aria-label="Submit"
        >
          {isPending ? <LoadingIcon /> : <EnterIcon />}
        </button>

        {filteredSuggestions.length > 0 && (
          <ul className="bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-lg max-h-40 overflow-y-auto w-60 absolute top-full mt-1 left-1/2 transform -translate-x-1/2 z-10 custom-scrollbar">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="text-neutral-400 dark:text-neutral-600 pt-4 text-center max-w-xl text-balance min-h-28 space-y-4">
        {messages.length > 0 && (
          <p>
            <pre>{messages.at(-1)?.content}</pre>
            <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700">
              {" "}
              ({messages.at(-1)?.latency}ms)
            </span>
          </p>
        )}

        {messages.length === 0 && (
          <p>Enter a food item to get information.</p>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </>
  );
}
