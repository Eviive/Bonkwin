import { Router } from "express";
import { AdService } from "../services/ad";
import { sendError } from "../utils/errors";
import { Ad } from "../models/ad/ad";

export const route = Router();

route.get("/", (req, res) => {
    const ads = AdService.getAllAds();

    res.send(ads);
});

route.get("/:id([0-9]+)", (req, res) => {
    const id = parseInt(req.params.id);

    const ad = AdService.getAdById(id);

    if (ad === null) {
        return sendError(res, {
            status: 404,
            message: "Ad not found"
        });
    }

    res.send(ad);
});

route.post("/", (req, res) => {
    if (req.cookies.user === undefined) {
        return sendError(res, {
            status: 401,
            message: "You are not logged in"
        });
    }

    const ad: Ad = req.body;

    if (!ad.title || !ad.description || ad.price === undefined || ad.price <= 0) {
        return sendError(res, {
            status: 400,
            message: "Invalid ad data"
        });
    }

    ad.userid = parseInt(req.cookies.user);

    const id = AdService.createAd(ad);

    res.status(201).send({ id: id });
});

route.delete("/:id([0-9]+)", (req, res) => {
    if (req.cookies.user === undefined) {
        return sendError(res, {
            status: 401,
            message: "You are not logged in"
        });
    }

    const id = parseInt(req.params.id);

    const ad = AdService.getAdById(id);

    if (ad === null) {
        return sendError(res, {
            status: 404,
            message: "Ad not found"
        });
    }

    if (ad.userid !== parseInt(req.cookies.user)) {
        return sendError(res, {
            status: 403,
            message: "You are not allowed to delete this ad"
        });
    }

    AdService.deleteAd(id);

    res.status(204).send();
});
