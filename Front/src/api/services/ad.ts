import { request } from "api/client";
import { Ad, Comment } from "types/api";

export const getAds = (): Promise<Ad[]> => request("/ad");

export const getAdById = (id: number): Promise<Ad & { comments: Comment[] }> => request(`/ad/${id}`);

export const createAd = (ad: Ad): Promise<Ad> => request("/ad", {
    method: "POST",
    data: ad
});

export const deleteAd = (id: number): Promise<void> => request(`/ad/${id}`, {
    method: "DELETE"
});
