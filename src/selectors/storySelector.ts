import { AppState } from "../store";

export const getStories = (state: AppState) => {
  return state.story.stories;
};

export const isLoading = (state: AppState) => {
  return state.story.loading;
};

export const getError = (state: AppState) => {
  return state.story.error;
};
