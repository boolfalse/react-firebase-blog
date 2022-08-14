
## React.js + Firebase blog



#### About:

> **React.js + Firebase blog** is a simple blog application built with React.js and Firebase.


#### Installation:

- Clone the repository and install dependencies:
```bash
git clone git@github.com:boolfalse/react-firebase-blog.git
cd react-firebase-blog
npm install
```

- Login to [Firebase](https://console.firebase.google.com/).
- Create a new Firebase project and get credentials.
- Add Sign-In with Google as a provider.
- Add a Web App to your Firebase project and get credentials.
- In Firestore Data add a collection named `posts`.
- Change Firestore Rules to allow read and write access to the `posts` collection:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- Set up the Firebase credentials in the `.env` file as described in the `.env.example` file.

- Run the application:
```bash
# for development
npm run start
# for production
npm run build
```

#### TODOs:

- Watch the exact video for [50:44](https://youtu.be/zL0dKETbCNE?t=3044) more secure way and change.  
- Edit post functionality.
- Add date to each post and order posts by date.
- Add a search functionality.
- Add a pagination.
- Add a sorting functionality.
- Add a filter functionality.


#### Resources:

- [PedroTech - Build a Blog Website - React and Firebase Tutorial](https://www.youtube.com/watch?v=zL0dKETbCNE)
- [machadop1407/react-firebase-blog-website @ GitHub](https://github.com/machadop1407/react-firebase-blog-website)
