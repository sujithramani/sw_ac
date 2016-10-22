console.log("SW startup");


// importScripts('serviceworker-cache-polyfill.js');


var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [   
   	  './samplefile.html', 
      './images/sample.pdf',
	'./index4.html', 
        './image22/index.png',
       './image22/smile.jpg',      
         './images/ready.png',  
          './js/main.js' 
  ]; 

var CACHE_NAME1 = 'app';
var urlsToCache1 = [

      './image22/img22.png', 
];



/*

//var version = 'v1::';	
self.addEventListener("install", function(event) {
  console.log("WORKER: install event in progress.");
  event.waitUntil(   
    caches    
      .open(CACHE_NAME)   
       .then(function(cache) {
	console.log("allow ?");    
      	 return cache.addAll(urlsToCache);      
      })
      .then(function() {
        console.log("WORKER: install completed");     
      })	
  );
});
*/


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    
    event.waitUntil(
            caches.open(CACHE_NAME1)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache1);
            })
    );
});




 self.addEventListener('activate', function(event) {

console.log("Activating...");
var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;	
    console.log("Activated");    
        })
     
    .map(function(cacheName) {
    console.log('Deleting '+ cacheName);
     return caches(cacheName);
       }) 
      ); 
    })
  );
});
 	
self.addEventListener('fetch', function(event) {	
 event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
         console.log("Fetching...");
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          return response || Response.error();
        });
      }
    )
  );  
}); 


/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

*//*
self.addEventListener('fetch', (event) => {
console.log("fetching started...!");
  event.respondWith(
    caches.open('urlsToCache').then((cache) => {
      return fetch(event.request).then((response) => {
        cache.put(event.request, response.clone());
        return response;
      }).catch(() => {
        return cache.match(event.request).then((response) => {
          return response || Response.error();
        });
      });
    })
  );
});


*/
