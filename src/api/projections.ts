import { type Projection } from "../types/projection";

// Mock data
const mockProjections: Projection[] = [
  {
    id: "1",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    genre: "Sci-Fi",
    duration: 148,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    releaseDate: "2010-07-16",
    projectionTimes: ["2025-07-20T19:00", "2025-07-21T21:00"],
    ticketPrice: 679,
    reviews: [],
    status: "reserved"
  },
  {
    id: "2",
    title: "The Grand Budapest Hotel",
    description: "The adventures of Gustave H, a legendary concierge at a famous hotel.",
    genre: "Comedy",
    duration: 99,
    director: "Wes Anderson",
    actors: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
    releaseDate: "2014-03-28",
    projectionTimes: ["2025-07-20T17:00", "2025-07-22T20:00"],
    ticketPrice: 679,
    reviews: [],
    status: "reserved"
  },
  {
    id: "3",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space.",
    genre: "Adventure",
    duration: 169,
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    releaseDate: "2014-11-07",
    projectionTimes: ["2025-07-19T20:00", "2025-07-23T21:30"],
    ticketPrice: 679,
    reviews: [],
    status: "reserved"
  },
  {
    id: "4",
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship.",
    genre: "Thriller",
    duration: 132,
    director: "Bong Joon-ho",
    actors: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    releaseDate: "2019-11-08",
    projectionTimes: ["2025-07-21T18:30", "2025-07-22T20:30"],
    ticketPrice: 679,
    reviews: [],
    status: "reserved"
  },
  {
    id: "5",
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of reality.",
    genre: "Action",
    duration: 136,
    director: "The Wachowskis",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    releaseDate: "1999-03-31",
    projectionTimes: ["2025-07-18T20:00", "2025-07-19T23:00"],
    ticketPrice: 679,
    reviews: [],
    status: "reserved"
  }
];

// Mock API
export const fetchProjections = async (): Promise<Projection[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjections), 500); // 500ms delay
  });
};

export const getProjectionById = async (id: string): Promise<Projection | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjections.find(p => p.id === id)), 300);
  });
};