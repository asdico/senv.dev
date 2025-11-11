import { AddProjectDialog } from "@/components/add-project-dialog";
import SupabaseIcon from "@/components/supabase-icon";
import VercelIcon from "@/components/vercel-icon";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/src/components/card";
import { Folder } from "lucide-react";


export async function ProjectsCard({ repositoryId }: { repositoryId: string }) {
    const supabase = await createClient();
    const { data: projects, error } = await supabase.from('projects').select('*').eq('repository', repositoryId);
    if (error){
        console.error(error.message);
        throw error;
    }
    
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2 flex flex-row">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="flex-1">Projects</CardTitle>
                    <AddProjectDialog repositoryId={repositoryId} />
                </div>
                <CardDescription>
                    {projects.length} project{projects.length !== 1 ? 's' : ''} in this repository
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {projects.map((project) => (
                        <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            {project.type === 'SUPABASE' ? <SupabaseIcon /> : <VercelIcon />}
                            <span className="font-medium">{project.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

