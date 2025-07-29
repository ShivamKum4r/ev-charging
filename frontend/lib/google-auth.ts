
declare global {
  interface Window {
    google: any;
  }
}

export const initializeGoogleAuth = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: resolve,
        });
      };
      document.head.appendChild(script);
    }
  });
};

export const googleLogin = (callback: (response: any) => void) => {
  if (typeof window !== 'undefined' && window.google) {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: callback,
    });
    window.google.accounts.id.prompt();
  }
};
