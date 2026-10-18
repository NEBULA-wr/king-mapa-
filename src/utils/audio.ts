/**
 * Subtle Ambient Caribbean Ocean Waves generator using Web Audio API.
 * Synthesizes pink/brown noise with lowpass filter modulation to simulate ocean waves.
 */

let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let isAudioRunning = false;

export const startOceanAmbient = async (): Promise<boolean> => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return false;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    if (isAudioRunning) return true;

    // Buffer size for noise
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Brown/pink noise
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter simulating water surge
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    // LFO for ocean wave swells
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // Wave period ~8s
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(180, audioCtx.currentTime);

    lfo.connect(filter.frequency);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 2.5); // Soft fade-in

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();
    lfo.start();
    isAudioRunning = true;
    return true;
  } catch (err) {
    console.warn("Ocean ambient audio couldn't start automatically:", err);
    return false;
  }
};

export const stopOceanAmbient = () => {
  if (!audioCtx || !gainNode || !isAudioRunning) return;
  try {
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      audioCtx?.suspend();
      isAudioRunning = false;
    }, 1300);
  } catch (err) {
    console.warn("Error stopping audio:", err);
    isAudioRunning = false;
  }
};
