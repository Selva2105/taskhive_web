'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PlanFeature {
    type: string;
    features: {
        name: string;
        Pollinator: boolean | string;
        HoneyMaker: boolean | string;
        HiveBuilder: boolean | string;
        QueenCourt: boolean | string;
    }[];
}

interface Plan {
    id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonVariant: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost";
    isPopular: boolean;
    priceId: string;
}

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { push } = useRouter();

    const monthlyPrices = {
        Pollinator: 0,
        HoneyMaker: 499,
        HiveBuilder: 999,
        QueenCourt: 1499,
    };

    const yearlyPrices = {
        Pollinator: 0,
        HoneyMaker: 5400,
        HiveBuilder: 10800,
        QueenCourt: 16800,
    };

    const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

    const plans: Plan[] = [
        {
            id: "Pollinator",
            title: "Pollinator 🐝 (Free)",
            price: "Free",
            description: "Forever free",
            features: [
                "1 organization",
                "3 members per org",
                "2 roles per org",
                "50 tasks per project"
            ],
            buttonVariant: "outline",
            isPopular: false,
            priceId: "",
        },
        {
            id: "HoneyMaker",
            title: "HoneyMaker 🍯 (Starter)",
            price: isYearly ? formatPrice(yearlyPrices.HoneyMaker) : formatPrice(monthlyPrices.HoneyMaker),
            description: "All the basics for starting a new business",
            features: [
                "1 organization",
                "10 members per org",
                "3 roles per org",
                "Priority Support"
            ],
            buttonVariant: "default",
            isPopular: true,
            priceId: isYearly ? "price_1QHLXKKwOCNRHTuuQ7RrJ4ta" : "price_1QHLWBKwOCNRHTuuIwbm1kwa",
        },
        {
            id: "HiveBuilder",
            title: "HiveBuilder 🏗️ (Growth)",
            price: isYearly ? formatPrice(yearlyPrices.HiveBuilder) : formatPrice(monthlyPrices.HiveBuilder),
            description: "Everything you need for a growing business",
            features: [
                "3 organizations",
                "50 members per org",
                "8 roles per org",
                "Priority Support"
            ],
            buttonVariant: "outline",
            isPopular: false,
            priceId: isYearly ? "price_1QHLceKwOCNRHTuuPECHTZbM" : "price_1QHLbwKwOCNRHTuuqWTo75hq",
        },
        {
            id: "QueenCourt",
            title: "Queen’s Court 👑 (Enterprise)",
            price: isYearly ? formatPrice(yearlyPrices.QueenCourt) : formatPrice(monthlyPrices.QueenCourt),
            description: "Advanced features for scaling your business",
            features: [
                "Unlimited organizations",
                "Unlimited members per org",
                "Unlimited roles per org",
                "24/7 Premium Support"
            ],
            buttonVariant: "outline",
            isPopular: false,
            priceId: isYearly ? "price_1QHLdvKwOCNRHTuu2R6ymcBB" : "price_1QHLdGKwOCNRHTuuALRPvxRh",
        }
    ];

    const planFeatures: PlanFeature[] = [
        {
            type: "Subscription Details",
            features: [
                {
                    name: "Max Organizations",
                    Pollinator: '2',
                    HoneyMaker: '3',
                    HiveBuilder: '3',
                    QueenCourt: 'Unlimited'
                },
                {
                    name: "Max Members per Org",
                    Pollinator: '10',
                    HoneyMaker: '50',
                    HiveBuilder: '50',
                    QueenCourt: 'Unlimited'
                },
                {
                    name: "Max Roles per Org",
                    Pollinator: '3',
                    HoneyMaker: '8',
                    HiveBuilder: '8',
                    QueenCourt: 'Unlimited'
                },
                {
                    name: "Max Projects per Org",
                    Pollinator: '10',
                    HoneyMaker: '15',
                    HiveBuilder: '25',
                    QueenCourt: 'Unlimited'
                },
                {
                    name: "Max Tasks per Project",
                    Pollinator: '50',
                    HoneyMaker: '100',
                    HiveBuilder: '200',
                    QueenCourt: 'Unlimited'
                },
            ],
        },
        {
            type: "Support & Customization",
            features: [
                {
                    name: "Priority Support",
                    Pollinator: false,
                    HoneyMaker: false,
                    HiveBuilder: true,
                    QueenCourt: true
                },
                {
                    name: "Custom Roles",
                    Pollinator: false,
                    HoneyMaker: false,
                    HiveBuilder: true,
                    QueenCourt: true
                },
            ],
        },
        {
            type: "Collaboration & Analytics",
            features: [
                {
                    name: "Team Collaboration Tools",
                    Pollinator: true,
                    HoneyMaker: true,
                    HiveBuilder: true,
                    QueenCourt: true
                },
                {
                    name: "Reports & Analytics",
                    Pollinator: false,
                    HoneyMaker: false,
                    HiveBuilder: true,
                    QueenCourt: true
                },
            ],
        },
    ];

    const getPrice = (plan: Plan) => {
        const price = isYearly ? yearlyPrices[plan.id as keyof typeof yearlyPrices] : monthlyPrices[plan.id as keyof typeof monthlyPrices];
        return { price };
    };

    const handleOpenChange = (open: boolean) => setIsOpen(open);

    return (
        <>
            {/* Pricing */}
            <div className="container">
                {/* Title */}
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Pricing
                    </h2>
                    <p className="mt-1 text-muted-foreground">
                        Whatever your status, our offers evolve according to your needs.
                    </p>
                </div>
                {/* End Title */}
                {/* Switch */}
                <div className="flex justify-center items-center">
                    <Label htmlFor="payment-schedule" className="me-3">
                        Monthly
                    </Label>
                    <Switch id="payment-schedule" checked={isYearly} onCheckedChange={setIsYearly} />
                    <Label htmlFor="payment-schedule" className="relative ms-3">
                        Annual
                        <span className="absolute -top-10 start-auto -end-28">
                            <span className="flex items-center">
                                <svg
                                    className="w-14 h-8 -me-6"
                                    width={45}
                                    height={25}
                                    viewBox="0 0 45 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                                        fill="currentColor"
                                        className="text-muted-foreground"
                                    />
                                </svg>
                                <Badge className="mt-3 uppercase">Save up to 10%</Badge>
                            </span>
                        </span>
                    </Label>
                </div>
                {/* End Switch */}
                {/* Grid */}
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={plan.isPopular ? "border-primary" : ""}>
                            <CardHeader className="text-center pb-2">
                                {plan.isPopular && (
                                    <Badge className="uppercase w-max self-center mb-3">Most popular</Badge>
                                )}
                                <CardTitle className={plan.isPopular ? "!mb-7" : "mb-7"}>{plan.title}</CardTitle>
                                <span className="flex items-end gap-2 justify-center">
                                    <span className="font-bold text-5xl">{getPrice(plan).price === 0 ? "Free" : `₹ ${getPrice(plan).price}`}</span>
                                </span>
                            </CardHeader>
                            <CardDescription className="text-center w-11/12 mx-auto line-clamp-2">
                                {plan.description}
                            </CardDescription>
                            <CardContent>
                                <ul className="mt-7 space-y-2.5 text-sm">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex space-x-2 line-clamp-1">
                                            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                                            <span className="text-muted-foreground line-clamp-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={plan.isPopular ? "default" : "outline"}
                                >
                                    {plan.priceId === "" ? "Get Started" : "Subscribe"}
                                </Button>
                                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Information !</DialogTitle>
                                            <DialogDescription>
                                                It seems like you are not logged in. Please sign in to purchase a plan.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end space-x-4 pt-4">
                                            <Button variant="default" onClick={() => push("/login")}>
                                                Sign in
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {/* End Grid */}
                <div className="mt-20">
                    <div className="lg:text-center mb-10 lg:mb-20">
                        <h3 className="text-2xl font-semibold dark:text-white">Compare plans</h3>
                    </div>
                    {/* xs to lg */}
                    <Table className="hidden lg:table">
                        <TableHeader>
                            <TableRow className="bg-muted hover:bg-muted">
                                <TableHead className="w-3/12 text-primary text-base font-medium">Plans</TableHead>
                                <TableHead className="w-2/12 text-black text-base font-medium text-center">Pollinator 🐝 (Free)</TableHead>
                                <TableHead className="w-2/12 text-black text-base font-medium text-center">HoneyMaker 🍯 (Starter)</TableHead>
                                <TableHead className="w-2/12 text-black text-base font-medium text-center">HiveBuilder 🏗️ (Growth)</TableHead>
                                <TableHead className="w-2/12 text-black text-base font-medium text-center">Queen’s Court 👑 (Enterprise)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {planFeatures.map((featureType, featureTypeIndex) => (
                                <React.Fragment key={featureTypeIndex}>
                                    <TableRow className="bg-muted/50">
                                        <TableCell colSpan={5} className="font-bold">{featureType.type}</TableCell>
                                    </TableRow>
                                    {featureType.features.map((feature, featureIndex) => (
                                        <TableRow key={`${featureType.type}-${feature.name}-${featureIndex}`} className="text-muted-foreground">
                                            <TableCell>{feature.name}</TableCell>
                                            <TableCell>
                                                <div className="mx-auto w-min">
                                                    {typeof feature.Pollinator === 'boolean' ? (
                                                        feature.Pollinator ? (
                                                            <CheckIcon className="h-5 w-5" />
                                                        ) : (
                                                            <MinusIcon className="h-5 w-5" />
                                                        )
                                                    ) : (
                                                        <span className="text-muted-foreground text-center">{feature.Pollinator}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="mx-auto w-min">
                                                    {typeof feature.HoneyMaker === 'boolean' ? (
                                                        feature.HoneyMaker ? (
                                                            <CheckIcon className="h-5 w-5" />
                                                        ) : (
                                                            <MinusIcon className="h-5 w-5" />
                                                        )
                                                    ) : (
                                                        <span className="text-muted-foreground text-center">{feature.HoneyMaker}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="mx-auto w-min">
                                                    {typeof feature.HiveBuilder === 'boolean' ? (
                                                        feature.HiveBuilder ? (
                                                            <CheckIcon className="h-5 w-5" />
                                                        ) : (
                                                            <MinusIcon className="h-5 w-5" />
                                                        )
                                                    ) : (
                                                        <span className="text-muted-foreground text-center">{feature.HiveBuilder}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="mx-auto w-min">
                                                    {typeof feature.QueenCourt === 'boolean' ? (
                                                        feature.QueenCourt ? (
                                                            <CheckIcon className="h-5 w-5" />
                                                        ) : (
                                                            <MinusIcon className="h-5 w-5" />
                                                        )
                                                    ) : (
                                                        <span className="text-muted-foreground text-center">{feature.QueenCourt}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Mobile view */}
                    <div className="space-y-24 lg:hidden">
                        {["Pollinator", "HoneyMaker", "HiveBuilder", "QueenCourt"].map((plan, index) => (
                            <section key={plan}>
                                <div className="mb-4">
                                    <h4 className="text-xl font-medium">{plan}</h4>
                                </div>
                                <Table>
                                    <TableBody>
                                        {planFeatures.map((featureType, featureTypeIndex) => (
                                            <React.Fragment key={featureTypeIndex}>
                                                <TableRow key={`mobile-${featureType.type}`} className="bg-muted hover:bg-muted">
                                                    <TableCell colSpan={2} className="w-10/12 text-primary font-bold">{featureType.type}</TableCell>
                                                </TableRow>
                                                {featureType.features.map((feature) => (
                                                    <TableRow key={`mobile-${featureType.type}-${feature.name}`} className="text-muted-foreground">
                                                        <TableCell className="w-11/12">{feature.name}</TableCell>
                                                        <TableCell className="text-right">
                                                            {typeof feature[plan as keyof typeof feature] === 'boolean' ? (
                                                                feature[plan as keyof typeof feature] ? (
                                                                    <CheckIcon className="h-5 w-5" />
                                                                ) : (
                                                                    <MinusIcon className="h-5 w-5" />
                                                                )
                                                            ) : (
                                                                <span className="text-muted-foreground text-center">{feature[plan as keyof typeof feature]}</span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </section>
                        ))}
                    </div>
                    {/* End xs to lg */}
                </div>

                {/* End Comparison table */}
            </div>
            {/* End Pricing */}
        </>
    );
}
