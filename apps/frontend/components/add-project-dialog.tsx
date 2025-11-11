'use client'

import { Button } from "@repo/ui/src/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/src/components/dialog";
import { Input } from "@repo/ui/src/components/input";
import { Label } from "@repo/ui/src/components/label";
import { PlusIcon } from "lucide-react";
import { SubmitButton } from "./submit-button";
import { createProjectAction } from "@/app/(app)/repository/[id]/actions";
import { ProjectTypePicker } from "./project-type-picker";

import { useForm } from "@tanstack/react-form"

import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@repo/ui/src/components/field";
import { Spinner } from "@repo/ui/src/components/spinner";


const formSchema = z.object({
    name: z
      .string()
      .min(3, "Name of the project must be at least 5 characters.")
      .max(32, "The name of the project must be at most 32 characters."),
    type: z.enum(["SUPABASE", "VERCEL"]),
  })

export function AddProjectDialog({repositoryId,}: {repositoryId: string,}) {

    const form = useForm({
        defaultValues: {
            name: "",
            type: "",
        },
        validators: {
            onSubmit: formSchema,
            onBlur: formSchema,
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            formData.append('name', value.name);
            formData.append('type', value.type);
            formData.append('repository', repositoryId);
            await createProjectAction(formData)
        }
    })

    return <Dialog>
        <DialogTrigger asChild>
            <Button size={'icon'} variant={'outline'}><PlusIcon/></Button>
        </DialogTrigger>
        <DialogContent>
        <form onSubmit={form.handleSubmit}>
        <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Create a new project for this repository.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-4">
            <div>
                <Input type="hidden" name="repository" value={repositoryId} />
            </div>
            <div className="grid gap-3">
            <FieldGroup>
            <form.Field name="name" children={(field) =>{
                const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                return <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      />
                    {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                    )}
                </Field>
            }}/>
            </FieldGroup>  

            <FieldGroup>
                <form.Field name="type" children={(field) =>{
                    const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                    return <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                        <ProjectTypePicker 
                            defaultValue={field.state.value as "VERCEL" | "SUPABASE"}
                            onChange={(value) => field.handleChange(value)}
                        />
                    </Field>
                }}/>
            </FieldGroup>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Field orientation="horizontal">
                <form.Subscribe children={(field)=>{{
                    return <Button type="submit" disabled={field.isSubmitting || !field.canSubmit}> {field.isSubmitting?? <Spinner />} Create</Button>
                }}}/>
            </Field>
          </DialogFooter>
          
        </form>
        </DialogContent>
    </Dialog>
}