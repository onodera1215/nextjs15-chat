import { googleSignIn } from "@/lib/server/utils"
import GoogleIcon from "./GoogleIcon"

export default function GoogleSignInButton() {
  return (
    <form
      action={googleSignIn}
    >
      <div className="flex justify-between items-center mt-5 border-1 p-2 rounded-md">
        <GoogleIcon className="w-6 h-6" />
        <button type="submit">
          Signin with Google</button>
      </div>
    </form>
  )
} 