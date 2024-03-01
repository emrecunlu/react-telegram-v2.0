import { db } from "@/lib/firebase";
import type { Group } from "@/types/group";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import GroupItem from "./GroupItem";
import GroupSkeleton from "../Skeleton/GroupSkeleton";

export default function GroupList() {
  const [groups, setGroups] = useState<Group[] | null>(null);

  useEffect(() => {
    const collectionRef = query(
      collection(db, "group"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Group[];

      setGroups(docs);
    });

    return () => unsubscribe();
  }, []);

  if (!groups)
    return Array(5)
      .fill("")
      .map((_, index) => <GroupSkeleton key={index} />);

  return (
    <div className="flex-1 overflow-auto lg:mt-2">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}
