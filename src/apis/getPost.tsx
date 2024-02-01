import { Post } from "@/types/types";
import { supabase } from "../utils/supabaseClient";

export async function getPost(id : number):Promise<Post> {
  const { data, error } = await supabase.from("post").select().eq("id", id).limit(1).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
