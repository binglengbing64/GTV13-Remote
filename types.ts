export enum RemoteCommand {
  POWER = 'POWER',
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  OK = 'OK',
  HOME = 'HOME',
  BACK = 'BACK',
  VOL_UP = 'VOL_UP',
  VOL_DOWN = 'VOL_DOWN',
  MUTE = 'MUTE',
  PLAY_PAUSE = 'PLAY_PAUSE',
  SETTINGS = 'SETTINGS',
  NETFLIX = 'NETFLIX',
  YOUTUBE = 'YOUTUBE',
  INPUT = 'INPUT',
  ASSISTANT = 'ASSISTANT'
}

export interface CommandLog {
  id: string;
  command: RemoteCommand;
  timestamp: number;
  source: 'manual' | 'ai';
}

export interface ConnectionStatus {
  connected: boolean;
  device: string;
  latency: number;
}