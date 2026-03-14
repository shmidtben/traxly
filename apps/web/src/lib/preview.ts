import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "__traxly_preview";

export async function isPreviewMode(): Promise<boolean> {
  return (await cookies()).get(COOKIE)?.value === "1";
}

export async function requirePreview(): Promise<void> {
  if (!(await isPreviewMode())) redirect("/");
}
