import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { JSONFilePreset } from "lowdb/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const DB_FILE = path.join(DATA_DIR, "db.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultData = {
  products: [],
  categories: [],
  customers: [],
  enquiries: []
};

let dbInstance = null;

export async function getDb() {
  if (!dbInstance) {
    dbInstance = await JSONFilePreset(DB_FILE, defaultData);
    await dbInstance.read();
    // Ensure all default collections exist
    dbInstance.data ||= defaultData;
    dbInstance.data.products ||= [];
    dbInstance.data.categories ||= [];
    dbInstance.data.customers ||= [];
    dbInstance.data.enquiries ||= [];
    await dbInstance.write();
  }
  return dbInstance;
}
