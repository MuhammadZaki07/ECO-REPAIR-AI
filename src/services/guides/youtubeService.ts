const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; 
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchRepairVideos = async (query: string) => {
  if (!API_KEY) {
    console.error("API Key tidak ditemukan!");
    return [];
  }

  try {
    const searchQuery = encodeURIComponent(`cara memperbaiki ${query}`);
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=6&q=${searchQuery}&type=video&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      console.error("YouTube API Error:", data.error.message);
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error("Gagal fetch YouTube:", error);
    return [];
  }
};