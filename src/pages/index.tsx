import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className="h-screen mx-auto mt-10 mb-10">
        <h1 className=" text-3xl m-10">Initial Page</h1>
        <button className="border border-black px-2.5 py-0.5 m-10" onClick={() => router.push("/newPost")}>
          글쓰기
        </button>
      </div>
    </>
  );
}
