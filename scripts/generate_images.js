
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

// Manually parse .env.local because dotenv might not handle the parent dir automatically
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

// Output directory
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/products');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 87 Products List
const products = [
    { id: 101, name: "Afyon White", type: "marble" },
    { id: 102, name: "Afyon Sugar", type: "marble" },
    { id: 103, name: "Carrara White", type: "marble" },
    { id: 104, name: "Calacatta Marble", type: "marble" },
    { id: 105, name: "Marmara White", type: "marble" },
    { id: 106, name: "Marmara Equator", type: "marble" },
    { id: 107, name: "Mugla White", type: "marble" },
    { id: 108, name: "Kemalpasa White", type: "marble" },
    { id: 109, name: "Ottoman Beige", type: "marble" },
    { id: 110, name: "Burdur Beige", type: "marble" },
    { id: 111, name: "Crema Nouva", type: "marble" },
    { id: 112, name: "Bilecik Rosalia", type: "marble" },
    { id: 113, name: "Sivrihisar Beige", type: "marble" },
    { id: 114, name: "Crema Bella", type: "marble" },
    { id: 115, name: "Botticino", type: "marble" },
    { id: 116, name: "Mediterranean Emperador", type: "marble" },
    { id: 117, name: "Spanish Emperador", type: "marble" },
    { id: 118, name: "Light Emperador", type: "marble" },
    { id: 119, name: "Dark Emperador", type: "marble" },
    { id: 120, name: "Grey Emperador", type: "marble" },
    { id: 121, name: "Tundra Grey", type: "marble" },
    { id: 122, name: "Cool Grey", type: "marble" },
    { id: 201, name: "Denizli Travertine", type: "travertine" },
    { id: 202, name: "Silver Travertine", type: "travertine" },
    { id: 203, name: "Arizona Travertine", type: "travertine" },
    { id: 204, name: "Grey Travertine", type: "travertine" },
    { id: 205, name: "Light Travertine", type: "travertine" },
    { id: 206, name: "Yellow Travertine", type: "travertine" },
    { id: 207, name: "Classic Travertine", type: "travertine" },
    { id: 208, name: "Noche Travertine", type: "travertine" },
    { id: 301, name: "Honey Onyx", type: "onyx" },
    { id: 302, name: "Green Onyx", type: "onyx" },
    { id: 303, name: "White Onyx", type: "onyx" },
    { id: 401, name: "Classic Limestone", type: "limestone" },
    { id: 402, name: "Cloudy Limestone", type: "limestone" },
    { id: 403, name: "Sesame Limestone", type: "limestone" },
    { id: 501, name: "Anatolian Grey Granite", type: "granite" },
    { id: 502, name: "Wildflower Granite", type: "granite" },
    { id: 503, name: "Aksaray Yaylak Granite", type: "granite" },
    { id: 601, name: "Active Dolomite", type: "dolomite" },
    { id: 602, name: "Dolomite Spider", type: "dolomite" },
    { id: 603, name: "White Dolomite", type: "dolomite" },
    { id: 801, name: "Granite Pebbles 5-10cm", type: "tumbled" },
    { id: 802, name: "Tumbled Granite", type: "tumbled" },
    { id: 803, name: "Tumbled Granite 1-3cm", type: "tumbled" },
    { id: 804, name: "Tumbled Granite 4-6cm", type: "tumbled" },
    { id: 805, name: "Granite Gravel", type: "tumbled" },
    { id: 806, name: "Tumbled Granite 2-4cm", type: "tumbled" },
    { id: 807, name: "White Dolomite 2-4cm", type: "tumbled" },
    { id: 808, name: "Dolomite", type: "tumbled" },
    { id: 809, name: "Dolomit 4/6 cm", type: "tumbled" },
    { id: 810, name: "Marmara Beyaz Dolomit", type: "tumbled" },
    { id: 811, name: "Dolomit", type: "tumbled" },
    { id: 812, name: "Dolomite Rock", type: "tumbled" },
    { id: 813, name: "Tumbled Basalt Gravel", type: "tumbled" },
    { id: 814, name: "Tumbled Basalt", type: "tumbled" },
    { id: 815, name: "Basalt Gravel", type: "tumbled" },
    { id: 816, name: "Mixed Color Pebbles", type: "tumbled" },
    { id: 817, name: "River Pebbles", type: "tumbled" },
    { id: 818, name: "Dere Çakılı", type: "tumbled" },
    { id: 819, name: "Flat Podima", type: "tumbled" },
    { id: 820, name: "Tumbled Pebbles", type: "tumbled" },
    { id: 821, name: "Podima Stone", type: "tumbled" },
    { id: 822, name: "All Mix", type: "tumbled" },
    { id: 823, name: "Black Stone", type: "tumbled" },
    { id: 824, name: "Tumbled Aegean Burgundy", type: "tumbled" },
    { id: 825, name: "Tumbled Burgundy", type: "tumbled" },
    { id: 826, name: "Green Angel", type: "tumbled" },
    { id: 827, name: "Black Angel", type: "tumbled" },
    { id: 828, name: "Desert Yellow", type: "tumbled" },
    { id: 829, name: "Angelo Cristalo", type: "tumbled" },
    { id: 830, name: "Calcite", type: "tumbled" },
    { id: 831, name: "White Slag", type: "tumbled" },
    { id: 832, name: "Riviera", type: "tumbled" },
    { id: 833, name: "Sherry", type: "tumbled" },
    { id: 834, name: "Rainbow", type: "tumbled" },
    { id: 835, name: "Yellow River", type: "tumbled" },
    { id: 836, name: "Pink Travertine Tumbled", type: "tumbled" },
    { id: 837, name: "Pearl", type: "tumbled" },
    { id: 838, name: "Rainbow Stone", type: "tumbled" },
    { id: 839, name: "Tumbled Stone Application", type: "tumbled" },
    { id: 901, name: "Quartz Sand", type: "sand" },
    { id: 902, name: "Quartz Powder", type: "sand" },
    { id: 903, name: "Quartz Granule", type: "sand" },
    { id: 904, name: "Silica Sand", type: "sand" },
    { id: 10, name: "Hexagon Carrara", type: "mosaic" },
    { id: 12, name: "Rustic Split", type: "splitface" }
];

