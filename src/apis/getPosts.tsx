import { PostgrestError } from "@supabase/supabase-js";

import { supabase } from "../utils/supabaseClient";

import { getPublicUrl } from "./getPublicURL";

export type ListElement = {
  id: number;
  title: string;
  created_at: string | null;
  image: {
    image_URL: string;
    order: number;
    publicURL: string;
  }[];
};

type OriginalListElement = {
  id: number;
  title: string;
  created_at: string | null;
  image: {
    image_URL: string;
    order: number;
  }[];
};

export async function getPosts(
  from: number,
  to: number,
): Promise<ListElement[]> {
  const {
    data,
    error,
  }: { data: OriginalListElement[] | null; error: PostgrestError | null } =
    await supabase
      .from("post")
      .select(`id,title,created_at,image(image_URL,order)`)
      .gte("id", from)
      .lte("id", to)
      .order("id", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const listElements: ListElement[] = await Promise.all(
    data!.map(async (element) => {
      const image = await Promise.all(
        element.image.map(async (image) => {
          const publicURL = await getPublicUrl(image.image_URL);
          return {
            image_URL: image.image_URL,
            order: image.order,
            publicURL: publicURL.publicUrl,
          };
        }),
      );
      return {
        id: element.id,
        title: element.title,
        created_at: element.created_at,
        image: image,
      };
    }),
  );

  return listElements;
}
