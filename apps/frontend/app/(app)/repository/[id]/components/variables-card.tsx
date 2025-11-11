import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/src/components/card";
import { Key } from "lucide-react";

// Mock data - replace with actual data when available
const mockVariables = [
    { id: '1', key: 'DATABASE_URL', value: 'postgresql://...' },
    { id: '2', key: 'API_KEY', value: 'sk-...' },
    { id: '3', key: 'ENVIRONMENT', value: 'production' },
    { id: '4', key: 'DATABASE_URL', value: 'postgresql://...' },
    { id: '5', key: 'API_KEY', value: 'sk-...' },
    { id: '6', key: 'ENVIRONMENT', value: 'production' },
];

export async function VariablesCard({ repositoryId }: { repositoryId: string }) {
    // TODO: Fetch variables from database
    // const supabase = await createClient();
    // const { data: variables } = await supabase.from('variables').select('*').eq('repository_id', repositoryId);
    
    const variables = mockVariables;
    
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Variables</CardTitle>
                </div>
                <CardDescription>
                    {variables.length} environment variable{variables.length !== 1 ? 's' : ''}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {variables.map((variable) => (
                        <div key={variable.id} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <Key className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <span className="font-mono text-sm font-semibold">{variable.key}</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono truncate ml-6">
                                {variable.value}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

