import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import audioFile from "/audio.mp3";

export default function TestTone() {
  const [started, setStarted] = useState(false);
  const playerRef = useRef(null);
  const pannerRef = useRef(null);
  const lfoRef = useRef(null);

  useEffect(() => {
    pannerRef.current = new Tone.Panner(0);
    playerRef.current = new Tone.Player(audioFile).connect(pannerRef.current);
    pannerRef.current.toDestination();

    lfoRef.current = new Tone.LFO({
      frequency: 0.1,
      min: -0.9,
      max: 0.9,
    }).connect(pannerRef.current.pan);

    return () => {
      playerRef.current.dispose();
      pannerRef.current.dispose();
      lfoRef.current.dispose();
    };
  }, []);

  const playSound = async () => {
    if (!started) {
      await Tone.start();
      lfoRef.current.start();
      playerRef.current.start();
      setStarted(true);
    } else {
      playerRef.current.stop();
      lfoRef.current.stop();
      setStarted(false);
    }
  };

  return (
    <div>
      <button onClick={playSound}>
        {started ? "Stop" : "Start"} Orbitune
      </button>
    </div>
  );
}
