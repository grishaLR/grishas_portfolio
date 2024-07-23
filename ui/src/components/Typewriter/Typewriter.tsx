import React, { useState, useEffect } from "react";
import { playSound } from "@utils";

export interface TypewriterProps {
  text: string;
  delay: number;
}

export default (({ text, delay }) => {
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  playSound("www.soundjay.com/communication/sounds/typewriter-1.ogg");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return (
    <ul>
      {Array.from(currentText).map((letter, index) => {
        // index okay for key as we only render this list once
        return <li key={`${letter}_${index}`}>{letter}</li>;
      })}
    </ul>
  );
}) as React.FC<TypewriterProps>;
