import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = (fileName) => join(__dirname, `../data/${fileName}`);

export async function readFile(fileName) {
    try {
        const data = await fs.readFile(filePath(fileName), "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
        throw new Error(`Cannot read file: ${fileName}`);
    }
}

export async function writeFile(fileName, data) {
    try {
        await fs.writeFile(filePath(fileName), JSON.stringify(data, null, 2));
        await appendLog("logs.txt", `[${new Date().toISOString()}] File ${fileName} updated`);
    } catch (error) {
        console.error(`Error writing file ${fileName}:`, error);
        throw new Error(`Cannot write to file: ${fileName}`);
    }
}

export async function appendLog(fileName, log) {
    try {
        await fs.appendFile(filePath(fileName), log + "\n");
    } catch (error) {
        console.error(`Error appending to file ${fileName}:`, error);
    }
}
