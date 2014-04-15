Spotify Web API JS
==================

This is a wrapper for the Spotify Web API. It includes helper functions to make requests for getting albums, artists, tracks, playlists and users information.

The wrapper supports callback functions, as well as Promise (you can also use [a polyfill](https://github.com/jakearchibald/es6-promise), [Q](https://github.com/kriskowal/q) and [when](https://github.com/cujojs/when) if they are available.

## Usage

_Note: The following examples use Promises as the return object._

First, instantiate the wrapper.

```javascript
var spotifyApi = new SpotifyAPIWrapper();
```

If you have an access token, you can set it doing:

```javascript
spotifyApi.setAccessToken('<here_your_access_token');
```

When you set an access token, it will be used for signing your requests. Note that an access token is not always necessary, unless you want to sign your requests or have access to data that a user has granted access to your app.

Here you see how we can get basic information:


The wrapper relies on [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/). If the browser doesn't support them, you need to include a [polyfill](https://github.com/jakearchibald/es6-promise).



```javascript
spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function(result) {
    console.log('Album information', result);
  }, function(err) {
    console.log(err);
  });

spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
  .then(function(result) {
    console.log('Albums information', result);
  }, function(err) {
    console.log(err);
  });

spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function(result) {
    console.log('Artist information', result);
  }, function(err) {
    console.log(err);
  });

spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  .then(function(result) {
    console.log('Artists information', result);
  }, function(err) {
    console.log(err);
  });

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(result) {
    console.log('Artist albums', result);
  }, function(err) {
    console.log(err);
  });

spotifyApi.search('Love')
  .then(function(result) {
    console.log('Search by "Love" (defaults to track results)', result);
  }, function(err) {
    console.log(err);
  });
```

### Extra options
You can pass extra options to some functions, such as the ones supporting pagination. These options will be sent as query parameters:

```javascript
// get Elvis' albums in range [20...29]
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20})
  .then(function(result) {
    console.log('Artist albums', result);
  }, function(err) {
    console.log(err);
  });

// search artists whose name contains 'Love'
spotifyApi.search('Love', {type: 'artist'})
  .then(function(result) {
    console.log('Search artists by "Love"', result);
  }, function(err) {
    console.log(err);
  });

// search tracks whose artist's name contains 'Love'
spotifyApi.search('artist:Love', {type: 'track'})
  .then(function(result) {
    console.log('Search tracks by "Love" in the artist name', result);
  }, function(err) {
    console.log(err);
  });
```

### Nesting calls
When you need to make multiple calls to get some dataset, you can take advantage of the Promises to get 

```javascript
// track detail information for album tracks
spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function(result) {
    return result.tracks.map(function(t) { return t.id; });
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
  .then(function(result) {
    return result.albums.map(function(a) { return a.id; });
  })
  .then(function(albums) {
    return spotifyApi.getAlbums(albums);
  }).then(function(result) {
    console.log(result);
  });
```

### Getting user's information
In order to get user's information you will probably need to request an access token. Say for instance you want to get user's playlists. Once you get an access token, set it

```javascript
// get an access token
...

// set it in the wrapper
var spotifyApi = new SpotifyAPIWrapper();
spotifyApi.setAccessToken('<here_your_access_token');
spotifyApiWithToken.getUserPlaylists('jmperezperez')
  .then(function(result) {
    console.log('User playlists', result);
  }, function(err) {
    console.log(err);
  });

spotifyApiWithToken.getUserPlaylist('jmperezperez', '4vHIKV7j4QcZwgzGQcZg1x')
  .then(function(result) {
    console.log('User playlist', result);
  }, function(err) {
    console.log(err);
  });
```