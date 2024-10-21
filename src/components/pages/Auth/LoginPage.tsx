'use client';

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Lock, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import PasswordInput from "@/components/ui/password-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "Enter a valid password" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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

    const backgroundHives = useMemo(() => (
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
                <svg width="100" className="text-primary" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" fill="rgba(255, 255, 255, 0.1)" />
                </svg>
            </div>
        ))
    ), []);

    const fixedPositions = [
        { top: '10%', left: '20%' },
        { top: '30%', left: '40%' },
        { top: '50%', left: '60%' },
        { top: '70%', left: '80%' },
        { top: '20%', left: '70%' },
        { top: '60%', left: '30%' },
    ];

    const cardHives = useMemo(() => (
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
                <svg width="100" className="text-primary" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" fill="rgba(255, 204, 0, 0.1)" />
                </svg>
            </div>
        ))
    ), []);

    async function onSubmit(data: FormSchema) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/50 to-primary/70 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Hives */}
            <div className="absolute inset-0 z-0">
                {backgroundHives}
            </div>

            <div className="w-full max-w-md z-10">
                <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden">
                    {/* Card Background Hives */}
                    <div className="absolute inset-0 z-0">
                        {cardHives}
                    </div>

                    <div className="p-8 relative z-10">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/ikart-40b39.appspot.com/o/taskhive%2Flogos%2Flogo-lap.jpg?alt=media&token=d1793450-da80-4e6e-a81f-a28d1353665a"
                                alt="TaskHive Logo"
                                className="w-20 h-20 object-contain rounded-full"
                            />
                            <h2 className="text-3xl font-extrabold text-gray-900">Welcome to TaskHive</h2>
                            <p className="text-sm text-gray-600">Log in to manage your tasks efficiently</p>
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
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Mail className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <Input
                                                            id="email-address"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            className="block w-full pl-10 sm:text-sm border-gray-300"
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
                                        <a href="#" className="font-medium text-yellow-600 hover:text-yellow-700">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        disabled={isLoading}
                                    >
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign in
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="p-4 text-center">
                            <p className="text-black">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-yellow-600 hover:text-yellow-700" prefetch={true}>
                                    Join the colony
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
