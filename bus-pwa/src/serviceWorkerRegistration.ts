// src/serviceWorkerRegistration.ts
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('ServiceWorker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Error registering service worker:', error);
                });
        });
    }
}
