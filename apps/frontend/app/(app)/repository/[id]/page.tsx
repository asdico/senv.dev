'use server'
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectsCard } from "./components/projects-card";
import { VariablesCard } from "./components/variables-card";
import { UsersCard } from "./components/users-card";

export default async function RepositoryPage({params}: {params: Promise<{id: string}>}){
    const supabase = await createClient();
    const {id} = await params;
    const {data, error} = await supabase.from('repositories').select('*').eq('id', id).single();
    if (error){
        console.error(error.message);
        throw new Error(error.message);
    }
    if (!data){
        notFound();
    }
    
    const repository = data;
    
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">{repository.name}</h1>
                <p className="text-muted-foreground">Repository details and configuration</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
                    <ProjectsCard repositoryId={id} />
                </Suspense>
                
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
                    <VariablesCard repositoryId={id} />
                </Suspense>
                
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
                    <UsersCard repositoryId={id} />
                </Suspense>
            </div>
        </div>
    );
}
