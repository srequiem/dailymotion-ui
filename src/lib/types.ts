// Modèle de domaine de l'app

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
