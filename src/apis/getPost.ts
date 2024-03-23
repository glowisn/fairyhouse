import { supabase } from "../utils/supabaseClient";
import { Post } from "@/types/types";

export async function getPost(id: number): Promise<Post> {
  const maxRetries = 2;
  let retries = 0;
  let data, error;

  while (retries < maxRetries) {
    ({ data, error } = await supabase
      .from("post")
      .select()
      .eq("id", id)
      .limit(1)
      .single());

    if (error) {
      console.error(`Attempt ${retries + 1} failed. Retrying...`);
      retries++;
    } else {
      break;
    }
  }

  if (error || !data) {
    throw new Error(error ? error.message : "No data returned from getPost");
  }

  return data;
}
