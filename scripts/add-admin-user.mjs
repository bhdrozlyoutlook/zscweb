/**
 * Admin kullanıcısını Firestore users koleksiyonuna ekler.
 * Tek seferlik çalıştırın: node scripts/add-admin-user.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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

const ADMIN_UID   = '4loMq8GcK6c3wzxSNsRsti02j9I2';
const ADMIN_EMAIL = 'admin@admin.com';

const userRef = doc(db, 'users', ADMIN_UID);
const existing = await getDoc(userRef);

if (existing.exists()) {
  console.log('⚠️  Kullanıcı zaten mevcut:', existing.data());
} else {
  await setDoc(userRef, {
    uid:       ADMIN_UID,
    email:     ADMIN_EMAIL,
    role:      'admin',
    createdAt: new Date().toISOString(),
  });
  console.log('✅ Admin kullanıcısı oluşturuldu:');
  console.log(`   UID  : ${ADMIN_UID}`);
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Role : admin`);
}

process.exit(0);
