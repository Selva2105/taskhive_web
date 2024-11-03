interface RequestUser {
    email: string;
    username: string;
    password: string;
    fullName: string;
    countryCode: string;
    phoneNumber: string;
    companyName: string;
}

interface LoginUser {
    email: string;
    password: string;
}

interface VerifyUser {
    id: string;
    emailVerificationOTP: string;
}

export type { RequestUser, LoginUser, VerifyUser };
