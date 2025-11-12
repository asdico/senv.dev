import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/src/components/card";
import { Users } from "lucide-react";

// Mock data - replace with actual data when available
const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

export async function UsersCard({ repositoryId }: { repositoryId: string }) {
    // TODO: Fetch users from database
    // const supabase = await createClient();
    // const { data: users } = await supabase.from('repository_users').select('*, users(*)').eq('repository_id', repositoryId);
    
    const users = mockUsers;
    
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Users</CardTitle>
                </div>
                <CardDescription>
                    {users.length} user{users.length !== 1 ? 's' : ''} with access
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-primary">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

