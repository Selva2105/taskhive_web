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
import { loginUser } from '@/lib/service/auth.service';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { fetchUserData } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(8, { message: 'Enter a valid password' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { push } = useRouter();


  async function onSubmit(data: FormSchema) {
    setIsLoading(true);

    try {
      const response = await loginUser(data);

      if (response.status === 200) {
        form.reset();
        if (typeof window !== 'undefined') {
          debugger;
          localStorage.setItem('accessToken-TH', response.data.token);
          localStorage.setItem('userId-TH', response.data.user.id);
        }

        dispatch(fetchUserData({ id: response.data.user.id, token: response.data.token }));
        toast({
          title: 'Login successful',
          description: 'Redirecting to dashboard',
        });
      };

      setTimeout(() => {
        push('/');
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'An error occurred';
        toast({
          title: 'Error',
          description: errorMessage,
        });
      } else {
        console.error(error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-amber-50 px-4 sm:px-6 lg:px-8">

      <div className="z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-lg bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg">
          <div className="relative z-10 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Welcome to TaskHive
              </h2>
              <p className="text-sm text-gray-600">
                Log in to manage your tasks efficiently
              </p>
            </div>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                          <PasswordInput
                            value={field.value}
                            onChange={field.onChange}
                          />
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
                    {isLoading && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
            <div className="p-4 text-center">
              <p className="text-black flex items-center gap-2 justify-center">
                Don&apos;t have an account?
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
