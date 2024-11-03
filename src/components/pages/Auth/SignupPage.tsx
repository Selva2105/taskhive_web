'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { PhoneInput } from '@/components/ui/phone-input';

import {
  Country,
  formatPhoneNumber,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { RequestUser } from '@/types/auth.types';
import { createUser } from '@/lib/service/auth.service';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const signupSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    fullname: z.string().min(1, { message: 'Enter your full name' }),
    username: z.string().min(1, { message: 'Enter a username' }),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    password: z.string().min(8, { message: 'Enter a valid password' }),
    companyName: z.string().min(1, { message: 'Enter your company name' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Enter a valid confirm password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormSchema = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<Country>();

  const { push } = useRouter();

  const form = useForm<SignupFormSchema>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      fullname: '',
      username: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormSchema) => {
    setIsLoading(true);

    // Map the form data to match the RequestUser type
    const requestData: RequestUser = {
      email: data.email,
      fullName: data.fullname,
      username: data.username,
      countryCode: country ? getCountryCallingCode(country) : '',
      phoneNumber: formatPhoneNumber(data.phone),
      password: data.password,
      companyName: data.companyName,
    };

    try {
      const response = await createUser(requestData);

      if (response.status === 200) {
        toast({
          title: 'User created successfully',
          description: 'Please check your email for verification',
        });
      }

      setTimeout(() => {
        push('/login');
      }, 3000);
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
      <div className="z-10 w-full max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white bg-opacity-90 shadow-2xl backdrop-blur-lg">
          <div className="relative z-10 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Join TaskHive
              </h2>
              <p className="text-sm text-gray-600">
                Sign up to start managing your tasks efficiently
              </p>
            </div>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                              type="email"
                              autoComplete="email"
                              className="block w-full border-gray-300 pl-10 sm:text-sm"
                              placeholder="you@example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <UserCircle className="size-5 text-gray-400" />
                            </div>
                            <Input
                              id="companyName"
                              type="text"
                              autoComplete="companyName"
                              className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                              placeholder="Taskhive"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <UserCircle className="size-5 text-gray-400" />
                            </div>
                            <Input
                              id="fullname"
                              type="text"
                              autoComplete="name"
                              className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                              placeholder="John Doe"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <User className="size-5 text-gray-400" />
                            </div>
                            <Input
                              id="username"
                              type="text"
                              autoComplete="username"
                              className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                              placeholder="johndoe"
                              {...field}
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
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative rounded-md shadow-sm">
                            <PhoneInput
                              {...field}
                              onCountryChange={setCountry}
                              defaultCountry={'IN'}
                              placeholder="Enter a phone number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Sign up'}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <p className="text-sm text-black">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                  prefetch={true}
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const PersonalInfo = ({ setCountry }: { setCountry: (country: Country) => void }) => {
  const form = useFormContext<SignupFormSchema>();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  type="email"
                  autoComplete="email"
                  className="block w-full border-gray-300 pl-10 sm:text-sm"
                  placeholder="you@example.com"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserCircle className="size-5 text-gray-400" />
                </div>
                <Input
                  id="fullname"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                  placeholder="John Doe"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="size-5 text-gray-400" />
                </div>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                  placeholder="johndoe"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <div className="relative rounded-md shadow-sm">
                <PhoneInput
                  {...field}
                  onCountryChange={setCountry}
                  defaultCountry={'IN'}
                  placeholder="Enter a phone number"
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
              <PasswordInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}


