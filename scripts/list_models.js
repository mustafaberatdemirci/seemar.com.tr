
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API Key found");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

async function listModels() {
    try {
        console.log("Fetching available models...");
        const response = await ai.models.list();

        console.log("\n--- Available Models ---");
        // The SDK structure for list() might return an async iterable or a response object depending on version
        // We'll iterate if it's iterable, or log the response

        // Check if response is iterable
        if (Symbol.asyncIterator in response || Symbol.iterator in response) {
            for await (const model of response) {
                console.log(`- ${model.name} (${model.version}) [Methods: ${model.supportedGenerationMethods?.join(', ')}]`);
            }
        } else if (response.models) {
            // If it returns a standard JSON response
            response.models.foreach(model => {
                console.log(`- ${model.name} [Methods: ${model.supportedGenerationMethods?.join(', ')}]`);
            });
        } else {
            console.log("Raw response:", response);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
