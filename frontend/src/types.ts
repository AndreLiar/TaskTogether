// src/types.ts

export interface Project {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface ChatMessage {
    id: string;
    senderName: string;
    content: string;
    createdAt: string; // Timestamp for when the message was sent
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
  }
  
  export interface VideoCall {
    id: string;
    createdAt: string; // use createdAt (or startedAt if your API returns that) 
    roomUrl?: string;
  }
  