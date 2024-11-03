import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define TypeScript interfaces for the user data
interface UserSettings {
    id: string;
    theme: string;
    notifications: boolean;
}

interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    details: string | null;
    actionType: string;
    color: string;
    createdAt: string;
}

interface User {
    id: string;
    email: string;
    username: string;
    fullName: string;
    companyName: string | null;
    countryCode: string;
    phoneNumber: string;
    stripe_customer_id: string;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    emailVerificationOTP: string;
    bio: string | null;
    settings: UserSettings;
    activityLog: ActivityLog[];
    avatar: string | null;
    emailVerified: boolean;
    userSettingsId: string;
}

// Define the initial state of the user slice
interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

interface ErrorResponse {
    message: string;
}

interface FetchUserDataParams {
    id: string;
    token: string;
}

export const fetchUserData = createAsyncThunk<
    User,
    FetchUserDataParams,
    {
        rejectValue: ErrorResponse;
    }
>("user/fetchUserData", async ({ id, token }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue({ message: errorMessage });
        } else {
            return rejectWithValue({ message: "An unexpected error occurred" });
        }
    }
});

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Define any synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.user = action.payload; // Update the user state with the fetched data
            })
            .addCase(fetchUserData.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch user data';
            });
    },
});

export default userSlice.reducer;
