## DotSub Demo

Manage your albums and photos with ease.

#### Requirements:

-   A user can organize their pictures in multiple albums. Albums are named.

-   Each picture has a creation date, and an optional, editable, custom tag.

-   A single picture or a whole album can be shared with an email address recipient.

-   Users can search pictures by album name, by creation date range, by tag, by the email of the user they've been shared with, or a combination of these filters.

#### Considerations:

-   You can use react-create-app (or Angular CLI) to create the app, along with any quality assurance mechanisms or build tool of choice.

-   There's no need for a back-end, and you can use any sample data as filler. The search/edit/sharing actions don't need to be functioning.

-   The PoC does not need to send out any emails, just allow users to input an email address on pictures/albums they want to share.

#### "Backend" Service

I tried to mimic how backend-service would look like even thought this one runs on client-side (and the API layer is missing). This works as a persistance layer on the overall app using LocalForage and IndexedDB.

I took this weird approach since there is no need to make a backend service (as specified on the brief) and I didn't want to take more time deploying, configuring and developing a real backend service. I also didn't want to use any fake data. I want the demo feeling like a real-app, thus, I wanted to integrate a persistance layer and not being limited to localStorage.

The typings are shared using a mono-repo structure with Yarn Workspaces. This will help us to share our code and avoid repetitions.
