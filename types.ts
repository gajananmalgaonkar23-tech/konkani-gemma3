export enum AppTab {
  HOME = 'HOME',
  CHAT = 'CHAT',
  BENCHMARKS = 'BENCHMARKS',
  DOWNLOADS = 'DOWNLOADS'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BenchmarkData {
  name: string;
  score: number;
  comparison?: number;
}
