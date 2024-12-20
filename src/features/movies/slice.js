import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

// Fetch Movies Async Action
export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=movie`
      );
      return response.data; // return successful data
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Fetch Shows Async Action
export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data; // return successful data
    } catch (error) {
      console.error("Error fetching shows:", error.message);
      return rejectWithValue(error.message); // Return error message
    }
  }
);

// Fetch Movie/Show Details Async Action
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
      );
      return response.data; // return successful data
    } catch (error) {
      console.error("Error fetching movie/show details:", error.message);
      return rejectWithValue(error.message); // Return error message
    }
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  error: null, // Add an error field to the state
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
        state.error = null; // Reset error on pending
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Successfully");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        console.log("Rejected");
        state.error = action.payload || action.error.message; // Set error message on failure
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, selectedMovieOrShow: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.rejected, (state, action) => {
        console.log("Rejected");
        state.error =  action.payload ||action.error.message; // Set error message on failure
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, shows: payload };
      })
      .addCase(fetchAsyncShows.rejected, (state, action) => {
        console.log("Rejected");
        state.error = action.payload || action.error.message; // Set error message on failure
      })
  },
});

export const { removeSelectedMovieOrShow } = slice.actions;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getAllShows = (state) => state.movies.shows;
export const getAllMovies = (state) => state.movies.movies;
export default slice.reducer;
