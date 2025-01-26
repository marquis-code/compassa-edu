// types/message.ts
interface Sender {
    _id: string;
  }
  
  interface Message {
    _id: string;
    sender: Sender;
    group: string;
    content: string;
    attachments?: string[];
    type: string;
    createdAt: string;
    updatedAt: string;
    readBy: string[];
  }
  