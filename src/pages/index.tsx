import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { ListElement, getPosts } from "../apis/getPosts";

export default function Page() {
  const router = useRouter();
  const [listElements, setListElements] = useState<ListElement[]>([]);

  useEffect(() => {
    getPosts(0, 10).then((postImageData) => {
      if (postImageData === null) {
        throw new Error("postImageData is null");
      }
      return setListElements(postImageData);
    });
  }, []);

  const goPost = (id: number) => {
    router.push(`/post/${id}`);
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  return (
    <>
      <div className="mx-auto bg-gray-100 min-h-screen p-10">
        <h1 className="text-3xl pb-4 text-blue-500">Logo Here</h1>
        <div>
          {listElements.map((listElement: ListElement) => (
            <li
              className="border border-black list-none p-2 flex justify-between bg-white mb-4 rounded shadow"
              key={listElement.id}
            >
              <a className="w-full text-gray-700" onClick={() => goPost(listElement.id)}>
                <h2 className="text-xl">{listElement.title}</h2>
                <p className="text-sm text-gray-500">{formatTimeAgo(listElement.created_at ?? "")}</p>
                {listElement.image.length > 0 && (
                  <div className="flex justify-center">
                    <Image
                      src={listElement.image[0].publicURL}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="max-h-full max-w-full object-contain h-auto w-auto"
                      alt="placeholder"
                    />
                  </div>
                )}
              </a>
            </li>
          ))}
        </div>
        <button
          className="border border-black text-2xl px-2.5 py-0.5 m-10 bg-blue-500 text-white rounded"
          onClick={() => router.push("/newPost")}
        >
          글쓰기
        </button>
      </div>
    </>
  );
}
