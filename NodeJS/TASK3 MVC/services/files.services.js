import fs from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = fileName => join(__dirname, `../data/${fileName}`);

export async function readFile(fileName) {
    const data = await fs.readFile(filePath(fileName), "utf-8");
    return JSON.parse(data);
}

export async function writeFile(fileName, data) {
    await fs.writeFile(filePath(fileName), JSON.stringify(data, null, 2));
    
    // Log the action in a separate log file
    const logMessage = `[${new Date().toISOString()}] File ${fileName} updated\n`;
    await appendFile("logs.txt", logMessage);
}

export async function appendFile(fileName, log) {
    await fs.appendFile(filePath(fileName), log + "\n");
}