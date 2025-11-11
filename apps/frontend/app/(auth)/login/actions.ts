'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password);

    if (!email || !password){
        throw new Error("Missing required fields");
    }
    
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error){
        console.error(error);
        throw new Error(error.message);
    }

    redirect("/");
}