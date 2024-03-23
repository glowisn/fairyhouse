import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { ListElement, getPosts } from "../apis/getPosts";
import { Button } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";

const SCROLL_COUNT = 3;

export default function Lobby() {
  const router = useRouter();
  const [listElements, setListElements] = useState<ListElement[]>([]);
  const [listCount, setListCount] = useState<number>(0);

  const goPost = (id: number) => {
    router.push(`/post/${id}`);
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  useEffect(() => {
    getMoreData();
  });

  const getMoreData = async () => {
    if (listCount > 3) return;
    const newPosts = await getPosts(
      listCount * SCROLL_COUNT,
      (listCount + 1) * SCROLL_COUNT,
    );
    setListElements([...listElements, ...newPosts]);
    setListCount(listCount + 1);
    return newPosts;
  };

  return (
    <>
      <div className="max-w-[64rem] mx-auto bg-gray-100 min-h-screen p-10">
        <h1 className="text-4xl font-bold mb-4">PixPen Plaza</h1>
        <div className="flex justify-between">
          <div className="mr-[4rem]">
            <InfiniteScroll
              dataLength={listElements.length}
              next={() => getMoreData()}
              hasMore={false}
              loader={<h2>Loading</h2>}
            >
              {listElements.map((listElement: ListElement) => (
                <li
                  className="border border-black list-none p-2 flex justify-between bg-white mb-4 rounded shadow"
                  key={listElement.id}
                >
                  <div>{listElement.id}</div>
                  <a
                    className="w-full text-gray-700"
                    onClick={() => goPost(listElement.id)}
                  >
                    <h2 className="text-xl">{listElement.title}</h2>
                    <p className="text-sm text-gray-500">
                      {formatTimeAgo(listElement.created_at ?? "")}
                    </p>
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
            </InfiniteScroll>
            <Button
              className="text-2xl"
              onClick={() => router.push("/NewPost")}
            >
              글쓰기
            </Button>
          </div>
          <div className="w-[16rem]">
            <div className="mb-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}
