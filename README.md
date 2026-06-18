# React Quiz

build upon https://github.com/mitchgavan/react-multi-choice-quiz;

an enhancement is located on https://github.com/E7-87-83/basic-law-and-national-security-law-test

## To run and test the app
```bash
npm start
```

## To modify the parameters of the app
+ `src/basicDetail.json`
+ `src/api/quizInfo.json` (The `"correct"` is zero-based indexed.)

## To build the app as standalone application (i.e. no NodeJS environment required)

1. 
```bash
npm install parcel @babel/core@7.13.0 @babel/preset-react @parcel/package-manager --save-dev --legacy-peer-deps
```

2. 
```bash
cp -i public/index.html index.html
```

3. Edit `index.html`

+ change all `%PUBLIC_URL%` to `./public`
+ change the `<title>` to what you want
+ after `<div id="root"></div>`, add a line `<script type="module">import "./src/index.js";</script>`

4. 
```bash
npx parcel build index.html --no-content-hash
```

5. Edit `./dist/index.html`
+ change the `.css`, `.ico`, etc. to a relative path

6. Put the `./dist` folder to a static HTML hosting
