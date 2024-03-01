import CreateGroupDialog from "@/components/Chat/CreateGroupDialog";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";

export default function ChatView() {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <div className="flex-1 relative items-center justify-center flex p-4">
      <button
        className="flex items-center flex-col justify-center space-y-8 border-2 group border-green-100 hover:bg-green-50 transition-colors rounded-full lg:w-80 lg:h-80 w-48 h-48"
        onClick={() => setDialog(true)}
      >
        <GrGroup className="text-green-400 size-14 lg:size-24" />
        <span className="lg:text-xl text-sm text-green-400">
          Create New Group
        </span>
      </button>

      <Button
        size="icon"
        className="absolute right-4 bottom-4 rounded-full"
        variant="outline"
        onClick={() => signOut(auth)}
      >
        <BiLogOut className="text-red-600" />
      </Button>

      <CreateGroupDialog open={dialog} onClose={setDialog} />
    </div>
  );
}
