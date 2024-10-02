self.addEventListener('install', event => {
    console.log('Service worker installed.');
});

self.addEventListener('fetch', event => {
    let request = event.request;

    // Check if the file is a Brotli compressed file
    if (request.url.endsWith('.br')) {
        event.respondWith(
            fetch(request).then(response => {
                if (response.ok) {
                    return response;
                } else {
                    // Fallback if the Brotli file is not found
                    return fetch(request.url.replace('.br', ''));
                }
            })
        );
    }
});
