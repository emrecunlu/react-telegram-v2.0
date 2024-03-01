export type User = {
  fullname: string;
  email: string;
  photoURL: string;
};

export type Group = {
  id: string;
  name: string;
  lastMessage?: {
    senderBy: string;
    message: string;
    createdAt: number;
  };
  photoURL?: string;
  createdBy: User;
  createdAt: number;
};

export type CreateGroupDto = Omit<Group, "id">;

export type UpdateGroupDto = Omit<Partial<Group>, "id">;
