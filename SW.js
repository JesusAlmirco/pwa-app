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
self.addEventListener("fetch", async (e) => {
	console.log(`ServiceWorker fetch: ${e.request.url}`);
});

// Activate the service worker
self.addEventListener("activate", async (e) => {
	console.log("ServiceWorker activate");
});
