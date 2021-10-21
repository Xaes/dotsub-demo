## DotSub Demo - Fake Service

The purpose of this package is to mock how a backend-service would look like even thought this one runs on client-side (and the API layer is missing). This works as a persistance layer on the overall app using LocalForage and IndexedDB.

I took this weird approach since there is no need to make a backend service (as specified on the brief) and I didn't want to take more time deploying, configuring and developing a real backend service. I also didn't want to use any fake data. I want the demo feeling like a real-app, thus, I wanted to integrate a persistance layer and not being limited to localStorage.

The typings are shared using a mono-repo structure with Yarn Workspaces. This will help us to share our code and avoid repetitions.
