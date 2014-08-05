## Generating the documentation

Run this command for generating the documentation

	dox-foundation --template template/template.jade --title "Spotify Web API JS wrapper documentation" < bower_components/spotify-web-api-js/src/spotify-web-api.js | sed 's/<br \/>/ /g' > index.html

Then, commit the resulting `index.html` file.