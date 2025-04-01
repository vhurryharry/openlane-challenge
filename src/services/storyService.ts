import axios from "axios";

class StoryService {
  getTopStories(page: number, storiesPerPage: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = process.env.REACT_APP_API_URL + "/topstories.json";
        axios.get(url).then((response) => {
          if (response.status === 200) {
            const stories = response.data.slice(
              storiesPerPage * (page - 1),
              storiesPerPage * page
            );
            console.log(stories);
            Promise.all(
              stories.map((id: number) => this.getStoryById(id))
            ).then((stories) => {
              resolve(stories);
            });
          } else {
            reject(response.data);
          }
        });
      } catch (err: any) {
        console.error("Fetch failed: ", err);
        reject(JSON.stringify(err));
      }
    });
  }

  getCurrentPageStories(page: number, storiesPerPage: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = process.env.REACT_APP_API_URL + "/topstories.json";
        axios.get(url).then((response) => {
          if (response.status === 200) {
            const stories = response.data.slice(0, 20);
            Promise.all(
              stories.map((id: number) => this.getStoryById(id))
            ).then((stories) => {
              resolve(stories);
            });
          } else {
            reject(response.data);
          }
        });
      } catch (err: any) {
        console.error("Fetch failed: ", err);
        reject(JSON.stringify(err));
      }
    });
  }

  getStoryById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = process.env.REACT_APP_API_URL + `/item/${id}.json`;
        axios.get(url).then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        });
      } catch (err: any) {
        console.error("Fetch failed: ", err);
        reject(JSON.stringify(err));
      }
    });
  }
}

export default new StoryService();
