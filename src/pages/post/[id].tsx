import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { Post } from "@/types/types";
import { getPost } from "@/apis/getPost";
import "@/app/styles.css";

export default function PostPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post>();

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    try {
      getPost(Number(router.query.id)).then((post) => setPost(post));
    } catch (error) {
      console.log(error);
    }
  }, [router.query.id]);

  return (
    <>
      <div className="h-screen mx-auto mt-10 mb-10">
        {post ? (
          <>
            <h1 className=" text-3xl m-10">{post.title}</h1>
            <ReactQuill value={post.content || ""} readOnly={true} theme={"bubble"} className="ql-editor" />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <button className="border border-black p-2 mb-4 w-1/3 m-auto block " onClick={goBack}>
          Go back
        </button>
      </div>
    </>
  );
}
