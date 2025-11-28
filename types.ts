export enum House {
  Gryffindor = 'Gryffindor',
  Slytherin = 'Slytherin',
  Ravenclaw = 'Ravenclaw',
  Hufflepuff = 'Hufflepuff',
  None = 'None'
}

export enum LocationType {
  Hogwarts = 'Hogwarts',
  Hogsmeade = 'Hogsmeade',
  Classroom = 'Classroom'
}

export enum ItemType {
  Wand = 'Wand',
  Book = 'Book',
  Potion = 'Potion',
  Misc = 'Misc',
  Gear = 'Gear',
  Food = 'Food'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ItemType;
  image?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  reward: number;
  type: 'Class' | 'Job' | 'Story';
  requirementType?: 'Talk' | 'Find';
  targetId?: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  locationId: string;
  image: string;
  personality: string;
}

export interface ChatMessage {
  sender: 'Player' | 'NPC';
  text: string;
  emotion?: string; // For NPC avatar changes
}

export interface GameState {
  name: string;
  house: House;
  money: number;
  inventory: string[]; // Item IDs
  location: string;
  quests: Quest[];
  chatHistory: Record<string, ChatMessage[]>; // NPC ID -> History
  attributes: {
    bravery: number;
    intelligence: number;
    loyalty: number;
    cunning: number;
  };
}

export const INITIAL_GAME_STATE: GameState = {
  name: '',
  house: House.None,
  money: 100,
  inventory: [],
  location: 'GreatHall',
  quests: [],
  chatHistory: {},
  attributes: { bravery: 0, intelligence: 0, loyalty: 0, cunning: 0 }
};