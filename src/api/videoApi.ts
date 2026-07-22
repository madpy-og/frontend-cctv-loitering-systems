// Untuk video feed MJPEG, kita tidak menggunakan axios,
// melainkan URL langsung yang disematkan di attribute src dari <img> tag.

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const getVideoFeedUrl = (): string => {
  return `${baseURL}/video_feed`;
};
