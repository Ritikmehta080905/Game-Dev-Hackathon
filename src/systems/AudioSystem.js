// ATHARVA.EXE — Web Audio Procedural Sound Synthesizer

class AudioSystem {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.droneOsc = null;
    this.droneGain = null;
    this.isDroneActive = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.12, gainVal = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playJump() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }

  playLand() {
    this.playTone(85, 'triangle', 0.09, 0.12);
  }

  playGravityFlip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (e) {}
  }

  playFragmentCollect() {
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.15, 0.12), i * 60);
    });
  }

  playCheckpoint() {
    this.playTone(440, 'triangle', 0.2, 0.15);
    setTimeout(() => this.playTone(880, 'triangle', 0.3, 0.18), 120);
  }

  playLevelComplete() {
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    fanfare.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.25, 0.18), i * 110);
    });
  }

  playDeath() {
    this.playTone(110, 'sawtooth', 0.4, 0.25);
  }

  playCoffeeBoost() {
    const boostChord = [440, 554.37, 659.25, 880];
    boostChord.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'square', 0.18, 0.12), i * 50);
    });
  }

  playNoteCollect() {
    const noteChime = [880, 1108.73, 1318.51, 1760];
    noteChime.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.2, 0.15), i * 60);
    });
  }

  playAdminGlitchAlarm() {
    const alarmTones = [440, 311.13, 440, 311.13];
    alarmTones.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sawtooth', 0.15, 0.2), i * 120);
    });
  }

  playTimeEcho() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
      setTimeout(() => this.playTone(660, 'sine', 0.15, 0.12), 120);
      setTimeout(() => this.playTone(990, 'sine', 0.2, 0.15), 200);
    } catch (e) {}
  }

  startDrone() {
    if (this.muted || this.isDroneActive) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      this.droneGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      this.droneOsc.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
      this.isDroneActive = true;
    } catch (e) {}
  }

  stopDrone() {
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch (e) {}
      this.droneOsc = null;
    }
    this.isDroneActive = false;
  }
}

export const Sound = new AudioSystem();
