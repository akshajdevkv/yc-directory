"use client"
import React, { useState } from 'react';
import { useActionState } from 'react';
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/sanity/lib/actions';

const StartupForm = () => {
    
    const [errors,setErrors]= useState<Record<string,string>>({});
    const [pitch, setPitch] = React.useState("");
    const {toast}=useToast();
    const router=useRouter();
     const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            console.log("formData",formData)
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch: formData.get('pitch') as string,
            };
            const result = await createPitch(formValues,formData,pitch);
         
            setErrors({});
            await formSchema.parseAsync(formValues);    
            // Validation passed - process the form
            console.log('Form submitted:', formValues);
            
            // Show success toast with custom styling
            toast({
                title: "✅ Success!",
                description: "Your startup has been submitted successfully.",
                variant: "success",
            });
            
            router.push(`/startup/${result.data._id}`)
            return { error: "", status: 'SUCCESS' };
        } catch (error: any) {
            if(error instanceof z.ZodError){
                const fieldErrors =error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string,string>);
               toast({
                title: "⚠️ Validation Failed",
                description: "Please fix the errors highlighted below",
                variant: "warning"
               }) 
                 
                }
                toast({
                    title: "❌ Error",
                    description: "An unexpected error occurred. Please try again.",
                    variant: "destructive"
                   }) 
                  
          
        }
     }; 
    const [formState, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "" });
 

 
  return  <form action={formAction} className="startup-form">
    {formState?.error && (
      <div className="startup-form_error mb-4">
        {formState.error}
      </div>
    )}
 <div>
 <label htmlFor="title" className="startup-form_label">Title</label>
  <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title"/>
  {errors.title && <p className="startup-form_error">{errors.title}</p>}
 </div>
 <div>
 <label htmlFor="description" className="startup-form_label">Description</label>
  <Textarea id="description" name="description" className="startup-form_input" required placeholder="Startup Description"/>
  {errors.description && <p className="startup-form_error">{errors.description}</p>}
 </div>
 <div>
 <label htmlFor="category" className="startup-form_label">Category</label>
  <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category"/>
  {errors.category && <p className="startup-form_error">{errors.category}</p>}
 </div>
  
 <div>
 <label htmlFor="link" className="startup-form_label">Link</label>
  <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Link"/>
  {errors.link && <p className="startup-form_error">{errors.link}</p>}
 </div>
  
    <div data-color-mode="light" className="startup-form_editor">
    <label htmlFor="pitch" className="startup-form_label">Pitch</label>
       <MDEditor
       id="pitch"
 
         value={pitch}
         onChange={(value)=>setPitch(value || "")}
         preview="edit"
         height={300}
                 style={{
           backgroundColor: "white",

           borderRadius: "10px",
           padding: "10px",
        }}
        textareaProps={{
            placeholder: "Write your pitch here...",
        }}
       />
       <input type="hidden" name="pitch" value={pitch} />
       {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
     </div>
     <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
        <Send className="size-4 ml-2" />
     </Button>
  </form>
}

export default StartupForm 