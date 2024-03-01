import { AiOutlineWhatsApp, AiOutlineLoading } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="h-full flex items-center justify-center flex-col space-y-8 bg-white">
      <AiOutlineWhatsApp className="text-green-400" size={128} />
      <AiOutlineLoading className="animate-spin text-green-400" size={32} />
    </div>
  );
}
