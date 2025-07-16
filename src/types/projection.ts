export type ProjectionStatus = 'reserved' | 'watched' | 'cancelled';

export interface Projection {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  director: string;
  actors: string[];
  releaseDate: string;
  projectionTimes: string[];
  ticketPrice: number;
  reviews: Review[];
  status?: ProjectionStatus;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  watchedProjections: string[];
}