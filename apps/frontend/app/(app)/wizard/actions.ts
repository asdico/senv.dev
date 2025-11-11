'use server'

import { createClient } from "@/utils/supabase/server";

export async function createRepoAction(formData: FormData){
    const name = formData.get('name') as string;
    console.log(name);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const supabase = await createClient();
}