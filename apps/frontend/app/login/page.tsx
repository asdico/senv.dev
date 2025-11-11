import { Button } from "@workspace/ui/components/button"  

import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <Link href="https://api.supabase.com/v1/oauth/authorize?client_id=5b2905d7-1ffe-49e7-84df-ff34803a183e&response_type=code&redirect_uri=http://localhost:3002/auth/callback">Link to open</Link>
      <Button>Login</Button>
    </div>
  )
}