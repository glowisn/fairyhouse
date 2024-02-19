import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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

  return (
    <>
      <div className="mx-auto mt-10 mb-10">
        <h1 className=" text-3xl m-10">List</h1>
        <div>
          {listElements.map((listElement: ListElement) => (
            <li className="border border-black list-none p-2 flex justify-between" key={listElement.id}>
              <a className="w-full" onClick={() => goPost(listElement.id)}>
                <h2 className="text-xl">{listElement.title}</h2>
                <p className="text-sm">{listElement.created_at}</p>
                {listElement.image.length > 0 && (
                  <div className="">
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
        <button className="border border-black text-2xl px-2.5 py-0.5 m-10" onClick={() => router.push("/newPost")}>
          글쓰기
        </button>
      </div>
    </>
  );
}
