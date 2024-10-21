'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import CountrySelect from '@/components/ui/country-select';
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

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Enter a street' }),
  city: z.string().min(1, { message: 'Enter a city' }),
  state: z.string().min(1, { message: 'Enter a state' }),
  country: z.string().min(1, { message: 'Enter a country' }),
  postalCode: z.string().min(1, { message: 'Enter a postal code' }),
});

const phoneNumberSchema = z.object({
  countryCode: z.string().min(1, { message: 'Enter a country code' }),
  phone: z.string().min(1, { message: 'Enter a phone number' }),
});

const signupSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    fullname: z.string().min(1, { message: 'Enter your full name' }),
    username: z.string().min(1, { message: 'Enter a username' }),
    phone: phoneNumberSchema,
    password: z.string().min(8, { message: 'Enter a valid password' }),
    confirmPassword: z.string().min(8, { message: 'Enter a valid confirm password' }),
    address: addressSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      fullname: '',
      username: '',
      phone: { countryCode: '', phone: '' },
      password: '',
      confirmPassword: '',
      address: { street: '', city: '', state: '', postalCode: '' },
    },
    mode: 'onChange',
  });

  console.log(form.formState.errors);

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

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

  const fixedScaleValues = [0.8, 0.9, 1.0, 1.1, 1.2]; // Example fixed scale values

  const backgroundHives = useMemo(
    () =>
      fixedBackgroundPositions.map((position, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: position.top,
            left: position.left,
            transform: `scale(${fixedScaleValues[i % fixedScaleValues.length]})`,
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
            transform: `scale(${fixedScaleValues[i % fixedScaleValues.length]})`, // Use fixed scale values
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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/70 to-primary px-4 sm:px-6 lg:px-8">
      {/* Background Hives */}
      <div className="absolute inset-0 z-0">{backgroundHives}</div>

      <div className="z-10 w-full max-w-3xl">
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
              <h2 className="text-3xl font-extrabold text-gray-900">Join TaskHive</h2>
              <p className="text-sm text-gray-600">
                Sign up to start managing your tasks efficiently
              </p>
            </div>
            <Form {...form}>
              <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <FormLabel>Full Name</FormLabel>
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
                              value={field.value.phone}
                              onChange={(value) => {
                                field.onChange({
                                  countryCode: value,
                                  phone: field.value.phone,
                                });
                              }}
                              onCountryChange={(countryCode) => {
                                field.onChange({ countryCode, phone: field.value.phone });
                              }}
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
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            id="street"
                            type="text"
                            className="block w-full rounded-md border-gray-300 sm:text-sm"
                            placeholder="123 Main St"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            id="city"
                            type="text"
                            className="block w-full rounded-md border-gray-300 sm:text-sm"
                            placeholder="City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            id="state"
                            type="text"
                            className="block w-full rounded-md border-gray-300 sm:text-sm"
                            placeholder="State"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            id="postal-code"
                            type="text"
                            className="block w-full rounded-md border-gray-300 sm:text-sm"
                            placeholder="Postal Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <CountrySelect
                            className="w-full"
                            priorityOptions={['IN']}
                            placeholder="Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
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
