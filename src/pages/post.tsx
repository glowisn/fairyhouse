import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Post() {
  const [value, setValue] = useState("");

  return (
    <>
      <h1>Post</h1>
      <QuillEditor value={value} setValue={setValue} />
      <button
        onClick={() => {
          save(value);
        }}
      >
        Submit
      </button>
    </>
  );
}

function QuillEditor({ value, setValue }: any) {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

function save(value: string) {
  console.log(value);
}
