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

export async function signupAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
   const password = formData.get("password") as string;


   console.log(name, email, password);

   if (!name || !email || !password){
    
    throw new Error("Missing required fields");
   }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error){
        console.error(error);
        throw new Error(error.message);
    }

    redirect("/");
}