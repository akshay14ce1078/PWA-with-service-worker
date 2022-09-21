// make sure service worker are supported

if('serviceWorker' in navigator){
 
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw_cached_site.js')
    .then((result)=>{
      return console.log(`Service Worker: Register`);
    })
    .catch((error)=>{
      return console.log(`Service Worker: Failed registartion ${error}`);
    })
  });


}