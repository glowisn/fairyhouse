import { Database } from "../../database.types";

export type Post = Database["public"]["Tables"]["post"]["Row"];
export type InsertPost = Database["public"]["Tables"]["post"]["Insert"];

export type Image = Database["public"]["Tables"]["image"]["Row"];
export type InsertImage = Database["public"]["Tables"]["image"]["Insert"];

export type PublicURL = { publicUrl: string };
