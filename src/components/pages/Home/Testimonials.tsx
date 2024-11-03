import React from 'react'

const Testimonials = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        quote: "TaskHive has transformed the way our team works. We're more organized and productive than ever.",
                        author: "Sarah Johnson",
                        position: "CEO, InnovateTech",
                        image: "https://firebasestorage.googleapis.com/v0/b/ikart-40b39.appspot.com/o/taskhive%2Fstatic-images%2F104422.jpg?alt=media&token=e3fd985c-b4aa-4f88-89e3-c78eaa3d2fec"
                    },
                    {
                        quote: "The intuitive interface and powerful features make TaskHive an indispensable tool for our projects.",
                        author: "Michael Chen",
                        position: "Project Manager, FutureSoft",
                        image: "https://firebasestorage.googleapis.com/v0/b/ikart-40b39.appspot.com/o/taskhive%2Fstatic-images%2F4287.jpg?alt=media&token=c8469cbe-3ef3-4d3f-8596-69ec4eee5a04"
                    },
                    {
                        quote: "TaskHive's collaboration features have greatly improved our team's communication and efficiency.",
                        author: "Emily Rodriguez",
                        position: "Team Lead, GlobalTech",
                        image: "https://firebasestorage.googleapis.com/v0/b/ikart-40b39.appspot.com/o/taskhive%2Fstatic-images%2F2094.jpg?alt=media&token=2a5f4e30-7e96-4a5e-8d11-5d67baaf3c91"
                    }
                ].map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.image} alt={testimonial.author} width={64} height={64} className="rounded-full mr-4 w-16 h-16 object-cover" />
                            <div>
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials