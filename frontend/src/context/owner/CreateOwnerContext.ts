import { createContext } from "react";
import type { AuthResponse, LoginPayload } from "../../types/auth";

export type OwnerContextValue = {
    isAuthenticatedOwner: boolean;
    signup: (
        ownerData: LoginPayload,
        setSuccess: (isSuccess: boolean) => void,
    ) => Promise<void>;
    ownerAuth?: AuthResponse | null;
    loading: boolean;
    authenticationMe: () => Promise<void>;
};

export const OwnerContext = createContext<OwnerContextValue | undefined>(
    undefined,
);