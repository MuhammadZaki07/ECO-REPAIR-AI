import { ENV } from "@/env";
import type { YouTubeVideo } from "@/types/youtube";

export class YouTubeService {
  private static ensureApiKey() {
    if (!ENV.YOUTUBE_BASE_URL) {
      throw new Error("YouTube API Key tidak ditemukan.");
    }
  }

  static async searchRepairVideos(query: string): Promise<YouTubeVideo[]> {
    this.ensureApiKey();

    const searchQuery = encodeURIComponent(`cara memperbaiki ${query}`);
    const response = await fetch(
      `${ENV.YOUTUBE_BASE_URL}/search?part=snippet&maxResults=6&q=${searchQuery}&type=video&key=${ENV.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[YouTubeService]", data?.error);
      throw new Error(
        data?.error?.message || "Gagal mengambil video dari YouTube"
      );
    }

    return (data.items ?? []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  }
}
