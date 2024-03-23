import supabase from "@/utils/supabaseClient";

export async function uploadImage(image: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`post/${new Date().getTime()}`, image);
  if (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Error uploading image: " + error);
  }
  return data.path;
}
