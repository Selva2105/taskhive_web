import { Bell, LayoutGrid, Users } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Streamline Your Workflow with TaskHive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    {
                        icon: <LayoutGrid className="h-12 w-12 text-amber-500" />,
                        title: "Intuitive Task Management",
                        description: "Organize and prioritize tasks with our user-friendly interface, designed for maximum efficiency."
                    },
                    {
                        icon: <Users className="h-12 w-12 text-amber-500" />,
                        title: "Seamless Collaboration",
                        description: "Connect with your team in real-time, share resources, and work together towards common goals."
                    },
                    {
                        icon: <Bell className="h-12 w-12 text-amber-500" />,
                        title: "Smart Notifications",
                        description: "Stay on top of your tasks with intelligent reminders and updates, right when you need them."
                    }
                ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="mb-6">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features