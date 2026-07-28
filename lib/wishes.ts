import { supabase } from "./supabase";

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export async function fetchWishes(): Promise<Wish[]> {
  const { data, error } = await supabase
    .from("wishes")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
}

export function timeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return new Date(isoDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}
