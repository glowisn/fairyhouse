import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Initial Page</h1>
      <button onClick={() => router.push("/post")}>Go to post</button>
    </>
  );
}
