import { db } from "@/lib/firebase";
import { Group } from "@/types/group";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading, AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import GroupHeader from "@/components/Chat/GroupHeader";
import MessageList from "@/components/Chat/MessageList";

export default function ChatGroupView() {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const getGroupById = (id: string) => {
    setLoading(true);
    const docRef = doc(db, "group", id);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setError(null);
          setGroup({
            id: snapshot.id,
            ...snapshot.data(),
          } as Group);
        } else {
          setError("Group Not Found :(");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getGroupById(id as string);
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center flex-1">
        <AiOutlineLoading className="animate-spin text-green-400" size={48} />
      </div>
    );

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-1 flex-col space-y-8">
        <h1 className="text-2xl font-medium text-red-400">{error}</h1>
        <Button variant="outline" asChild>
          <Link to="/">
            <AiOutlineArrowLeft className="mr-3" />
            Go Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-y-hidden flex-col">
      <GroupHeader group={group as Group} />
      <MessageList />
    </div>
  );
}
