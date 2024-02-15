import { PublicURL } from "@/types/types";
import supabase from "@/utils/supabaseClient";

export async function getPublicUrl(path: string) : Promise<PublicURL> {
  const { data } = supabase.storage.from("images").getPublicUrl(path);

  return data;
}
