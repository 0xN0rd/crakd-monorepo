export enum UserRole {
    Regular = 'Regular',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin',
}

export interface AuthUser {
    _id: string;
    role: UserRole;
    fullName?: string;
    username?: string;
    email?: string;
    createdAt?: Date;
    gamertag?: string;
    tournaments: [];
    facebookId?: string;
    googleId?: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface Tournament {
    _id?: string;
    name: string;
    authRequired: boolean;
    description?: string;
    order: number;
    format: string;
    duration: string;
    entries: [];
}

export interface Entry {
    _id: string;
    score: number;
    position: number;
    tournament: Tournament;
    user: any;
    createdAt: string;
}