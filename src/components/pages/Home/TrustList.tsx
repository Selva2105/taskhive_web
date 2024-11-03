import Image from 'next/image'
import React from 'react'

const TrustList = () => {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {[
                    { name: "SquareSpace", logo: "/images/company-1.png" },
                    { name: "SurveyMonkey", logo: "/images/company-2.png" },
                    { name: "GitLab", logo: "/images/company-3.png" },
                    { name: "Postman", logo: "/images/company-4.png" },
                    { name: "Reddit", logo: "/images/company-5.png" },
                ].map((company) => (
                    <div key={company.name} className="flex justify-center">
                        <Image src={company.logo} alt={company.name} width={120} height={60} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrustList