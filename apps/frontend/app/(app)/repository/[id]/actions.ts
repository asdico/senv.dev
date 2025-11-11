'use server'

import { createClient } from "@/utils/supabase/server";

export async function createProjectAction(formData: FormData){
    const repositoryId = formData.get('repository') as string;
    const name = formData.get('name') as string;
    const projectType = formData.get('type') as string;
    
    console.log(repositoryId, name, projectType);

    const supabase = await createClient();
    const {data, error} = await supabase.from('projects').insert({
        name,
        repository: repositoryId,
        type: projectType,
    });
    if (error){
        console.error(error.message);
        throw error;
    }
}