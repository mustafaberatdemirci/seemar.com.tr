const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, '../constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

// Regex to find all slab objects: { id: 101, slug: "afyon-white", ... }
const slabRegex = /{\s*id:\s*(\d+),\s*slug:\s*"([^"]+)"/g;

let match;
const found = [];

while ((match = slabRegex.exec(content)) !== null) {
    found.push({ id: parseInt(match[1]), slug: match[2], index: match.index });
}

console.log(`Found ${found.length} slab definitions.`);

const mapEN = new Map();
const mapTR = new Map();

// Assuming first half is EN, second half is TR based on file structure
// SLABS_EN starts early, SLABS_TR starts later.
// We can try to split by the variable declaration lines.

const trStart = content.indexOf('const SLABS_TR');
if (trStart === -1) {
    console.error("Could not find SLABS_TR declaration");
    process.exit(1);
}

found.forEach(item => {
    if (item.index < trStart) {
        if (mapEN.has(item.id)) {
            console.warn(`Duplicate ID in EN: ${item.id}`);
        }
        mapEN.set(item.id, item.slug);
    } else {
        if (mapTR.has(item.id)) {
            console.warn(`Duplicate ID in TR: ${item.id}`);
        }
        mapTR.set(item.id, item.slug);
    }
});

console.log(`EN items: ${mapEN.size}`);
console.log(`TR items: ${mapTR.size}`);

// Compare
let errors = 0;
mapEN.forEach((slugEN, id) => {
    if (!mapTR.has(id)) {
        console.error(`Missing ID ${id} in TR list`);
        errors++;
    } else {
        const slugTR = mapTR.get(id);
        if (slugEN !== slugTR) {
            console.error(`Mismatch for ID ${id}: EN="${slugEN}", TR="${slugTR}"`);
            errors++;
        }
    }
});

mapTR.forEach((slugTR, id) => {
    if (!mapEN.has(id)) {
        console.error(`Missing ID ${id} in EN list`);
        errors++;
    }
});

if (errors === 0) {
    console.log("SUCCESS: All slugs match!");
} else {
    console.log(`FAILURE: ${errors} errors found.`);
}
