import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const filePath = path.join(__dirname, 'homework.txt');

function addText_write() {
    fs.writeFileSync(filePath, 'Homework 02 in Basic Node'); 
}

addText_write();

function addText_append() {
    fs.appendFileSync(filePath, '\nFINISHED!'); 
}

addText_append();

function readText() {
    const file = fs.readFileSync(filePath, 'utf-8');
    console.log(file);
}

readText()

