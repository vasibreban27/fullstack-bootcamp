import {number, string} from "zod";

export type UserWithoutPassword = {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
};

export type Auth={
    accessToken: string|null;
    user: UserWithoutPassword|null;
}