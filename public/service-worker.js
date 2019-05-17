function onInstall(event) {
    console.log('[ServiceWorker] onInstall');
  //   event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
  //       console.log('Opened cache');
  //       return cache.addAll(URL_TO_CACHE);
  //     }).then(function() {
  //       return self.skipWaiting();
  //     })
  // );
}

function onActivate(e) {
    console.log("[Serviceworker]", "Activating!", e);

    e.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (key != CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    }));
}

function onFetch(e) {
    e.respondWith(
        caches.match(e.request).then(resp => {
            // 缓存命中直接返回
            if (resp) {
                return resp;
            }

            var fetchRequest = e.request.clone();
            return fetch(fetchRequest).then(response => {
                // 检查是否收到无效的响应
                if (!response || response.status != 200) {
                    return response || caches.match("/offline");
                }

                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, responseToCache);
                });

                return response;
            })
            .catch (err => {
                return caches.match('/offline.html');
            });
        })
    )
}

var CACHE_VERSION = "V1.1.2";
var CACHE_NAME = CACHE_VERSION + ":sw-cache::";

// Service Worker 事件注册
self.addEventListener("install", onInstall),
self.addEventListener("activate", onActivate),
self.addEventListener("fetch", onFetch);
// self.addEventListener('push', onPush),
// self.addEventListener('message', onMessage),
// self.addEventListener('notificationclick', onNotificationClick);
