const cacheName = 'v2';

// call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
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

  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(e.request.url.indexOf('http') === 0)){
    return; // skip the request. if request is not made with http protocol
  } 

  e.respondWith(
    fetch(e.request)
      .then(response =>{
        // make a clone of response
        const cloneRes = response.clone();
        
        // cache response
        caches
          .open(cacheName)
          .then((cacheIns)=>{
            // put clone response
            cacheIns.put(e.request,cloneRes)
          })

          return response;
      })
      .catch(error => {
        return caches.match(e.request).then(response => response)
      })
  )
})