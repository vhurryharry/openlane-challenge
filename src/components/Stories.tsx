import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../store";
import { getStories } from "../selectors/storySelector";
import { useEffect, useState } from "react";
import { loadStories } from "../actions/storyActions";

const Stories = () => {
  const stories = useSelector(getStories);
  const [storiesPerPage, setStoriesPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStories(page, storiesPerPage));
  }, [page, storiesPerPage]);

  return (
    <div className="page-wrapper">
      <h1>Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>{story.title}</li>
        ))}
      </ul>

      <div>
        <div>
          <span>Stories per Page</span>
          <select
            className="select"
            value={storiesPerPage}
            onChange={(e) => setStoriesPerPage(Number(e.target.value))}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <button onClick={() => setPage(page > 1 ? page - 1 : 0)}>Prev</button>
          <span>Page</span>
          <span>{page}</span>
          <button
            onClick={() => setPage(page < 500 / storiesPerPage ? page + 1 : 0)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
