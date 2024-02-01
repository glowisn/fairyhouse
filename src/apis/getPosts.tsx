import { Post } from "@/types/types";
import { supabase } from "../utils/supabaseClient";

export async function getPosts() : Promise<Post[]> {
  const { data, error } = await supabase.from("post").select();

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}
