import { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/utils/supabaseClient";
import { InsertPost } from "@/types/types";

export async function save(title: string, content: string, route: (id: number) => void) {
  if (title === "" || content === "") {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  if (title.length > 100) {
    alert("제목은 100자 이하로 작성해주세요.");
    return;
  }

  if (content.length > 65534) {
    alert("내용이 너무 깁니다. 사진 크기를 줄이거나 내용을 줄여 주세요");
    return;
  }

  const newPostInstance: InsertPost = {
    user_id: null,
    title: title,
    content: content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    views: 0,
  };

  // TODO : set user
  const user = undefined;

  const { data, error }: { data: any; error: PostgrestError | null } = await supabase
    .from("post")
    .insert([newPostInstance])
    .select();
  if (error) {
    alert(error.message);
    console.error("error", error);
    return;
  }

  // route to post page
  route(data[0].id);
}
