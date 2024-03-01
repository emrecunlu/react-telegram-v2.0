import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useAuth } from "./store/features/auth";
import Loader from "./components/Loader";

export default function App() {
  const { status } = useAuth();

  if (status === "loading") return <Loader />;

  return <RouterProvider router={router} />;
}
