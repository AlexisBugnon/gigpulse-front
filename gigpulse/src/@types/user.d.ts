import { Gigs } from "./gig";

export interface UserAuth {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    role: string;
    isActive: boolean;
    description: string;
    job: string;
    numberOfGigs: null | integer;
    createdAt: string;
    gigsFavorites : number[];
    gigsObjectFavorites: Gigs[];
  }