"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthForm = ({ type }: { type: FormType }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const isSignIn = type === 'sign-in';

  return ( 
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10"> 
        <div className="flex flex-col gap-6 items-center justify-center">
            <Image 
              src="/client-prep-pal-logo-light.svg"
              alt="logo"
              height={64}
              width={140}
            />
          <h4>Practice. Progress. Clients.</h4>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && <p>Full Name</p>}
            <p>Email</p>
            <p>Password</p>
            <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create a New Account'}</Button>
          </form>
        </Form>

        <p className="text-left">
            {isSignIn ? 'Already have an account?' : ''}
        </p>
      </div>
    </div>
  )
}

export default AuthForm