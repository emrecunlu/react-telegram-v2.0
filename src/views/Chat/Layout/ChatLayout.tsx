import Sidebar from "@/components/Layout/Sidebar";
import { useAuth } from "@/store/features/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function ChatLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/signin" />;

  return (
    <div className="h-full flex items-center justify-center lg:p-4 bg-blue-100">
      <div className="lg:w-[1280px] lg:h-[720px] h-full w-full bg-white rounded-md shadow-md flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
