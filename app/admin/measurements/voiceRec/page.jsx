"use client";

import { useEffect, useRef, useState } from "react";

export default function page() {
  const [value, setValue] = useState("");
  const recognitionRef = useRef(null);

  // Convert words to numbers
  const wordsToNumber = (text) => {
    const map = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
    };

    let words = text.toLowerCase().split(" ");
    let total = 0;

    words.forEach((word) => {
      if (map[word] !== undefined) {
        total += map[word];
      }
    });

    return total || text; // fallback if not matched
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;

        const number = wordsToNumber(transcript.trim());
        setValue(number.toString());
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={startListening}
      onBlur={stopListening}
      placeholder="Click and speak a number..."
      className="border p-2 mt-40 mb-40"
    />
  );
}
