import fs from 'fs';
import path from 'path';

const src = "C:\\Users\\SIVA B\\.gemini\\antigravity-ide\\brain\\7900222d-fba7-4993-a972-bb2f34e6ee1b\\codevault_hero_laptop_1784912778643.png";
const publicDir = "c:\\Users\\SIVA B\\Documents\\CodeVault – Code Snippet Manager - MERN\\client\\public";
const dest = path.join(publicDir, "hero-laptop.png");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log("Successfully copied hero-laptop.png to public directory!");
