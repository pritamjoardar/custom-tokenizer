'use client';
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(2, {
    message: "Text must be at least 2 characters.",
  }),
})
const Home = () => {
  const [mode, setMode] = useState<string>('encode');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const { mutate, data, isPending } = useMutation<{ token: string[], encoded: number[][], decoded: string }, Error, z.infer<typeof formSchema>>({
    mutationFn: (values: z.infer<typeof formSchema>) => axios.post('/api/token', values).then(res => res.data),
    onSuccess: () => form.reset(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  };

  return (
    <div className='bg-[#FFF8EE] h-[100dvh] p-4'>
      <h1 className='text-4xl font-bold text-primary text-center mb-2'>Custom Tokenizer</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl m-auto">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea required className='bg-white' placeholder="Enter some text(Hello Hitesh & Piysh sir)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className='flex gap-2 mt-2 select-none'>
            <Button disabled={!form.watch('text')} type="submit">Show example{isPending && <LoaderCircle className='animate-spin' />}</Button>
            <Button disabled={!form.watch('text')} variant={'destructive'} type="button" onClick={() => form.reset()}>Clear text</Button>
          </section>
          <ul className='flex gap-2 flex-wrap mt-2'>
            {data?.token.map((item, index) => (
              <li className='border rounded-md px-2 py-1 bg-white' key={index}>{item}</li>
            ))}
          </ul>
          {data && (
            <>
              <section className='mt-2'>
                <button onClick={() => setMode("encode")} type='button' className={`p-2 rounded-t-md ${mode === "encode" && "bg-primary text-white"}`}>Encode</button>
                <button onClick={() => setMode("decode")} type='button' className={`p-2 rounded-t-md ${mode === "decode" && "bg-primary text-white"}`}>Decode</button>
              </section>
              {mode === 'encode' ? (
                <section className="flex flex-wrap gap-2 bg-primary text-white p-2">
                  [
                  {data?.encoded.map((item: number[], index: number) => (
                    <div key={index}>
                      {item.join(", ")}
                      {index < data.encoded.length - 1 && ","}
                    </div>
                  ))}]
                </section>
              ) : (
                <section className="flex flex-wrap gap-2 bg-primary text-white p-2">
                  {data.decoded}
                </section>
              )}
            </>
          )}
        </form>
      </Form>
    </div>
  )
}

export default Home
