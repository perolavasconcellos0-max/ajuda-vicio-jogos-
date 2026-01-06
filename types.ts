
export interface GardenItem {
  id: string;
  type: 'flower' | 'tree' | 'statue' | 'pond';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  name: string;
  unlockedAt: string;
}

export interface PersonalGoal {
  name: string;
  targetValue: number;
}

export interface VisionDream {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export interface GratitudeNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  likes: number;
}

export interface SupportCircleMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface UserAttributes {
  resilience: number;
  clarity: number;
  selfControl: number;
}

export interface Quest {
  id: string;
  label: string;
  completed: boolean;
  type: keyof UserAttributes;
}

export interface UserProgress {
  isFirstAccess: boolean;
  averageWeeklyLoss: number;
  mainGoal: string;
  daysClean: number;
  moneySaved: number;
  timeSaved: number;
  level: number;
  experience: number;
  inventory: GardenItem[];
  visions: VisionDream[];
  gratitudeNotes: GratitudeNote[];
  seeds: number;
  lastCheckIn: string;
  nextRewardTime: string;
  rewardClaims: number;
  reflectionClicks: number;
  goodActionsDone: number;
  personalGoal?: PersonalGoal;
  attributes: UserAttributes;
  dailyQuests: Quest[];
  vitalityPoints: number;     
  ethosCoins: number;         
  streakStartedAt: string;   
  referralCount: number; // Novo campo para o Mural de Embaixadores
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  GARDEN = 'GARDEN',
  CHAT = 'CHAT',
  EMERGENCY = 'EMERGENCY',
  COMMUNITY = 'COMMUNITY',
  VISION = 'VISION',
  AUDIO = 'AUDIO',
  PROMOTE = 'PROMOTE'
}
