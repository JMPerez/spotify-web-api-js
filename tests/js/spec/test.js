/* global describe, it, SpotifyWebApi, expect, beforeEach, afterEach, sinon */

'use strict';

function loadFixture(fixtureName) {
  var req = new XMLHttpRequest();
  req.open('GET', 'fixtures/' + fixtureName + '.json', false);
  req.send(null);
  if (req.status === 200) {
    return JSON.parse(req.responseText);
  } else {
    return null;
  }
}

describe('Basic tests', function() {

  this.fixtures = {
    track: loadFixture('track'),
    tracks: loadFixture('tracks'),
    album: loadFixture('album'),
    albums: loadFixture('albums'),
    artist: loadFixture('artist'),
    artists: loadFixture('artists'),
    'search-album': loadFixture('search-album'),
    'search-artist': loadFixture('search-artist'),
    'search-track-page1': loadFixture('search-track-page1')
  };

  var that = this;
  beforeEach(function () {
    that.requests = [];
    that.xhr = sinon.useFakeXMLHttpRequest();
    that.xhr.onCreate = function (xhr) {
      that.requests.push(xhr);
    };
  });

  afterEach(function () {
    that.xhr.restore();
  });

  describe('Using callbacks', function() {

    it('should get a track', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
      expect(callback.calledWith(null, that.fixtures.track)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should get multiple tracks', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getTracks(['0eGsygTp906u18L0Oimnem', '1lDWb6b6ieDQ2xT7ewTC3G'], callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.tracks)
      );
      expect(callback.calledWith(null, that.fixtures.tracks)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/tracks/?ids=0eGsygTp906u18L0Oimnem%2C1lDWb6b6ieDQ2xT7ewTC3G');
    });

    it('should get an album', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbum('0sNOF9WDwhWunNAHPD3Baj', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.album)
      );
      expect(callback.calledWith(null, that.fixtures.album)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');
    });

    it('should get multiple albums', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4'], callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.albums)
      );
      expect(callback.calledWith(null, that.fixtures.albums)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ%2C6JWc4iAiJ9FjyK0B59ABb4');
    });

    it('should get an artist', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtist('0LcJLqbBmaGUft1e9Mm8HV', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.artist)
      );
      expect(callback.calledWith(null, that.fixtures.artist)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV');
    });

    it('should get multiple artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin'], callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.artists)
      );
      expect(callback.calledWith(null, that.fixtures.artists)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/artists/?ids=0oSGxfWSnnOXhD2fKuz2Gy%2C3dBVyJ7JuOMt4GE9607Qin');
    });

    it('should search for albums', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.search('The Best Of Keane', {type: 'album'}, callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['search-album'])
      );
      expect(callback.calledWith(null, that.fixtures['search-album'])).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/search/?q=The%20Best%20Of%20Keane&type=album');
    });

    it('should search for artists', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.search('David Bowie', {type: 'artist'}, callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['search-artist'])
      );
      expect(callback.calledWith(null, that.fixtures['search-artist'])).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/search/?q=David%20Bowie&type=artist');
    });

    it('should search for tracks', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.search('Mr. Brightside', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['search-track-page1'])
      );
      expect(callback.calledWith(null, that.fixtures['search-track-page1'])).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/search/?q=Mr.%20Brightside');
    });

    it('should get a track using a token', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.setAccessToken('Some access token');
      api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
      expect(callback.calledWith(null, that.fixtures.track)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
      expect(that.requests[0].requestHeaders.Authorization).to.equal('Bearer Some access token');
    });

    it('should make a request to a generic API url', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getGeneric('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
      expect(callback.calledWith(null, that.fixtures.track)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK');
    });

    it('should return an error when looking up a wrong id', function() {
      var callback = sinon.spy();
      var api = new SpotifyWebApi();
      api.getAlbum('asdyi1uy', callback);
      that.requests[0].respond(404,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['error_id-not-found'])
      );
      expect(callback.calledWith(sinon.match(Error), null)).to.be.ok;
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/albums/asdyi1uy');
    });
  });

  describe('Using Promises/A+ through Q.js', function() {


    it('should get a track and use the provided promise implementation', function(done) {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(window.Q);
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK');
      result.then(function(data) {
        expect(data).to.deep.equal(that.fixtures.track);
        done();
      });
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
    });

    it('should get a track and use only the callback function if it is provided', function() {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(window.Q);
      var callback = sinon.spy();
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
      expect(callback.calledWith(null, that.fixtures.track)).to.be.ok;
      expect(result).to.be.null;
    });

    it('should return an error when looking up a wrong id and use the provided promise implementation', function(done) {
      var api = new SpotifyWebApi();
      api.setPromiseImplementation(window.Q);
      var result = api.getAlbum('asdyi1uy');
      that.requests[0].respond(404,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['error_id-not-found'])
      );
      result.fail(function(error) {
        expect(error.status).to.equal(404);
        done();
      });

      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/albums/asdyi1uy');
    });
  });

  describe('Using Promises/A+ through Promise', function() {
    var api = new SpotifyWebApi();
    it('should get a track and use the provided promise implementation', function(done) {
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK');
      if (window.Promise) {
        result.then(function(data) {
          expect(data).to.deep.equal(that.fixtures.track);
          done();
        });
      } else {
        done();
      }
      setTimeout(function() {
        that.requests[0].respond(200,
          {'Content-Type':'application/json'},
          JSON.stringify(that.fixtures.track)
        );
      }, 100);
    });

    it('should get a track and use only the callback function if it is provided', function() {
      var api = new SpotifyWebApi();
      var callback = sinon.spy();
      var result = api.getTrack('3Qm86XLflmIXVm1wcwkgDK', callback);
      that.requests[0].respond(200,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures.track)
      );
      expect(callback.calledWith(null, that.fixtures.track)).to.be.ok;
      expect(result).to.be.null;
    });

    it('should return an error when looking up a wrong id and use the provided promise implementation', function(done) {
      var api = new SpotifyWebApi();
      var result = api.getAlbum('asdyi1uy');
      that.requests[0].respond(404,
        {'Content-Type':'application/json'},
        JSON.stringify(that.fixtures['error_id-not-found'])
      );
      result.fail(function(error) {
        expect(error.status).to.equal(404);
        done();
      });
      expect(that.requests).to.have.length(1);
      expect(that.requests[0].url).to.equal('https://api.spotify.com/v1/albums/asdyi1uy');
    });
  });

  describe('Using Promises/A+ through a not supported promise implementation', function() {

    it('should throw an error when setting a not supported promise implementation', function() {
      var api = new SpotifyWebApi();
      var setPromise = function() {
        var wrongImplementation = {};
        api.setPromiseImplementation(wrongImplementation);
      };
      expect(setPromise).to.throw(Error);
    });
  });
});
