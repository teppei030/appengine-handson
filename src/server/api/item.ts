import database from "~/server/database/database";

export default defineEventHandler(async (event)=> {
    const sql = 'SELECT * FROM items';
    const data = await database.executeQuery(sql);
    return { data };
})
