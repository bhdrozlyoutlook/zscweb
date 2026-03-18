/**
 * Firestore Seed Script
 * Mevcut data/*.json dosyalarını Firestore'a aktarır.
 * Tek seferlik çalıştırın: node scripts/seed-firestore.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

const firebaseConfig = {
  apiKey: 'AIzaSyDSIfB3jtIsEF-oSrQnFGLCeOM31obKOWM',
  authDomain: 'zscweb.firebaseapp.com',
  projectId: 'zscweb',
  storageBucket: 'zscweb.firebasestorage.app',
  messagingSenderId: '453353482174',
  appId: '1:453353482174:web:840b7e97db25ca2b9f7bef',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCollection(colName, filename) {
  const filePath = join(dataDir, filename);
  const items = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Koleksiyon boşsa seed et
  const existing = await getDocs(collection(db, colName));
  if (!existing.empty) {
    console.log(`⚠️  '${colName}' zaten ${existing.size} kayıt içeriyor, atlanıyor.`);
    return;
  }

  for (const item of items) {
    const { id, ...data } = item; // Firestore kendi ID'sini oluşturacak
    await addDoc(collection(db, colName), data);
  }
  console.log(`✅ '${colName}' koleksiyonuna ${items.length} kayıt eklendi.`);
}

console.log('🔥 Firestore seed başlatılıyor...\n');

await seedCollection('blog', 'blog.json');
await seedCollection('gallery', 'gallery.json');
await seedCollection('press', 'press.json');

console.log('\n✨ Seed tamamlandı!');
console.log('📌 Firebase Console → Firestore → Kurallar bölümünden güvenlik kurallarını ayarlamayı unutmayın.');
process.exit(0);
