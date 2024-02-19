import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

import { QuillEditor } from "../components/QuillEditor";

import { InsertImage, InsertPost } from "@/types/types";
import { insertPost } from "@/apis/insertPost";
import { uploadImage } from "@/apis/uploadImage";
import { insertImage } from "@/apis/insertImage";

export const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const save = async (title: string, content: string, route: (id: number) => void) => {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (title.length > 100) {
      alert("제목은 100자 이하로 작성해주세요.");
      return;
    }

    if (content.length > 65534) {
      alert("내용이 너무 깁니다.");
      return;
    }

    setUploading(true);

    const newPostInstance: InsertPost = {
      user_id: null,
      title: title,
      content: content,
    };

    try {
      const data = await insertPost(newPostInstance);
      const postId = data![0].id;

      if (selectedImage) {
        const imagePath = await uploadImage(selectedImage);
        const newImageInstance: InsertImage = {
          post_id: postId,
          image_URL: imagePath,
        };

        await insertImage(newImageInstance);
      }

      // setUploading(false);
      route(postId);
    } catch (error) {
      alert("글쓰기에 실패했습니다.");
      console.error(error);
    }
  };

  const routePost = (id: number) => {
    router.push(`/post/${id}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        {uploading ? (
          <div className="flex text-3xl items-center m-auto"> Uploading... </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold m-4 ">글쓰기</h1>
            <input
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="border border-gray-300 p-2 mb-4 w-full block bg-white"
            ></input>
            <div className="flex border border-black w-auto h-auto min-h-56">
              {selectedImage === null ? (
                <h2 className="flex items-center m-auto text-2xl">Images Preview</h2>
              ) : (
                <div className="flex items-center justify-center">
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-h-full max-w-full object-contain h-auto w-auto"
                    alt="placeholder"
                  />
                </div>
              )}
            </div>
            <div className="m-4">
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            </div>
            <QuillEditor value={content} setValue={setContent} />
            <button
              onClick={() => {
                save(title, content, routePost);
              }}
              className="border border-gray-300 p-2 mb-4 w-1/3 m-auto block bg-white"
            >
              글쓰기
            </button>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="border border-gray-300 p-2 mb-4 w-1/3 m-auto block bg-white"
            >
              돌아가기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
