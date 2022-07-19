import api from "./api";

import { AnimeData } from "../types";

export async function getAnime(): Promise<AnimeData> {
  const { data } = await api.get("/random/anime");

  return data.data;
}
