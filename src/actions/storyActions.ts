import {
  getTopStories,
  getTopStoriesSuccess,
  setError,
} from "../reducers/storyReducer";
import storyService from "../services/storyService";
import { AppDispatch } from "../store";

export const loadStories = (page: number, storiesPerPage: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(getTopStories());

    return storyService
      .getTopStories(page, storiesPerPage)
      .then((stories) => dispatch(getTopStoriesSuccess({ stories })))
      .catch((error) => dispatch(setError({ error })));
  };
};
