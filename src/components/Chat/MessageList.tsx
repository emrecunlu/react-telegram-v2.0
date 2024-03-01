import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import {
  arrayUnion,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "@/lib/firebase";
import type { Message as IMessage } from "@/types/message";
import { useAuth } from "@/store/features/auth";
import Message from "./Message";
import MessageSkeleton from "../Skeleton/MessageSkeleton";

export default function MessageList() {
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  const { user } = useAuth();
  const { id } = useParams();

  const bottomOfPanelRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateUnreadMessages = async () => {
      const collectionRef = query(
        collection(db, "group", id as string, "messages"),
        where("readBy", "not-in", [user?.email])
      );

      getDocs(collectionRef).then((snapshot) => {
        snapshot.forEach((doc) => {
          setDoc(doc.ref, { readBy: arrayUnion(user?.email) }, { merge: true });
        });
      });
    };

    const collectionRef = query(
      collection(db, "group", id as string, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setMessages(
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as IMessage)
        )
      );

      updateUnreadMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [id, user]);

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (messages === null)
    return (
      <div className="p-6 flex flex-col space-y-4">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <MessageSkeleton
              key={index}
              align={index % 2 == 0 ? "right" : "left"}
            />
          ))}
      </div>
    );

  return (
    <div className="overflow-hidden justify-between flex-1 flex flex-col">
      <div ref={ref} className="overflow-y-auto flex-1 space-y-4 p-6">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        <div ref={bottomOfPanelRef}></div>
      </div>

      <MessageInput />
    </div>
  );
}
