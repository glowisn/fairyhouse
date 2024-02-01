import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getPosts } from "../apis/getPosts";
import { Post } from "@/types/types";

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  const goPost = (id: number) => {
    router.push(`/post/${id}`);
  };

  return (
    <>
      <div className="h-screen mx-auto mt-10 mb-10">
        <h1 className=" text-3xl m-10">List</h1>
        <div>
          {posts.map((post) => (
            <li className="border border-black list-none p-2 flex justify-between" key={post.id}>
              <a onClick={() => goPost(post.id)}>
                <h2 className="text-xl">{post.title}</h2>
                <p className="text-sm">{post.created_at}</p>
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
