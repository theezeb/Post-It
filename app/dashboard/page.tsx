import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }

  return (
    <main>
      <h1
        className="font-bold text-transparent text-3xl bg-clip-text 
        bg-gradient-to-r from-blue-700 from-10% to-pink-600 to-60% "
      >
        Welcome Back {session?.user?.name}
      </h1>
      <MyPosts />
    </main>
  );
}
