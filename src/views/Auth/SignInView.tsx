import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/store/features/auth";
import { AiOutlineWhatsApp, AiOutlineGoogle } from "react-icons/ai";
import { Navigate } from "react-router-dom";

export default function SignInView() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-full flex items-center justify-center flex-col space-y-8 bg-zinc-50">
      <AiOutlineWhatsApp className="text-green-400" size={128} />
      <Button size="lg" variant="outline" onClick={handleGoogleLogin}>
        <AiOutlineGoogle className="mr-2 text-green-600" size={20} /> Sign in
        with Google
      </Button>
    </div>
  );
}
