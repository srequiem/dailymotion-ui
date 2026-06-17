// Modèle de domaine de l'app

// Valeurs officielles du paramètre `channel` (catégories), confirmées sur
// https://developers.dailymotion.com/reference/video-categories
// Voir pour utiliser plus que ce que j'ai pris
export const CHANNEL_CATEGORIES = [
  "animals",
  "auto",
  "creation",
  "fun",
  "lifestyle",
  "music",
  "news",
  "people",
  "school",
  "shortfilms",
  "sport",
  "tech",
  "travel",
  "tv",
  "videogames",
  "webcam",
] as const;

export type ChannelCategory = (typeof CHANNEL_CATEGORIES)[number];

export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number; // en secondes
  channelName: string;
  channelId: string;
};

export type VideoDetails = Video & {
  description: string;
  likesTotal: number | null;
  createdTime: number; // timestamp unix (secondes)
  ownerAvatarUrl: string | null;
  embedUrl: string;
};

export type VideoListResponse = {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  list: Video[];
};
