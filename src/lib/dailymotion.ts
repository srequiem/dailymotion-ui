import type { Video, VideoDetails, VideoListResponse } from "./types";

const BASE_URL = "https://api.dailymotion.com";
const PAGE_SIZE = 18;

const LIST_FIELDS = [
  "id",
  "title",
  "thumbnail_360_url",
  "duration",
  "owner.id",
  "owner.screenname",
].join(",");

const DETAIL_FIELDS = [
  "id",
  "title",
  "description",
  "duration",
  "likes_total",
  "created_time",
  "embed_url",
  "owner.id",
  "owner.screenname",
  "owner.avatar_120_url",
].join(",");

type RawVideo = {
  id: string;
  title: string;
  duration?: number;
  thumbnail_360_url?: string;
  description?: string;
  likes_total?: number;
  created_time?: number;
  embed_url?: string;
  "owner.avatar_120_url"?: string;
  "owner.id"?: string;
  "owner.screenname"?: string;
};

type RawList = {
  page: number;
  limit: number;
  total?: number;
  has_more: boolean;
  list: RawVideo[];
};

export class DailymotionError extends Error { }

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new DailymotionError(`Dailymotion API responded with status ${response.status}`);
  }
  const data = await response.json();
  if (data && typeof data === "object" && "error" in data && data.error) {
    throw new DailymotionError(data.error?.message ?? "Unknown Dailymotion API error");
  }
  return data as T;
};

const toVideo = (raw: RawVideo): Video => ({
  id: raw.id,
  title: raw.title,
  thumbnailUrl: raw.thumbnail_360_url ?? "",
  duration: raw.duration ?? 0,
  channelName: raw["owner.screenname"] ?? "Unknown channel",
  channelId: raw["owner.id"] ?? "",
});

const toListResponse = (raw: RawList): VideoListResponse => ({
  page: raw.page,
  limit: raw.limit,
  total: raw.total ?? raw.list.length,
  hasMore: raw.has_more,
  list: raw.list.map(toVideo),
});

const listParams = (extra: Record<string, string>, page: number): string =>
  new URLSearchParams({
    fields: LIST_FIELDS,
    limit: String(PAGE_SIZE),
    page: String(page),
    flags: "no_explicit",
    ...extra,
  }).toString();

type VideoQuery = {
  search?: string;
  channel?: string;
  page?: number;
};

export const getVideos = async ({ search, channel, page = 1 }: VideoQuery): Promise<VideoListResponse> => {
  const trimmed = search?.trim();
  const extra: Record<string, string> = trimmed
    ? { search: trimmed, sort: "relevance" }
    : { sort: "trending" };
  if (channel) extra.channel = channel;

  const raw = await request<RawList>(`/videos?${listParams(extra, page)}`);
  return toListResponse(raw);
};

export const getDefaultVideos = async (page = 1): Promise<VideoListResponse> =>
  getVideos({ page });

export const searchVideos = async (query: string, page = 1): Promise<VideoListResponse> =>
  getVideos({ search: query, page });

export const getVideo = async (id: string): Promise<VideoDetails> => {
  const raw = await request<RawVideo>(
    `/video/${encodeURIComponent(id)}?${new URLSearchParams({ fields: DETAIL_FIELDS })}`
  );
  return {
    ...toVideo(raw),
    description: raw.description ?? "",
    likesTotal: typeof raw.likes_total === "number" ? raw.likes_total : null,
    createdTime: raw.created_time ?? 0,
    ownerAvatarUrl: raw["owner.avatar_120_url"] ?? null,
    embedUrl: raw.embed_url || `https://geo.dailymotion.com/player.html?video=${raw.id}`,
  };
};
