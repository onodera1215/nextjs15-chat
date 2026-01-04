"use server";
import { signIn, signOut } from "@/auth";

/**
 * googleのOAuth認証用
 */
export async function googleSignIn() {
  await signIn("google", { redirectTo: "/home" });
}

/**
 * githubのOAuth認証用
 */
export async function githubSignIn() {
  await signIn("github", { redirectTo: "/home" });
}

/**
 * ログアウト用
 */
export async function logout() {
  await signOut();
}
