import { useQuery } from "@tanstack/react-query";
import movieApi from "../common/apis/movieApi";
import { APIKey } from "../common/apis/MovieApiKey";

// Fetch Movies
export const useFetchMovies = (searchTerm) => {
  return useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: async () => {
      const response = await movieApi.get(`?apiKey=${APIKey}&s=${searchTerm}&type=movie`);
      return response.data.Search; 
    },
    enabled: !!searchTerm, 
  });
};

// Fetch Shows
export const useFetchShows = (searchTerm) => {
  return useQuery({
    queryKey: ["shows", searchTerm],
    queryFn: async () => {
      const response = await movieApi.get(`?apiKey=${APIKey}&s=${searchTerm}&type=series`);
      return response.data.Search;
    },
    enabled: !!searchTerm, 
  });
};

// Fetch Movie or Show Details
export const useFetchMoviesOrShows = (id) => {
    return useQuery({
      queryKey: ["moviesOrShow", id],
      queryFn: async () => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
        return response.data; // Return full details of the movie or show
      },
      enabled: !!id, // Ensure the query only runs when a valid ID is provided
    });
};
