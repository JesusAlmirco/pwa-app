// Install service worker
self.addEventListener("install", async (e) => {
	console.log("ServiceWorker install");
});

// Listen for fetching request
self.addEventListener("fetch", async (e) => {
	console.log(`ServiceWorker fetch: ${e.request.url}`);
});

// Activate the service worker
self.addEventListener("activate", async (e) => {
	console.log("ServiceWorker activate");
});
