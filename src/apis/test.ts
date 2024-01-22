import supabase from "@/utils/supabaseClient";

import { Tables } from "../../database.types";

export default async function testFetch() : Promise<Tables<'test'>[]>{
  const {data, error} = await supabase.from('test').select().returns<Tables<'test'> | Tables<'test'>[]>();
  if (error){
    throw error;
  }
  return Array.isArray(data) ? data : [data];
}