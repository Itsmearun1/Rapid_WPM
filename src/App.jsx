import React, { useState, useEffect } from "react";
import "./App.css";
const SpeedTestApp = () => {
  const [sentence] = useState(
    "This is a test to find out your typing speed. Good luck!"
  );
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [errCount, setErrCount] = useState(0);
  const [errMessage, setErrMessage] = useState("");

  const sentenceCreate = () => {
    setInput("");
    setWpm(0);
    setErrCount(0);
    setErrMessage("");
    setStartTime(null);
  };

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(new Date());
    }
  }, [input, startTime]);

  const handleSubmit = () => {
    const wordCount = sentence.split(" ").length;
    const wordsTyped = input
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;

    if (wordsTyped < Math.ceil(wordCount * 0.9)) {
      setErrMessage("Please type min 90% of the sentence.");
      return;
    }

    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000 / 60;
    const newWpm = Math.round(wordCount / timeTaken);

    const sentenceArray = sentence.split("");
    const inputArray = input.split("");
    const maxLength = Math.max(sentenceArray.length, inputArray.length);
    let errs = 0;

    for (let i = 0; i < maxLength; i++) {
      if (sentenceArray[i] !== inputArray[i]) {
        errs++;
      }
    }

    setWpm(newWpm);
    setErrCount(errs);
    setErrMessage("");
  };

  return (
    <div>
      <h2>Typing Speed Test</h2>
      <p>
        <bold>{sentence}</bold>
      </p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Let's Start"
      />

      <button onClick={handleSubmit}>Submit</button>

      {errMessage && <p>{errMessage}</p>}

      {(wpm > 0 || errCount > 0) && !errMessage && (
        <div>
          <p>
            Congratulations! Your speed is <bold>{wpm} WPM</bold>!
          </p>
          <p>
            Errors: <bold>{errCount}</bold>
          </p>
        </div>
      )}

      <button onClick={sentenceCreate}>Reset Test</button>
    </div>
  );
};

export default SpeedTestApp;
