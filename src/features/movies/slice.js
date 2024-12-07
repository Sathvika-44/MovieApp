import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
  async (term, errorValue) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=movie`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      return errorValue(error.message);
    }
  })

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',
  async (term, errorValue) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${term}&type=series`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching shows:", error.message);
      return errorValue(error.message);
    }
  })

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id, errorValue) => {
    try {
      const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie/show details:", error.message);
      return errorValue(error.message);
    }
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
}

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Successfully");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, selectedMovieOrShow: payload };
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, shows: payload };
      });
  },

});

export const { removeSelectedMovieOrShow } = slice.actions;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getAllShows = (state) => state.movies.shows;
export const getAllMovies = (state) => state.movies.movies;
export default slice.reducer;