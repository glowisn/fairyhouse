import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { Post } from "@/types/types";
import { getPost } from "@/apis/getPost";
import { getImage } from "@/apis/getImage";
import "@/app/styles.css";
import { getPublicUrl } from "@/apis/getPublicURL";

export default function PostPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post>();
  const [imageUrl, setImageUrl] = useState<string>();
  const id = router.query.id;

  const goList = () => {
    router.push("/");
  };

  useEffect(() => {
    const currentId = id;
    if (currentId) {
      try {
        getPost(Number(currentId)).then((post) => setPost(post));
        getImage(Number(currentId)).then((imageObj) => {
          if (imageObj && imageObj[0]) {
            getPublicUrl(imageObj[0].image_URL).then((url) => {
              setImageUrl(url.publicUrl);
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, imageUrl]);

  return (
    <>
      <div className="h-screen mx-auto flex flex-col">
        {post ? (
          <>
            <h1 className=" text-3xl m-10">{post.title}</h1>
            {imageUrl ? (
              <div className="flex border border-black w-auto h-auto min-h-56">
                <div className="flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-h-full max-w-full object-contain h-auto w-auto"
                    alt="placeholder"
                  />
                </div>
              </div>
            ) : null}
            <ReactQuill value={post.content || ""} readOnly={true} theme={"bubble"} className="ql-editor flex-1" />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <button className="border border-black p-2 mb-4 w-1/3 m-auto block " onClick={goList}>
          Go List
        </button>
      </div>
    </>
  );
}
