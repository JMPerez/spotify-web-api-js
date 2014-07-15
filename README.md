Spotify Web API JS [![Build Status](https://travis-ci.org/JMPerez/spotify-web-api-js.svg?branch=master)](https://travis-ci.org/JMPerez/spotify-web-api-js)
==================

This is a wrapper for the [Spotify Web API](https://developer.spotify.com/web-api/). It includes helper functions to make requests for getting albums, artists, tracks, playlists and user's information.

## Installation
Install via bower (browser):

    $ bower install spotify-web-api-js

or by making a copy of the `src/spotify-web-api.js` file

## Usage

We recommend you have a look at the [documentation](http://jmperezperez.com/spotify-web-api-js/) to get an overview of the supported features.

The wrapper supports callback functions, as well as [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) (you can also use [a polyfill](https://github.com/jakearchibald/es6-promise)), and Promises/A+ libraries such as [Q](https://github.com/kriskowal/q) and [when](https://github.com/cujojs/when).

First, instantiate the wrapper.
```javascript
var spotifyApi = new SpotifyWebApi();
```

If you have an access token, you can set it doing:
```javascript
spotifyApi.setAccessToken('<here_your_access_token>');
```

When you set an access token, it will be used for signing your requests. Note that an access token is not always necessary, unless you want to sign your requests or have access to data that a user has granted access to your app.

If you want to use a Promises/A+ library, you can set it:
```javascript
spotifyApi.setPromiseImplementation(Q);
```

Here you see how to get basic information using a function like `getArtistAlbums`:

```javascript
// get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
});

// get Elvis' albums, using Promises through Promise, Q or when
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist albums', data);
  }, function(err) {
    console.error(err);
  });
```

The functions that fetch data from the API support also an optional JSON object with a set of options, such as the ones regarding pagination. These options will be sent as query parameters:

```javascript
// passing a callback - get Elvis' albums in range [20...29]
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20}, function(err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
});

// using Promises through Promise, Q or when - get Elvis' albums in range [20...29]
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20})
  .then(function(data) {
    console.log('Album information', data);
  }, function(err) {
    console.error(err);
  });
```

### More examples
_Note: The following examples use Promises/Q/when as the return object._

Here you can see more examples of the usage of this wrapper:

```javascript
// get multiple albums
spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
  .then(function(data) {
    console.log('Albums information', data);
  }, function(err) {
    console.error(err);
  });

// get an artists
spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function(data) {
    console.log('Artist information', data);
  }, function(err) {
    console.error(err);
  });

// get multiple artists
spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  .then(function(data) {
    console.log('Artists information', data);
  }, function(err) {
    console.error(err);
  });

// get albums by a certain artist
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist albums', data);
  }, function(err) {
    console.error(err);
  });

// search tracks whose name, album or artist contains 'Love'
spotifyApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data);
  }, function(err) {
    console.error(err);
  });

// search artists whose name contains 'Love'
spotifyApi.searchArtists('Love')
  .then(function(data) {
    console.log('Search artists by "Love"', data);
  }, function(err) {
    console.error(err);
  });

// search tracks whose artist's name contains 'Love'
spotifyApi.searchTracks('artist:Love')
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data);
  }, function(err) {
    console.error(err);
  });
```

### Nesting calls
When you need to make multiple calls to get some dataset, you can take advantage of the Promises to get a cleaner code:

```javascript
// track detail information for album tracks
spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function(data) {
    return data.tracks.map(function(t) { return t.id; });
  })
  .then(function(trackIds) {
    return spotifyApi.getTracks(trackIds);
  })
  .then(function(tracksInfo) {
    console.log(tracksInfo);
  })
  .catch(function(error) {
    console.error(error);
  });

// album detail for the first 10 Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10})
  .then(function(data) {
    return data.albums.map(function(a) { return a.id; });
  })
  .then(function(albums) {
    return spotifyApi.getAlbums(albums);
  }).then(function(data) {
    console.log(data);
  });
```

### Getting user's information
In order to get user's information you will probably need to request an access token. Say for instance you want to get user's playlists. Once you get an access token, set it and fetch the data:

```javascript
// get an access token
...

// set it in the wrapper
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('<here_your_access_token>');
spotifyApiWithToken.getUserPlaylists('jmperezperez')
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });

spotifyApiWithToken.getUserPlaylist('jmperezperez', '4vHIKV7j4QcZwgzGQcZg1x')
  .then(function(data) {
    console.log('User playlist', data);
  }, function(err) {
    console.error(err);
  });
```

## Running tests

In order to run the tests, run:

    npm test

If you want to check out the coverage, run:

    grunt coverage
