<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Fork Orphic react boilerplate 
2. (Optional) Register a domain or subdomain fo each env (199.36.158.100)
3. (Optional) Create a sentry project and save the dns url for later
4. For each environment, create a firebase project (new-project-env) and setup required firebase services
    #### Auth service
        - Add the domain created earlier to the autorised domain in the authentification settings page.
        - We only support email/password auth provider at the moment
        - Ajust email template (if not done, emails will go to spam)
       
    #### Firestore service
        - Create firestore relationnal database with the good location, usely nam5 (us-central)
        - Edit rules with this template :
        
            rules_version = '2';
            service cloud.firestore {
              match /databases/{database}/documents {
                match /Users/{uid} {
                  allow create: if request.auth != null;
                  allow update: if request.auth != null &&
                  request.auth.uid == uid &&
                  request.resource.data.permission == 'user';
                  allow read, delete: if request.auth != null &&
                  request.auth.uid == uid;
                }
              }
            }
    
    #### Hosting service
        - Add domain or subdomain create earlier
        - Create a firebase web app
        
    #### Cloud function service
        - TO DO
    
    #### Firebase settings
        - (Optional) if a production environment, set environment type in firebase project settings
    
5. For each environment, create github secrets (replace ENV with envirvonment name)
```
{
  REACT_APP_API_KEY_ENV
  REACT_APP_APP_ID_ENV
  REACT_APP_AUTH_DOMAIN_ENV
  REACT_APP_MESSAGING_SENDER_ID_ENV
  REACT_APP_PROJECT_ID_ENV
  REACT_APP_STORAGE_BUCKET_ENV
  REACT_APP_PUBLIC_URL_ENV (url firebase hosting should deploy web app)
  REACT_APP_SENTRY_DNS (optional)
}
```

6. For each environment, initiate automatic deployment by doing so : 
```
firebase use {{ENV}}
firebase init hosting (do not overwrite files)
```
7. In .github folder, there should be 2 files per env.
- prod-firebase-hosting-merge
- dev-firebase-hosting-merge 
- prod-firebase-hosting-pull-request (Optional)
- dev-firebase-hosting-pull-request (Optional)

8. In each .github files, ajust the firebaseServiceAccount variable for the github secret created by firebase

9. Create a .env file with these variable : 
```
{
  REACT_APP_LOCALHOST_STATE = true
  REACT_APP_API_KEY = XXXX
  REACT_APP_AUTH_DOMAIN = XXXX
  REACT_APP_PROJECT_ID = XXXX
  REACT_APP_STORAGE_BUCKET = XXXX
  REACT_APP_MESSAGING_SENDER_ID = XXXX
  REACT_APP_APP_ID = XXXX
  REACT_APP_PUBLIC_URL = 'http://localhost:3000/'
  REACT_APP_SENTRY_DNS = XXXX
  REACT_APP_REQUIRE_SUPERADMIN = 
}
```

10. Edit the .firebaserc file to support each env project id :
```
{
  "projects": {
    "default": "new-project-dev-id",
    "dev": "new-project-dev-id",
    "prod": "new-project-prod-id"
  }
}
```

11. Login into firebase throught your console
```
firebase login
```

12. By default, user language is set with french. In order to change that behavior, go in the models/enums/SupportedLanguages.ts file and change default for ‘en’.
13. In the themes/assets folder change logo icon
14. In public folder change favicon.png
15. In public/index.html, change title
16. Add fonts to project
    - Download necessary fonts and add their ttf files to theme/fonts folder
    - Add @font-face for each fonts in the theme/css/normalize.css folder
17. Go to MUI theme Creator tool, create your theme with your colors and paste it in the /theme/ThemeConfig.ts file.
18. If you want to be light mode by default, make sure to change the mode to light in the /theme/ThemeConfig.ts file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### How to start coding

1. Open terminal at root
```
firebase use {{env}}
npm install
npm run start
```

2. Open terminal at root/functions
```
cd functions
npm install
npm run build:watch
```

3. Open terminal at root/functions
```
cd functions
npm run serve:watch
```


