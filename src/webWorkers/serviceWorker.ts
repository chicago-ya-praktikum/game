import {URL_USER} from '../contstants/index'

interface RightMap extends ServiceWorkerEventMap {
    'install': ExtendableEvent
    'activate': ExtendableEvent
    'fetch': FetchEvent
}

interface RightServiceWorker extends ServiceWorker {
    addEventListener<K extends keyof RightMap>(type: K,
        listener: (this: ServiceWorker,
            ev: RightMap[K]) => any, options?: boolean | AddEventListenerOptions): void
}

// eslint-disable-next-line no-restricted-globals
const ctx = self as unknown as RightServiceWorker

const CACHE_NAME = 'cache-v1'

const URLS = [
    URL_USER.GET_USER_INFO
]

ctx.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS))
            .catch(err => {
                throw err
            })
    )
})

ctx.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (!response || response.status !== 200 || event.request.method !== 'GET') {
                    return response
                }

                const responseClone = response.clone()

                caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, responseClone))

                return response
            })
            .catch(error => caches.match(event.request)
                .then(cacheResponse => {
                    if (cacheResponse) {
                        return cacheResponse
                    }

                    throw error
                }))
    )
})

ctx.addEventListener('activate', event => {
    // TODO: implement if cache name will be changed
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(() => false)
                    .map(name => caches.delete(name))
            ))
    )
})
