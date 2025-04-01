import { createSlice } from "@reduxjs/toolkit";

export type StoryState = {
  stories: Array<any>;
  currentStories: Array<any>;
  error: any;
  loading: boolean;
};

const initialState: StoryState = {
  stories: [],
  currentStories: [],
  error: "",
  loading: false,
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    getTopStories: (state) => {
      state.loading = true;
      state.error = "";
    },
    getTopStoriesSuccess: (state, action) => {
      state.stories = [...action.payload.stories];
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTopStories, getTopStoriesSuccess, setError } =
  storySlice.actions;

export default storySlice.reducer;
