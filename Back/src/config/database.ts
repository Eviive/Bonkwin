import SQLiteDatabase, { Database } from "better-sqlite3";

export let database: Database;

export const connection = () => {
    database = new SQLiteDatabase("data.db");
    loadDatabase(database);
};

const loadDatabase = (db: Database): void => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR NOT NULL,
            password VARCHAR NOT NULL
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS ad (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            price INTEGER NOT NULL,
            userid INTEGER NOT NULL REFERENCES user(id)
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS comment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content VARCHAR NOT NULL,
            userid INTEGER NOT NULL REFERENCES user(id),
            adid INTEGER NOT NULL REFERENCES ad(id)
        )
    `).run();
};
