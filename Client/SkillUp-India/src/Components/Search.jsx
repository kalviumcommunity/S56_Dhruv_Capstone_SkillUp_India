import React, { useState, useEffect } from "react";
import "./Search.css";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const PLACEHOLDERS = [
    "Search for Skills",
    "Learn a New Skill",
    "Explore Skills",
    "Find your Skills",
  ];

  useEffect(() => {
    const searchBar = document.querySelector(".finder__input");

    const getRandomDelayBetween = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let isMounted = true;

    const setPlaceholder = (inputNode, placeholder) => {
      if (isMounted) {
        inputNode.setAttribute("placeholder", placeholder);
      }
    };

    const animateLetters = (
      currentLetters,
      remainingLetters,
      inputNode,
      onAnimationEnd
    ) => {
      if (!isMounted || !remainingLetters.length) {
        return (
          typeof onAnimationEnd === "function" &&
          onAnimationEnd(currentLetters.join(""), inputNode)
        );
      }

      currentLetters.push(remainingLetters.shift());

      setTimeout(() => {
        setPlaceholder(inputNode, currentLetters.join(""));
        animateLetters(
          currentLetters,
          remainingLetters,
          inputNode,
          onAnimationEnd
        );
      }, getRandomDelayBetween(30, 90));
    };

    const animatePlaceholder = (inputNode, placeholder, onAnimationEnd) => {
      animateLetters([], placeholder.split(""), inputNode, onAnimationEnd);
    };

    const onAnimationEnd = (placeholder, inputNode) => {
      setTimeout(() => {
        if (isMounted) {
          let newPlaceholder;
          do {
            newPlaceholder =
              PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)];
          } while (placeholder === newPlaceholder);

          animatePlaceholder(inputNode, newPlaceholder, onAnimationEnd);
        }
      }, 1000);
    };

    animatePlaceholder(searchBar, PLACEHOLDERS[0], onAnimationEnd);

    return () => {
      isMounted = false;
      searchBar.removeAttribute("placeholder");
    };
  }, []);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputValue.length === 0) {
      setIsActive(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setTimeout(() => {
      setIsProcessing(false);
      if (inputValue.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div
          className={`finder ${
            isActive ? "active" : ""
          } ${isProcessing ? "processing" : ""}`}
        >
          <div className="finder__outer">
            <div className="finder__inner">
              <div className="finder__icon"></div>
              <input
                className="finder__input"
                type="text"
                name="q"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
