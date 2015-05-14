## Generating the documentation

Run these commands for generating the documentation
```
bower install
npm install
node_modules/dox-foundation/bin/dox-foundation --template template/template.jade < bower_components/spotify-web-api-js/src/spotify-web-api.js | sed 's/<br \/>/ /g' > index.html
```

Then, commit the resulting `index.html` file.
