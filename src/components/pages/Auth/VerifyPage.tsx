'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { verifyUser } from '@/lib/service/auth.service';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const formSchema = z.object({
    emailVerificationOTP: z.string().min(6, { message: 'Enter a valid 6-digit code' }).max(6, { message: 'Enter a valid 6-digit code' }),
    id: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface VerifyPageProps {
    id: string;
}

const VerifyPage = ({ id }: VerifyPageProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { push } = useRouter();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailVerificationOTP: '',
            id: id.toString(),
        },
    });

    async function onSubmit(data: FormSchema) {
        setIsLoading(true);

        try {
            const response = await verifyUser(data);

            if (response.status === 200) {
                toast({
                    title: 'Email verified successfully',
                    description: 'Redirecting to dashboard',
                });

                setTimeout(() => {
                    push('/login');
                }, 2000);
            }
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
                                Verify Your Account
                            </h2>
                            <p className="text-sm text-gray-600 text-center">
                                We&apos;ve sent a verification code to your email.
                                Please enter the 6-digit code below.
                            </p>
                        </div>
                        <Form {...form}>
                            <form
                                className="mt-8 space-y-6"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <div className="space-y-4 ">
                                    <FormField
                                        control={form.control}
                                        name="emailVerificationOTP"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-center w-full justify-center gap-y-4">
                                                <FormLabel>One-Time Password</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                        </InputOTPGroup>
                                                        <InputOTPSeparator />
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} />
                                                            <InputOTPSlot index={4} />
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription>
                                                    Please enter the one-time password sent to your phone.
                                                </FormDescription>
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
                                        {isLoading && (
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                        )}
                                        Verify
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="p-4 text-center">
                            <p className="text-black">
                                Didn&apos;t receive the code? <Link
                                    href="/signup"
                                    className="text-yellow-600 hover:text-yellow-700"
                                    prefetch={true}
                                >
                                    Resend Code
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;
