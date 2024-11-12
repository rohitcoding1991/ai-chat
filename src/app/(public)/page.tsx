import GoogleSignIn from "@/components/Authentication/GoogleSignin";

export default async function Home() {
  return (
    <div className="bg-gray-100 flex w-full h-full justify-center items-center">
      <GoogleSignIn />
    </div>
  );
}
