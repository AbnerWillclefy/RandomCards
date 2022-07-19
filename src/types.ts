export interface AnimeData {
  title: string;
  mal_id: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  synopsis: string;
}
