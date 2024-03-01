import { User } from "./group";

export type Message = {
  id: string;
  message: string;
  senderBy: User;
  createdAt: number;
};

export type CreateMessageDto = Omit<Message, "id">;
