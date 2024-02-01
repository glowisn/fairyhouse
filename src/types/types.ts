import { Database } from "../../database.types";
export type Post = Database["public"]["Tables"]["post"]["Row"];
export type InsertPost = Omit<Post, 'id'>;