import { SignUp } from '@clerk/nextjs';
export default function SignUpPage() {
  return (
    <main className="flex justify-center  items-center h-screen bg-gradient-to-br from-[#423A99] to-[#FA0787]">
      <SignUp appearance={{
      }}  routing="hash"   />
    </main>
  );
}