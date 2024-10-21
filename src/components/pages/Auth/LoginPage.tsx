'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Enter a valid password' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fixedBackgroundPositions = [
    { top: '5%', left: '10%' },
    { top: '15%', left: '30%' },
    { top: '25%', left: '50%' },
    { top: '35%', left: '70%' },
    { top: '45%', left: '20%' },
    { top: '55%', left: '40%' },
    { top: '65%', left: '60%' },
    { top: '75%', left: '80%' },
    { top: '85%', left: '30%' },
    { top: '95%', left: '50%' },
    { top: '10%', left: '70%' },
    { top: '20%', left: '90%' },
    { top: '30%', left: '10%' },
    { top: '40%', left: '30%' },
    { top: '50%', left: '50%' },
  ];

  const backgroundHives = useMemo(
    () =>
      fixedBackgroundPositions.map((position, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: position.top,
            left: position.left,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
          }}
        >
          <svg
            width="100"
            className="text-primary"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
              fill="rgba(255, 255, 255, 0.1)"
            />
          </svg>
        </div>
      )),
    [],
  );

  const fixedPositions = [
    { top: '10%', left: '20%' },
    { top: '30%', left: '40%' },
    { top: '50%', left: '60%' },
    { top: '70%', left: '80%' },
    { top: '20%', left: '70%' },
    { top: '60%', left: '30%' },
  ];

  const cardHives = useMemo(
    () =>
      fixedPositions.map((position, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: position.top,
            left: position.left,
            transform: `scale(${Math.random() * 0.3 + 0.2})`,
          }}
        >
          <svg
            width="100"
            className="text-primary"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
              fill="rgba(255, 204, 0, 0.1)"
            />
          </svg>
        </div>
      )),
    [],
  );

  async function onSubmit(data: FormSchema) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    console.log(data);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/50 to-primary/70 px-4 sm:px-6 lg:px-8">
      {/* Background Hives */}
      <div className="absolute inset-0 z-0">{backgroundHives}</div>

      <div className="z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-lg bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg">
          {/* Card Background Hives */}
          <div className="absolute inset-0 z-0">{cardHives}</div>

          <div className="relative z-10 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ikart-40b39.appspot.com/o/taskhive%2Flogos%2Flogo-lap.jpg?alt=media&token=d1793450-da80-4e6e-a81f-a28d1353665a"
                alt="TaskHive Logo"
                className="size-20 rounded-full object-contain"
              />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Welcome to TaskHive
              </h2>
              <p className="text-sm text-gray-600">
                Log in to manage your tasks efficiently
              </p>
            </div>
            <Form {...form}>
              <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <Mail className="size-5 text-gray-400" />
                            </div>
                            <Input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className="block w-full border-gray-300 pl-10 sm:text-sm"
                              placeholder="you@example.com"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" className="rounded-[5px]" />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-yellow-600 hover:text-yellow-700"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
            <div className="p-4 text-center">
              <p className="text-black">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-yellow-600 hover:text-yellow-700"
                  prefetch={true}
                >
                  Join the colony
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
