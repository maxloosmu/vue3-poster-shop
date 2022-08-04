# Vue.js Poster Shop

Source code for the case-study project from the course [Build Your First Vue.js App](https://vuejsdevelopers.com/courses/first-vue-app?utm_source=gitlab-vjd
)

### Live Webpages at Heroku and CCLAW

- https://max-vue3-poster-shop.herokuapp.com/
- http://cclaw.legalese.com:8050/
- https://cclaw.legalese.com:8060/

#### Demo

See the completed project here: [http://poster-shop.vuejsdevelopers.com/](http://poster-shop.vuejsdevelopers.com/)

#### Pre-installation

Ensure [Node.js  >=4](https://nodejs.org/en/download/), [NPM](https://docs.npmjs.com) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) are installed on your system

#### Installation

1. Install this code on your local system

    1. Fork this repository (click 'Fork' button in top right corner)
    2. Clone the forked repository on your local file system

        ```
        cd /path/to/install/location

        git clone https://git.vuejsdevelopers.com/{your-namespace}/poster-shop/
        ```

2. Change directory into the local clone of the repository

    ```
    cd poster-shop
    ```

3. Install dependencies

    ```
    npm install
    ```

4. Start project

    ```
    npm run serve
    ```

5. Your site will be available at *localhost:3000*.

## Troubleshooting

Here are some common mistakes people make, check these before filing an issue:

- `EADDRINUSE :::3000`. You already have another application using port 3000. Either end it, or change manually set the `PORT` environment variable to resolve the conflict e.g. `3001`
- Ensure you have a version of Node >= 4

```
node -v
```

## Updating for Heroku

### In package.json

```
  "scripts": {
    "serve": "nodemon ./server.js --ignore node_modules/ -e js,html,css",
    "lint": "eslint server.js public/script.js"
  },
```

Do not require these:

```
    "start": "node server.js",
    "postinstall": "npm run serve"
```

### In config.yml

```
workflows:
  heroku_deploy:
    jobs:
      - node/test
      - heroku/deploy-via-git:
          requires:
            - node/test
          filters:
            branches:
              only: main
```

### Setting up for Heroku website

- Requirement to setup proper login at Heroku
- Requirement to login from CLI
- Requirement to setup git remote pointing to Heroku
- Requirement for git branch to be main or master
- Requirement to setup heroku auth:token
- Requirement to [update Environment Variables](https://app.circleci.com/settings/project/github/maxloosmu/vue3-poster-shop/environment-variables?return-to=https%3A%2F%2Fapp.circleci.com%2Fprojects%2Fproject-dashboard%2Fgithub%2Fmaxloosmu%2F)
- Requirement for package-lock.json file to be present in github repo


