import axios from "axios";

export const RESULTS_PER_PAGE = 20;

export interface Image {
  id: string;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  user_id: string;
  user: string;
  userImageURL: string;
  tags: string;
}

const getImages = (term: string, page: number) =>
  axios.get(`https://pixabay.com/api/`, {
    params: {
      q: term.trim().split(" ").join("+"),
      page,
      key: "26313027-ddc82f585c9a2f60647a08e46",
      per_page: RESULTS_PER_PAGE,
    },
  });

export { getImages };
