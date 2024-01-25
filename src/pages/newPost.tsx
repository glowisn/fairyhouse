import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { PostgrestError } from "@supabase/supabase-js";

import supabase from "@/utils/supabaseClient";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const routeHome = () => router.push("/");

  return (
    <>
      <div className="container mx-auto mt-10 mb-10 h-screen">
        <h1 className=" text-2xl font-bold">글쓰기</h1>
        <input
          type="text"
          value={title}
          placeholder="제목을 입력하세요."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border border-gray-300 p-2 mb-4 w-full block bg-white"
        ></input>
        <QuillEditor value={content} setValue={setContent} />
        <button
          onClick={() => {
            save(title, content, routeHome);
          }}
          className="border border-gray-300 p-2 mb-4 w-1/3 m-auto block bg-white"
        >
          Submit
        </button>
      </div>
    </>
  );
}

function QuillEditor({ value, setValue }: any) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

async function save(title: string, content: string, routeHome: () => void ){
  if (title === "" || content === "") {
    alert("제목과 내용을 입력해주세요.");
    return;
  }
  try {
    // TODO : set user
    const user = undefined;
  
    // insert to DB
    const { error }: {error: PostgrestError | null} = await supabase.from("post").insert({
      user_id: null,
      title: title,
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });
  
    if (error) {
      console.error('Error inserting post:', error);
      alert("서버 에러로 인해 글쓰기에 실패했습니다.");
      return;
    }
  } catch (error) {
    console.error('Error inserting post:', error);
    alert("알 수 없는 오류에 의해 글쓰기에 실패했습니다.");
  }

  console.log("save with title: ", title, "content: ", content);

  // TODO : redirect to post page
  routeHome();
}
