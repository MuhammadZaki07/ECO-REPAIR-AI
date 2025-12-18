import type { YouTubeVideo } from "@/types/youtube";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;

export class YouTubeService {
  private static ensureApiKey() {
    if (!API_KEY) {
      throw new Error("YouTube API Key tidak ditemukan.");
    }
  }

  static async searchRepairVideos(query: string): Promise<YouTubeVideo[]> {
    this.ensureApiKey();

    try {
      const searchQuery = encodeURIComponent(`cara memperbaiki ${query}`);
      const response = await fetch(
        `${BASE_URL}/search?part=snippet&maxResults=6&q=${searchQuery}&type=video&key=${API_KEY}`
      );

      const data = await response.json();

      if (data.error) {
        console.error("[YouTubeService]", data.error.message);
        return [];
      }

      return (data.items ?? []).map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
    } catch (error) {
      console.error("[YouTubeService.searchRepairVideos]", error);
      return [];
    }
  }
}
