import { createBrowserRouter } from "react-router-dom";
import SignInView from "./views/Auth/SignInView";
import NotFoundView from "./views/NotFoundView";
import ChatLayout from "./views/Chat/Layout/ChatLayout";
import ChatView from "./views/Chat/ChatView";
import ChatGroupView from "./views/Chat/ChatGroupView";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <SignInView />,
      },
    ],
  },
  {
    path: "/",
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <ChatView />,
      },
      {
        path: ":id",
        element: <ChatGroupView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

export default router;