function generatePrompt(product) {
    const base = `Full frame architectural texture of ${product.name}, ${product.type}. Ultra-photorealistic, 8K resolution, hihgly detailed stone surface, neutral studio lighting. top-down view.`;

    if (product.type === 'marble') return `${base} Polished marble slab with intricate natural veining, luxurious feel.`;
    if (product.type === 'travertine') return `${base} Porous natural travertine texture, honed finish, earthy beige tones.`;
    if (product.type === 'onyx') return `${base} semi-translucent onyx stone, backlit effect, vibrant crystalline structure.`;
    if (product.type === 'tumbled' || product.type === 'sand') return `${base} High angle Pile of natural stones/pebbles/sand. Organic arrangement, distinct textures.`;

    return base;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateSingleImage(product) {
    const outputPath = path.join(OUTPUT_DIR, `${product.id}.png`);

    if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipping ${product.id} (already exists)`);
        return;
    }

    console.log(`🎨 Generating ${product.id}: ${product.name}...`);

    try {
        const prompt = generatePrompt(product);

        // Try Imagen 4 (as discovered in available models)
        const response = await ai.models.generateContent({
            model: 'imagen-4.0-generate-001',
            contents: { parts: [{ text: prompt }] },
        });

        // Parse result
        let lowerBase64 = '';
        if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
            lowerBase64 = response.candidates[0].content.parts[0].inlineData.data;
        }

        if (lowerBase64) {
            fs.writeFileSync(outputPath, Buffer.from(lowerBase64, 'base64'));
            console.log(`✅ Saved ${product.id}`);
        } else {
            console.error(`❌ No image data in response for ${product.id}`);
        }

    } catch (error) {
        console.error(`❌ Error generating ${product.id}:`, error.message);
    }
}

async function main() {
    console.log(`🚀 Starting generation for ${products.length} products...`);
    console.log(`📁 Output: ${OUTPUT_DIR}`);

    for (const product of products) {
        await generateSingleImage(product);
        // Rate limit: wait 4 seconds between requests
        await sleep(4000);
    }

    console.log("✨ All done!");
}

main();
