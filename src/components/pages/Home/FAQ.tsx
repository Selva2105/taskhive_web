import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const FAQ = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                {[
                    {
                        question: "How does TaskHive help improve productivity?",
                        answer: "TaskHive provides intuitive task management tools, real-time collaboration features, and smart notifications to help teams stay organized and focused on their goals. By streamlining workflows and improving communication, TaskHive significantly boosts overall productivity."
                    },
                    {
                        question: "Can TaskHive integrate with other tools we use?",
                        answer: "Yes, TaskHive offers integrations with a wide range of popular tools and platforms. Our Pro and Enterprise plans include advanced integration options to ensure TaskHive fits seamlessly into your existing workflow."
                    },
                    {
                        question: "Is my data secure with TaskHive?",
                        answer: "Absolutely. We take data security very seriously. TaskHive uses industry-standard encryption protocols, regular security audits, and strict access controls to ensure your data remains safe and confidential at all times."
                    },
                    {
                        question: "How does pricing work for larger teams?",
                        answer: "Our pricing is designed to be flexible and scalable. The Pro plan accommodates up to 20 team members, while our Enterprise plan offers custom pricing for larger organizations with specific needs. We recommend contacting our sales team for a tailored quote."
                    },
                    {
                        question: "Do you offer a free trial?",
                        answer: "Yes, we offer a 14-day free trial on all our plans. This allows you to explore TaskHive's features and determine which plan best suits your team's needs before making a commitment."
                    }
                ].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger iconType='plus'>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default FAQ