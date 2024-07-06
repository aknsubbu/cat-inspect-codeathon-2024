import React, { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/button";

interface TranslatorProps {
  setText: (text: string) => void;
}

const Translator: React.FC<TranslatorProps> = ({ setText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US"; // Set language if needed

    recognitionRef.current.onstart = () => {
      console.log("Listening...");
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript: ", transcript);
      setText(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
      if (event.error === "not-allowed") {
        console.error("Microphone access denied.");
      }
    };

    recognitionRef.current.onend = () => {
      console.log("Speech recognition service disconnected");
      setIsRecording(false);
    };

    recognitionRef.current.onaudioend = () => {
      console.log("Audio capturing ended");
    };

    recognitionRef.current.onsoundend = () => {
      console.log("Sound capturing ended");
    };

    recognitionRef.current.onspeechend = () => {
      console.log("Speech capturing ended");
    };

    recognitionRef.current.onnomatch = () => {
      console.log("No matching speech recognized");
    };

    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleOnClick = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  return (
    <div>
      <Button
        color="warning"
        variant="solid"
        onClick={handleOnClick}
        size="lg"
        className="p-5"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default Translator;