/* global describe, it, SpotifyWebApi, expect, beforeEach, afterEach, sinon */
'use strict';
var fixtures = require('./fixtures');
var sinon = require('sinon');
var SpotifyWebApi = require('../src/spotify-web-api');
var Q = require('q');

describe('Basic tests', function() {
  var that = this;
  beforeEach(function() {
    that.requests = [];
    that.xhr = sinon.useFakeXMLHttpRequest();
    that.xhr.onCreate = function(xhr) {
      that.requests.push(xhr);
    };
  });

  afterEach(function() {
    that.xhr.restore();
  });

  it('should return the access token', function() {
    var api = new SpotifyWebApi();
    expect(api.getAccessToken()).toBe(null);
    api.setAccessToken('Some access token');
    expect(api.getAccessToken()).toBe('Some access token');
  });

  describe('Using callbacks', function() {
    it('should get a track', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
      expect(callback.calledWith(null, fixtures.track)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should get multiple tracks', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getTracks(['0eGsygTp906u18L0Oimnem', '1lDWb6b6ieDQ2xT7ewTC3G'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.tracks));
      expect(callback.calledWith(null, fixtures.tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/tracks/?ids=0eGsygTp906u18L0Oimnem%2C1lDWb6b6ieDQ2xT7ewTC3G'
      );
    });

    it('should get an album', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbum('0sNOF9WDwhWunNAHPD3Baj', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.album));
      expect(callback.calledWith(null, fixtures.album)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');
    });

    it("should get an albums's tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.album_tracks));
      expect(callback.calledWith(null, fixtures.album_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks');
    });

    it('should get multiple albums', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.albums));
      expect(callback.calledWith(null, fixtures.albums)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ%2C6JWc4iAiJ9FjyK0B59ABb4'
      );
    });

    it('should get an artist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtist('0LcJLqbBmaGUft1e9Mm8HV', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.artist));
      expect(callback.calledWith(null, fixtures.artist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV');
    });

    it("should get an artist's albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtistAlbums('5YyScSZOuBHpoFhGvHFedc', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.artist_albums));
      expect(callback.calledWith(null, fixtures.artist_albums)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/artists/5YyScSZOuBHpoFhGvHFedc/albums');
    });

    it("should get 2 artist's albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtistAlbums('5YyScSZOuBHpoFhGvHFedc', { limit: 2 }, callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.artist_albums_limit_2)
      );
      expect(callback.calledWith(null, fixtures.artist_albums_limit_2)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/artists/5YyScSZOuBHpoFhGvHFedc/albums?limit=2');
    });

    it("should get an artist's top tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtistTopTracks('5YyScSZOuBHpoFhGvHFedc', 'ES', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.artist_top_tracks));
      expect(callback.calledWith(null, fixtures.artist_top_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/artists/5YyScSZOuBHpoFhGvHFedc/top-tracks?country=ES'
      );
    });

    it("should get an artist's related artists", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtistRelatedArtists('6J6yx1t3nwIDyPXk5xa7O8', callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.artist_related_artists)
      );
      expect(callback.calledWith(null, fixtures.artist_related_artists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/artists/6J6yx1t3nwIDyPXk5xa7O8/related-artists');
    });

    it('should get multiple artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.artists));
      expect(callback.calledWith(null, fixtures.artists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/artists/?ids=0oSGxfWSnnOXhD2fKuz2Gy%2C3dBVyJ7JuOMt4GE9607Qin'
      );
    });

    it('should search for several types', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.search('muse', ['track', 'artist'], { limit: 1 }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.search));
      expect(callback.calledWith(null, fixtures.search)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/search/?q=muse&type=track%2Cartist&limit=1');
    });

    it('should search for albums', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.searchAlbums('The Best Of Keane', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.search_album));
      expect(callback.calledWith(null, fixtures.search_album)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/search/?q=The%20Best%20Of%20Keane&type=album');
    });

    it('should search for artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.searchArtists('David Bowie', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.search_artist));
      expect(callback.calledWith(null, fixtures.search_artist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/search/?q=David%20Bowie&type=artist');
    });

    it('should search for tracks', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.searchTracks('Mr. Brightside', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.search_track));
      expect(callback.calledWith(null, fixtures.search_track)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/search/?q=Mr.%20Brightside&type=track');
    });

    it('should search for playlists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.searchPlaylists('music', { offset: 0, limit: 5 }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.search_playlist));
      expect(callback.calledWith(null, fixtures.search_playlist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/search/?q=music&type=playlist&offset=0&limit=5');
    });

    it('should get a track using a token', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('Some access token');
      api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
      expect(callback.calledWith(null, fixtures.track)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
      expect(that.requests[0].requestHeaders.Authorization).toBe('Bearer Some access token');
    });

    it('should make a request to a generic API url', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getGeneric('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
      expect(callback.calledWith(null, fixtures.track)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should return an error when looking up a wrong id', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbum('asdyi1uy', callback);
      that.requests[0].respond(
        404,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.error_id_not_found)
      );
      expect(callback.calledWith(sinon.match(Error), null)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/albums/asdyi1uy');
    });

    it('should get information about a user', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getUser('jmperezperez', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user));
      expect(callback.calledWith(null, fixtures.user)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/users/jmperezperez');
    });

    it('should get information about a user with a "#" character and encode it properly', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getUser('#matze23', callback);
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/users/%23matze23');
    });

    it('should get information about the current logged in user', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMe(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.me));
      expect(callback.calledWith(null, fixtures.me)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me');
    });

    it("should get user's saved tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMySavedTracks(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_saved_tracks));
      expect(callback.calledWith(null, fixtures.user_saved_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/tracks');
    });

    it("should add tracks to user's saved tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.addToMySavedTracks(['1ryJP6qCpF1mBv0vXS8fyq', '5pRgDDjJcxaYwpsRJBoVXr'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/tracks');
      expect(that.requests[0].method).toBe('PUT');
      expect(that.requests[0].status).toBe(200);
    });

    it("should remove tracks from user's saved tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeFromMySavedTracks(['1ryJP6qCpF1mBv0vXS8fyq', '5pRgDDjJcxaYwpsRJBoVXr'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/tracks');
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
    });

    it("should check if a track is in the user's saved tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.containsMySavedTracks(['1ryJP6qCpF1mBv0vXS8fyq', '5pRgDDjJcxaYwpsRJBoVXr'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([true, true]));
      expect(callback.calledWith(null, [true, true])).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/tracks/contains?ids=1ryJP6qCpF1mBv0vXS8fyq%2C5pRgDDjJcxaYwpsRJBoVXr'
      );
    });

    it("should get user's saved albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMySavedAlbums(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_saved_albums));
      expect(callback.calledWith(null, fixtures.user_saved_albums)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/albums');
    });

    it("should add albums to user's saved albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.addToMySavedAlbums(['1WDA6r4advRJalp0gJCoXv', '088HGHE7BhAMAy9fAApAGP'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/albums');
      expect(that.requests[0].method).toBe('PUT');
      expect(that.requests[0].status).toBe(200);
    });

    it("should remove albums from user's saved albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeFromMySavedAlbums(['1WDA6r4advRJalp0gJCoXv', '088HGHE7BhAMAy9fAApAGP'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/albums');
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
    });

    it("should check if a album is in the user's saved albums", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.containsMySavedAlbums(['1WDA6r4advRJalp0gJCoXv', '088HGHE7BhAMAy9fAApAGP'], callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([true, true]));
      expect(callback.calledWith(null, [true, true])).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/albums/contains?ids=1WDA6r4advRJalp0gJCoXv%2C088HGHE7BhAMAy9fAApAGP'
      );
    });

    it("should get user's top artists", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMyTopArtists({ limit: 5 }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_top_artists));
      expect(callback.calledWith(null, fixtures.user_top_artists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/top/artists?limit=5');
    });

    it("should get user's top tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMyTopTracks({ limit: 5 }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_top_tracks));
      expect(callback.calledWith(null, fixtures.user_top_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/top/tracks?limit=5');
    });

    it("should get user's recently played tracks", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getMyRecentlyPlayedTracks({ limit: 2 }, callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.recently_played_tracks)
      );
      expect(callback.calledWith(null, fixtures.recently_played_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/recently-played?limit=2');
    });

    it("should get user's playlists", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getUserPlaylists('a_user', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_playlists));
      expect(callback.calledWith(null, fixtures.user_playlists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/users/a_user/playlists');
    });

    it("should get current user's playlists", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getUserPlaylists(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_playlists));
      expect(callback.calledWith(null, fixtures.user_playlists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/playlists');
    });

    it("should get current user's playlists with options", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getUserPlaylists({ limit: 10, offset: 50 }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_playlists));
      expect(callback.calledWith(null, fixtures.user_playlists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/playlists?limit=10&offset=50');
    });

    it('should get a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getPlaylist('jmperezperez', '7Kud0O2IdWLbEGgvBkW9di', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.playlist));
      expect(callback.calledWith(null, fixtures.playlist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di'
      );
    });

    it('should get the tracks of a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.getPlaylistTracks('wizzler', '0EIVqzEcrY2a8vO0AUJar2', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.playlist_tracks));
      expect(callback.calledWith(null, fixtures.playlist_tracks)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/wizzler/playlists/0EIVqzEcrY2a8vO0AUJar2/tracks'
      );
    });

    it('should create a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.createPlaylist('jmperezperez', { name: 'A name for the playlist' }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.user_new_playlist));
      expect(callback.calledWith(null, fixtures.user_new_playlist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/users/jmperezperez/playlists');
    });

    it("should update a playlist's details", function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.changePlaylistDetails(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        {
          name: 'A NEW name for the playlist',
          public: false
        },
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di'
      );
    });

    it('should add tracks to a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.addTracksToPlaylist(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e'],
        callback
      );
      that.requests[0].respond(201, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          uris: ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e']
        })
      );
    });

    it('should add tracks to a playlist, specifying position', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.addTracksToPlaylist(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e'],
        { position: 0 },
        callback
      );
      that.requests[0].respond(201, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks?position=0'
      );
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          uris: ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e']
        })
      );
    });

    it('should remove tracks from a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeTracksFromPlaylist(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e'],
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          tracks: [{ uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e' }]
        })
      );
    });

    it('should remove tracks from a playlist specifying a position', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeTracksFromPlaylist(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        [{ uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e', positions: [6] }],
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          tracks: [
            {
              uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e',
              positions: [6]
            }
          ]
        })
      );
    });

    it('should remove tracks from a playlist using a snapshot id', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeTracksFromPlaylistWithSnapshotId(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e'],
        'AsNaPsHoTiD',
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          tracks: [{ uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e' }],
          snapshot_id: 'AsNaPsHoTiD'
        })
      );
    });

    it('should remove tracks from a playlist using a snapshot id specifying a position', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeTracksFromPlaylistWithSnapshotId(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        [{ uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e', positions: [6] }],
        'AsNaPsHoTiD',
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          tracks: [
            {
              uri: 'spotify:track:2Oehrcv4Kov0SuIgWyQY9e',
              positions: [6]
            }
          ],
          snapshot_id: 'AsNaPsHoTiD'
        })
      );
    });

    it('should remove tracks from a playlist specifying just their positions and snapshot id', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.removeTracksFromPlaylistInPositions(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        [0, 1, 3, 9],
        'AsNaPsHoTiD',
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('DELETE');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          positions: [0, 1, 3, 9],
          snapshot_id: 'AsNaPsHoTiD'
        })
      );
    });

    it('should replace the tracks in a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.replaceTracksInPlaylist(
        'jmperezperez',
        '7Kud0O2IdWLbEGgvBkW9di',
        ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e'],
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, '');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('PUT');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          uris: ['spotify:track:2Oehrcv4Kov0SuIgWyQY9e']
        })
      );
    });

    it('should reorder tracks in a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.reorderTracksInPlaylist('jmperezperez', '7Kud0O2IdWLbEGgvBkW9di', 1, 3, callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ snapshot_id: 'AsNaPsHoTiD' })
      );
      expect(callback.calledWith(null, { snapshot_id: 'AsNaPsHoTiD' })).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('PUT');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          range_start: 1,
          insert_before: 3
        })
      );
    });

    it('should reorder tracks in a playlist with optional parameters', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('<example_access_token>');
      api.reorderTracksInPlaylist('jmperezperez', '7Kud0O2IdWLbEGgvBkW9di', 1, 3, { range_length: 2 }, callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ snapshot_id: 'AsNaPsHoTiD' })
      );
      expect(callback.calledWith(null, { snapshot_id: 'AsNaPsHoTiD' })).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/jmperezperez/playlists/7Kud0O2IdWLbEGgvBkW9di/tracks'
      );
      expect(that.requests[0].method).toBe('PUT');
      expect(that.requests[0].status).toBe(200);
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          range_start: 1,
          insert_before: 3,
          range_length: 2
        })
      );
    });

    it('should get featured playlists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getFeaturedPlaylists(
        {
          locale: 'sv_SE',
          country: 'SE',
          timestamp: '2014-10-23T09:00:00'
        },
        callback
      );
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.featured_playlists)
      );
      expect(callback.calledWith(null, fixtures.featured_playlists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/browse/featured-playlists?locale=sv_SE&country=SE&timestamp=2014-10-23T09%3A00%3A00'
      );
    });

    it('should get new releases', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getNewReleases({ country: 'SE' }, callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.new_releases));
      expect(callback.calledWith(null, fixtures.new_releases)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/browse/new-releases?country=SE');
    });

    it('should get list of categories', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getCategories(
        {
          locale: 'sv_SE',
          country: 'SE'
        },
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.browse_categories));
      expect(callback.calledWith(null, fixtures.browse_categories)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/browse/categories?locale=sv_SE&country=SE');
    });

    it('should get the dinner category', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getCategory(
        'dinner',
        {
          locale: 'sv_SE',
          country: 'SE'
        },
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.category));
      expect(callback.calledWith(null, fixtures.category)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/browse/categories/dinner?locale=sv_SE&country=SE');
    });

    it('should get the dinner category playlists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getCategoryPlaylists(
        'dinner',
        {
          country: 'SE'
        },
        callback
      );
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.category_playlists)
      );
      expect(callback.calledWith(null, fixtures.category_playlists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/browse/categories/dinner/playlists?country=SE');
    });

    it('should follow several other users', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.followUsers(['userid01', 'userid02'], callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/following/?ids=userid01%2Cuserid02&type=user');
    });

    it('should check whether a user is following several other users', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.isFollowingUsers(['userid01', 'userid02'], callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.follow_is_following_users)
      );
      expect(callback.calledWith(null, fixtures.follow_is_following_users)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/following/contains?ids=userid01%2Cuserid02&type=user'
      );
    });

    it('should unfollow several other users', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.unfollowUsers(['userid01', 'userid02'], callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('DELETE');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/following/?ids=userid01%2Cuserid02&type=user');
    });

    it('should follow artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.followArtists(['artistid01', 'artistid02'], callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/following/?ids=artistid01%2Cartistid02&type=artist'
      );
    });

    it('should check whether a user is following several other artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.isFollowingArtists(['artistid01'], callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.follow_is_following_artists)
      );
      expect(callback.calledWith(null, fixtures.follow_is_following_artists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/following/contains?ids=artistid01&type=artist');
    });

    it('should unfollow several artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.unfollowArtists(['artistid01', 'artistid02'], callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('DELETE');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/following/?ids=artistid01%2Cartistid02&type=artist'
      );
    });

    it('should follow a playlist publicly', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.followPlaylist('spotify', '2ujjMpFriZ2nayLmrD1Jgl', callback);
      that.requests[0].respond(200);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/spotify/playlists/2ujjMpFriZ2nayLmrD1Jgl/followers'
      );
    });

    it('should follow a playlist privately', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.followPlaylist('spotify', '2ujjMpFriZ2nayLmrD1Jgl', { public: false }, callback);
      that.requests[0].respond(200);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/spotify/playlists/2ujjMpFriZ2nayLmrD1Jgl/followers'
      );
    });

    it('should check whether users are following a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.areFollowingPlaylist('spotify', '2ujjMpFriZ2nayLmrD1Jgl', ['userid01', 'userid02'], callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.follow_are_following_playlist)
      );
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.follow_are_following_playlist)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/spotify/playlists/2ujjMpFriZ2nayLmrD1Jgl/followers/contains?ids=userid01%2Cuserid02'
      );
    });

    it('should unfollow a playlist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.unfollowPlaylist('spotify', '2ujjMpFriZ2nayLmrD1Jgl', callback);
      that.requests[0].respond(200);
      expect(that.requests[0].method).toBe('DELETE');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/users/spotify/playlists/2ujjMpFriZ2nayLmrD1Jgl/followers'
      );
    });

    it('should get followed artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getFollowedArtists(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.followed_artists));
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.followed_artists)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/following?type=artist');
    });

    it('should get the audio features for a track', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      var result = api.getAudioFeaturesForTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.track_audio_features)
      );
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.track_audio_features)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/audio-features/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should get the audio features for several tracks', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      var result = api.getAudioFeaturesForTracks(['3Qm86XLflmIXVm1wcwkgDK'], callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.tracks_audio_features)
      );
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.tracks_audio_features)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/audio-features?ids=3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should get the audio analysis for a track', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      var result = api.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.track_audio_analysis)
      );
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.track_audio_analysis)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/audio-analysis/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should get recommendations', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getRecommendations(
        {
          min_energy: 0.4,
          market: 'ES',
          seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
          limit: 5,
          min_popularity: 50
        },
        callback
      );
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.recommendations));
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.recommendations)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/recommendations?min_energy=0.4&market=ES&seed_artists=6mfK6Q2tzLMEchAr0e9Uzu%2C4DYFVNKZ1uixa6SQTvzQwJ&limit=5&min_popularity=50'
      );
    });

    it('should get available genre seeds', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAvailableGenreSeeds(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.genre_seeds));
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.genre_seeds)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/recommendations/available-genre-seeds');
    });

    it('should get available devices', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getMyDevices(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.available_devices));
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.available_devices)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/devices');
    });

    it('should get current playback', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getMyCurrentPlaybackState(callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.current_playback));
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.current_playback)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player');
    });

    it('should get current playing track', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getMyCurrentPlayingTrack(callback);
      that.requests[0].respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.current_playing_track)
      );
      expect(that.requests[0].method).toBe('GET');
      expect(callback.calledWith(null, fixtures.current_playing_track)).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/currently-playing');
    });

    it('should transfer playback', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.transferMyPlayback(['my_device_id'], callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player');
    });

    it('should play', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.play(callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/play');
    });

    it('should play on a certain device', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.play({ device_id: 'my_device_id', context_uri: 'spotify:album:xxx' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/play?device_id=my_device_id');
      expect(that.requests[0].requestBody).toBe(
        JSON.stringify({
          context_uri: 'spotify:album:xxx'
        })
      );
    });

    it('should pause', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.pause({ device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/pause?device_id=my_device_id');
    });

    it('should skip to next', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.skipToNext({ device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('POST');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/next?device_id=my_device_id');
    });

    it('should skip to previous', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.skipToPrevious({ device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('POST');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/previous?device_id=my_device_id');
    });

    it('should seek', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.seek(2000, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/seek?position_ms=2000');
    });

    it('should seek on a certain device', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.seek(2000, { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/seek?position_ms=2000&device_id=my_device_id');
    });

    it('should set repeat', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setRepeat('track', { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/player/repeat?state=track&device_id=my_device_id'
      );
    });

    it('should unset repeat', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setRepeat('off', { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/me/player/repeat?state=off&device_id=my_device_id');
    });

    it('should set volume', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setVolume(80, { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/player/volume?volume_percent=80&device_id=my_device_id'
      );
    });

    it('should set shuffle', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setShuffle(true, { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=my_device_id'
      );
    });

    it('should unset shuffle', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setShuffle(false, { device_id: 'my_device_id' }, callback);
      that.requests[0].respond(204);
      expect(that.requests[0].method).toBe('PUT');
      expect(callback.calledWith(null, '')).toBeTruthy();
      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe(
        'https://api.spotify.com/v1/me/player/shuffle?state=false&device_id=my_device_id'
      );
    });
  });

  describe('Using Promises/A+ through Q.js', function() {
    it('should get a track and use the provided promise implementation', function() {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(Q);
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK');
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
      return result.then(function(data) {
        expect(data).toEqual(fixtures.track);
      });
    });

    it('should get a track and use only the callback function if it is provided', function() {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(Q);
      var callback = sinon.spy();
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
      expect(callback.calledWith(null, fixtures.track)).toBeTruthy();
      expect(result).toBeNull();
    });

    it('should return an error when looking up a wrong id and use the provided promise implementation', function(done) {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(Q);
      var result = api.getAlbum('asdyi1uy');
      that.requests[0].respond(
        404,
        { 'Content-Type': 'application/json' },
        JSON.stringify(fixtures.error_id_not_found)
      );
      result.fail(function(error) {
        expect(error.status).toBe(404);
        done();
      });

      expect(that.requests.length).toBe(1);
      expect(that.requests[0].url).toBe('https://api.spotify.com/v1/albums/asdyi1uy');
    });

    it('should be able to abort a request', function(done) {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(Q);
      var result = api.getAlbum('asdyi1uy');

      setTimeout(
        function() {
          expect(that.requests[0].aborted).toBeTruthy();
          done();
        },
        20
      );

      result.abort();
    });
  });

  describe('Using Promises/A+ through Promise', function() {
    var api = new SpotifyWebApi();
    it('should get a track and use the provided promise implementation', function(done) {
      if (window.Promise) {
        var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK');
        result.then(function(data) {
          expect(data).toEqual(fixtures.track);
          done();
        });
        setTimeout(
          function() {
            that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
          },
          100
        );
      } else {
        done();
      }
    });

    it('should get a track and use only the callback function if it is provided', function() {
      if (window.Promise) {
        var api = new SpotifyWebApi();
        var callback = sinon.spy();
        var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
        that.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(fixtures.track));
        expect(callback.calledWith(null, fixtures.track)).toBeTruthy();
        expect(result).toBeNull();
      }
    });

    it('should return an error when looking up a wrong id and use the provided promise implementation', function(done) {
      if (window.Promise) {
        var api = new SpotifyWebApi();
        var result = api.getAlbum('asdyi1uy');
        that.requests[0].respond(
          404,
          { 'Content-Type': 'application/json' },
          JSON.stringify(fixtures.error_id_not_found)
        );
        result.fail(function(error) {
          expect(error.status).toBe(404);
          done();
        });
        expect(that.requests.length).toBe(1);
        expect(that.requests[0].url).toBe('https://api.spotify.com/v1/albums/asdyi1uy');
      } else {
        done();
      }
    });

    it('should be able to abort a request', function(done) {
      if (window.Promise) {
        var api = new SpotifyWebApi();
        var result = api.getAlbum('asdyi1uy');

        setTimeout(
          function() {
            expect(that.requests[0].aborted).toBeTruthy();
            done();
          },
          20
        );

        result.abort();
      } else {
        done();
      }
    });
  });

  describe('Using Promises/A+ through a not supported promise implementation', function() {
    it('should throw an error when setting a not supported promise implementation', function() {
      var api = new SpotifyWebApi();
      var setPromise = function() {
        var wrongImplementation = function() {};
        api.setPromiseImplementation(wrongImplementation);
      };
      expect(setPromise).toThrow();
    });
  });
});
