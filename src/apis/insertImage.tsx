import { PostgrestError } from "@supabase/supabase-js";


import supabase from "@/utils/supabaseClient";
import { InsertImage, Image } from "@/types/types";

export async function insertImage(newImageInstance: InsertImage): Promise<Image[] | null> {
  const { data, error }: { data: Image | Image[] | null; error: PostgrestError | null } = await supabase
    .from("image")
    .insert([newImageInstance])
    .select();
  if (error) {
    console.error("error", error);
    throw error;
  }
  return data;
}
