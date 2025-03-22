import { appendLog } from "../services/files.services.js";

export default async function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    const log = `${timestamp} ${req.method} ${req.url}`;

    try {
        await appendLog("calls.log", log);
    } catch (error) {
        console.error("Error logging request:", error);
    }

    next();
}