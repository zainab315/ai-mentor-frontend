import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <div className="flex justify-center  items-center h-screen bg-gradient-to-br from-[#423A99] to-[#FA0787]">
      <SignIn
       routing="hash" />
    </div>
  );
}