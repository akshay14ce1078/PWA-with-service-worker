const cacheName = 'v1';

const cachedAssets = [
  'index.html',
  'about.html',
  '/css/styles.css',
  '/js/main.js'
]

// call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files')
        cache.addAll(cachedAssets)
      })
      .catch(()=> self.skipWaiting())
  );
});

// call activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');

  e.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheName) {
              console.log('Service worker: Clearing old cache');
              return caches.delete(cache);
            }
          })
        )
      })
  );
});

// call fetch event
self.addEventListener('fetch',(e)=>{
  console.log('Service Worker: Fetching');

  e.respondWith(
    fetch(e.request).catch(()=> caches.match(e.request))
  )
})