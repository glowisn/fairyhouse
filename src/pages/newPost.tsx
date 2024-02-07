import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { save } from "../apis/save";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const routePost = (id: number) => {
    router.push(`/post/${id}`);
  };

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
            save(title, content, routePost);
          }}
          className="border border-gray-300 p-2 mb-4 w-1/3 m-auto block bg-white"
        >
          Submit
        </button>
      </div>
    </>
  );
}

interface QuillEditorProps {
  value: string;
  setValue: (value: string) => void;
}

function QuillEditor({ value, setValue }: QuillEditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
