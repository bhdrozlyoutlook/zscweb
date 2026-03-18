'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Analytics only works in the browser
    import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
      isSupported().then((supported) => {
        if (supported) getAnalytics(app);
      });
    });
  }, []);

  return null;
}
