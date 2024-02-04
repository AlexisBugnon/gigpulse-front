export interface Gig {
    id: number;
    userId: number;
    categoryId: number;
    title: string;
    picture: string;
    description: string;
    price: number;
    averageRating: number | string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    inputValueStore:[];
    tags: {
      ids: number[];
      name: string[];
    };
    slug: string;
    user: User;
    category: string;
    numberOfReviews: number;
  }

  export interface User {
    id: number;
    name: string;
    profilePicture: string;
    job: string;
    description: string;
    numberOfGigs: number;
    createdAt: string;
    email: string;
  }


  