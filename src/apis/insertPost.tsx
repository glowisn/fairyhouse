import { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/utils/supabaseClient";
import { InsertPost, Post } from "@/types/types";

export async function insertPost(
  newPostInstance: InsertPost,
): Promise<Post[] | null> {
  const {
    data,
    error,
  }: { data: Post | Post[] | null; error: PostgrestError | null } =
    await supabase.from("post").insert([newPostInstance]).select();
  if (error) {
    console.error("error", error);
    throw error;
  }
  return data;
}
