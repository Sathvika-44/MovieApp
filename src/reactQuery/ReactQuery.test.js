import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieListing from '../components/MovieListing/MovieListing';
import {useFetchMovies,useFetchShows} from './ReactQuery';
import { MemoryRouter } from "react-router-dom";
// Create a query client instance for React Query
const queryClient = new QueryClient();

// Mock the hooks
jest.mock("./ReactQuery", () => ({
  useFetchMovies: jest.fn(),
  useFetchShows: jest.fn(),
}));

jest.mock('react-slick', () => ({
    __esModule: true,
    default: ({ children }) => <div>{children}</div>,
  }));
  

test("shows loading state while fetching movies and shows", async () => {
  // Mock the API calls for movies and shows
  useFetchMovies.mockReturnValue({ data: [], isLoading: true });
  useFetchShows.mockReturnValue({ data: [], isLoading: true });

  render(
    <QueryClientProvider client={queryClient}>
     <MemoryRouter>
       <MovieListing searchTerm="action" />
       </MemoryRouter>
    </QueryClientProvider>
  );

  // Check that loading text is shown for both movies and shows
  expect(screen.getByText("Loading Movies...")).toBeInTheDocument();
  expect(screen.getByText("Loading Shows...")).toBeInTheDocument();
});

test("renders movie and show cards when data is fetched", async () => {
  const movies = [
    { imdbID: "1", Title: "Movie 1", Year: "2020", Poster: "url" },
    { imdbID: "2", Title: "Movie 2", Year: "2021", Poster: "url" },
  ];
  const shows = [
    { imdbID: "3", Title: "Show 1", Year: "2022", Poster: "url" },
    { imdbID: "4", Title: "Show 2", Year: "2023", Poster: "url" },
  ];

  // Mock the hooks to return mock data
  useFetchMovies.mockReturnValue({ data: movies, isLoading: false });
  useFetchShows.mockReturnValue({ data: shows, isLoading: false });

  render(
    <QueryClientProvider client={queryClient}>
     <MemoryRouter>
       <MovieListing searchTerm="action" />
       </MemoryRouter>
    </QueryClientProvider>
  );

  // Wait for the components to render
  await waitFor(() => screen.getByText("Movie 1"));
  await waitFor(() => screen.getByText("Show 1"));

  // Check if the movie and show cards are rendered
  expect(screen.getByText("Movie 1")).toBeInTheDocument();
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
  expect(screen.getByText("Show 1")).toBeInTheDocument();
  expect(screen.getByText("Show 2")).toBeInTheDocument();
});

test("displays 'No movies found' if no movie data is available", async () => {
  useFetchMovies.mockReturnValue({ data: [], isLoading: false });
  useFetchShows.mockReturnValue({ data: [], isLoading: false });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
       <MovieListing searchTerm="action" />
       </MemoryRouter>
    </QueryClientProvider>
  );

  // Check that the "No movies found" message is shown
  expect(screen.getByText("No movies found")).toBeInTheDocument();
});

test("displays 'No shows found' if no show data is available", async () => {
  useFetchMovies.mockReturnValue({ data: [], isLoading: false });
  useFetchShows.mockReturnValue({ data: [], isLoading: false });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
       <MovieListing searchTerm="action" />
       </MemoryRouter>
    </QueryClientProvider>
  );

  // Check that the "No shows found" message is shown
  expect(screen.getByText("No shows found")).toBeInTheDocument();
});
