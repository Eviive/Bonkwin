import { Ad, AdWithComments } from "./ad";
import { database } from "../../config/database";
import { CommentWithUser } from "../comment/comment";

const getAllAds = (): Ad[] => {
    return database.prepare("SELECT * FROM ad").all();
};

const getAdById = (id: number): AdWithComments => {
    const rows = database.prepare(`
        SELECT ad.*, comment.id AS commentid, comment.content, comment.userid, comment.adid, user.username
        FROM ad
        LEFT JOIN comment ON ad.id = comment.adid
        LEFT JOIN user ON comment.userid = user.id
        WHERE ad.id = ?
    `).all([id]);

    // Would be automatic if we used an ORM
    const comments: CommentWithUser[] = rows.filter(row =>
        row.commentid !== null
    ).map(row => {
        return {
            id: row.commentid,
            adid: row.adid,
            userid: row.userid,
            content: row.content,
            user: { username: row.username }
        };
    });

    return {
        id: rows[0].id,
        title: rows[0].title,
        description: rows[0].description,
        price: rows[0].price,
        userid: rows[0].userid,
        comments: comments
    };
};

const createAd = (ad: Ad) => {
    return database.prepare(`
        INSERT INTO ad(
            title,
            description,
            price,
            userid
        ) VALUES (?, ?, ?, ?)
    `).run([ad.title, ad.description, ad.price, ad.userid]);
};

const deleteAd = (id: number) => {
    return database.prepare("DELETE FROM ad WHERE id = ?").run([id]);
};

export const AdHelper = {
    getAllAds,
    getAdById,
    createAd,
    deleteAd
};
