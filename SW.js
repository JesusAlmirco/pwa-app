// Constants
const CACHE_DATA = "offline-data";
const STATIC_RESOURCES = ["index.html", "app.js", "logo.png"];

// Install service worker
self.addEventListener("install", async (e) => { //e = event
	console.log("ServiceWorker install");

	// Waita data
	e.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_DATA);
			return await cache.addAll(STATIC_RESOURCES);
		})()
	);

	// skip waikinting data
	self.skipWaiting();
});

// Listen for fetching request
self.addEventListener("fetch", async (e) => { //e = event
	console.log(`ServiceWorker fetch: ${e.request.url}`);

	// Manage the offline data on caches
	e.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_DATA);

			try {
				const networkResponse = await fetch(e.request);
				await cache.put(e.request, networkResponse.clone());
				return networkResponse;
			} catch (error) {
				const cachedResponse = await cache.match(e.request);
				return cachedResponse;
			}
		})()
	);

});

// Activate the service worker
self.addEventListener("activate", async (e) => {
	console.log("ServiceWorker activate");
});
