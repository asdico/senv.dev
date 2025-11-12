import { Input } from "@repo/ui/src/components/input";
import { Label } from "@repo/ui/src/components/label";
import { Card } from "@repo/ui/src/components/card";
import { SubmitButton } from "@/components/submit-button";
import { createRepoAction } from "./actions";

export default function WizardPage(){
    return <div>
        <Card className="max-w-md mx-auto p-8 bg-white rounded shadow">
    <form className="flex flex-col gap-4 " action={createRepoAction}>
      <h1 className="text-2xl font-bold text-center mb-4">Create a new repository</h1>

      <Label htmlFor="project-name" className="font-medium mb-1">
        Project Name
      </Label>
      <Input
        id="repository-name"
        name="name"
        type="text"
        required
        placeholder="My awesome repository"
      />

      <SubmitButton
        text="Create repository"
      />
    </form>
    </Card>
    </div>
}