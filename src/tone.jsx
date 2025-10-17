import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import audioFile from "/audio.mp3";

export default function TestTone() {
  const [started, setStarted] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = new Tone.Player(audioFile).toDestination();

    return () => playerRef.current.dispose()
  }, [])

  const playSound = async() => {
    if(!started) {
      console.log("Player started")
      playerRef.current.start()
      setStarted(!started)
    } else {
      console.log("Player stopped")
      playerRef.current.stop()
      setStarted(!started)
    }
  }

  return (
    <div>
      <button
        onClick={playSound}
      >
        {started ? "Stop" : "Start"} Orbitune
      </button>
    </div>
  );
}
