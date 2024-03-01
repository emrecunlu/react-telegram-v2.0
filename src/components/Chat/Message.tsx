import { cn } from "@/lib/utils";
import { useAuth } from "@/store/features/auth";
import type { Message } from "@/types/message";

type Props = {
  message: Message;
};

export default function Message({ message }: Props) {
  const { user } = useAuth();

  const isSender = () => {
    return message.senderBy.email === user?.email;
  };

  return (
    <div
      className={cn("flex overflow-hidden", {
        "justify-end": isSender(),
      })}
    >
      <img
        src={message.senderBy.photoURL}
        alt={message.senderBy.fullname}
        className={cn(
          "w-10 h-10 rounded-full object-cover object-center select-none mr-4 hidden lg:block",
          {
            "order-1 ml-4 mr-0": isSender(),
          }
        )}
      />

      <div
        className={cn(
          "mt-2 bg-zinc-100 rounded-xl p-3 rounded-tl-none lg:max-w-[45%]",
          {
            "text-right rounded-tr-none rounded-tl-xl bg-blue-50": isSender(),
          }
        )}
      >
        <h1 className="text-[14px] font-medium mb-1">
          {message.senderBy.fullname}
        </h1>
        <span className="text-[12px] text-wrap text-zinc-600 text-right">
          {message.message}
        </span>
      </div>
    </div>
  );
}
