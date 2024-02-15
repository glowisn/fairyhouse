import { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/utils/supabaseClient";
import { Image } from "@/types/types";

export async function getImage(postId:number): Promise<Image[] | null> {
  const { data, error }: { data: Image | Image[] | null; error: PostgrestError | null } = await supabase
    .from("image")
    .select()
    .eq("post_id", postId);
  if (error) {
    console.error("error", error);
    throw error;
  }
  return data;
}