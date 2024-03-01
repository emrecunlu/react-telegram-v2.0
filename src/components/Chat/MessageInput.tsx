import { db } from "@/lib/firebase";
import { useAuth } from "@/store/features/auth";
import { UpdateGroupDto } from "@/types/group";
import { CreateMessageDto } from "@/types/message";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function MessageInput() {
  const { id } = useParams();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const updateLastMessage = async (message: string) => {
    const docRef = doc(db, "group", id as string);

    return setDoc(
      docRef,
      {
        lastMessage: {
          message,
          senderBy: user?.email,
          createdAt: Timestamp.now().toMillis(),
        },
      } as UpdateGroupDto,
      { merge: true }
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputRef.current?.value ?? "";

    if (value.length > 0) {
      const collectionRef = collection(db, "group", id as string, "messages");

      await addDoc(collectionRef, {
        message: value,
        senderBy: {
          email: user?.email as string,
          fullname: user?.displayName as string,
          photoURL: user?.photoURL as string,
        },
        createdAt: Timestamp.now().toMillis(),
      } as CreateMessageDto);

      await updateLastMessage(value);

      inputRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label
        htmlFor="message"
        className="flex items-center justify-between bg-zinc-50 rounded-full h-12 px-4"
      >
        <input
          type="text"
          id="message"
          placeholder="Message"
          className="flex-1 bg-transparent h-full outline-none text-sm text-zinc-600"
          ref={inputRef}
        />
        <button type="submit">
          <AiOutlineSend
            size={18}
            className="text-zinc-600 hover:text-zinc-500 transition-colors"
          />
        </button>
      </label>
    </form>
  );
}
