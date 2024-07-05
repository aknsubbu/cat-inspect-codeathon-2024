import React, { useState } from "react";

interface TranslatorProps {
  setText: (text: string) => void;
}

const Translator: React.FC<TranslatorProps> = ({ setText }) => {
  const [isRecording, setIsRecording] = useState(false); // State to track recording status
  let recognition: SpeechRecognition | null = null; // Declare recognition outside of function to keep reference

  function startRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript: ", transcript);
      setText(transcript); // Update the state with the recognized text
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition service disconnected");
      setIsRecording(false); // Update state when recognition ends
    };

    recognition.start();
    setIsRecording(true); // Update state when recognition starts
  }

  function stopRecognition() {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false); // Update state when recognition is manually stopped
  }

  function handleOnClick() {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  }

  return (
    <button onClick={handleOnClick}>
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};

export default Translator;