"use client";

import { useEffect, useRef, useState, FunctionComponent } from "react";
import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "../app/context/DeepgramContextProvider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "../app/context/MicrophoneContextProvider";

interface RecorderProps {
  id: string;
  captions: string[];
  setCaptions: (captions: string[]) => void;
}

const Recorder: FunctionComponent<RecorderProps> = ({ id, captions, setCaptions }) => {
  const [caption, setCaption] = useState<string | undefined>("");
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } = useMicrophone();
  const captionTimeout = useRef<any>();
  const keepAliveInterval = useRef<any>();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setupMicrophone();
  }, []);

  useEffect(() => {
    if (isRecording && microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 3000,
      });
    }
  }, [isRecording, microphoneState]);

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      connection?.send(e.data);
    };

    const onTranscript = (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      let thisCaption = data.channel.alternatives[0].transcript;

      if (thisCaption !== "") {
        console.log(thisCaption);
        setCaption(thisCaption);
        setCaptions([...captions, thisCaption]);
      }

      if (isFinal && speechFinal) {
        clearTimeout(captionTimeout.current);
        captionTimeout.current = setTimeout(() => {
          setCaption(undefined);
          clearTimeout(captionTimeout.current);
        }, 3000);
      }
    };

    if (isRecording && connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current);
    };
  }, [isRecording, connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (isRecording && microphoneState !== MicrophoneState.Open && connectionState === LiveConnectionState.OPEN) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      clearInterval(keepAliveInterval.current);
    };
  }, [isRecording, microphoneState, connectionState]);

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </>
  );
};

export default Recorder;