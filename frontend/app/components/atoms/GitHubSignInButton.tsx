'use client';

import { githubSignIn } from "@/lib/server/utils"
import GithubIcon from "./GithubIcon";

export default function GithubSignInButton() {
  return (
    <form
      action={githubSignIn}
    >
      <div className="flex justify-between items-center mt-5 border-1 p-2 rounded-md">
        <GithubIcon className="w-6 h-6" />
        <button type="submit" className="p-3 hover:cursor-pointer">
          Signin with GitHub</button>
      </div>
    </form>
  )
} 