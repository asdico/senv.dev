'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createRepoAction(formData: FormData){
    const name = formData.get('name') as string;
    console.log(name);
    
    const supabase = await createClient();

    const {data, error} = await supabase.rpc('create_repository', {
        project_name: name,
    });
    
    if (error){
        console.error(error);
        throw new Error(error.message);
    }

    redirect(`/repository/${data.id}`);
}