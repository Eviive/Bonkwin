import { Ad, AdWithComments } from "../models/ad/ad";
import { AdHelper } from "../models/ad/helpers";

const getAllAds = (): Ad[] => {
    return AdHelper.getAllAds();
};

const getAdById = (id: number): AdWithComments => {
    return AdHelper.getAdById(id);
};

const createAd = (ad: Ad): number | bigint => {
    const res = AdHelper.createAd(ad);

    return res.lastInsertRowid;
};

const deleteAd = (id: number): number => {
    const res = AdHelper.deleteAd(id);

    return res.changes;
};

export const AdService = {
    getAllAds,
    getAdById,
    createAd,
    deleteAd
};
