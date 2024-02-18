import { supabase } from "../utils/supabaseClient";
import { Post } from "@/types/types";

export async function getPosts(from:number,to:number) : Promise<Post[]> {
  const { data, error } = await supabase.from("post").select().range(from,to).order("id", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}
