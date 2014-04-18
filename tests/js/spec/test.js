/* global describe, it, SpotifyWebApi, expect */

'use strict';
describe('Basic', function() {
  it('should get a track', function() {
    var api = new SpotifyWebApi();
    api.getTrack('3Qm86XLflmIXVm1wcwkgDK', function(err, data) {
      expect(data).to.have.property('id');
    });
  });

  it('should get an album', function() {
    var api = new SpotifyWebApi();
    api.getAlbum('4lFDt4sVpCni9DRHRmDjgG', function(err, data) {
      expect(data).to.have.property('id');
    });
  });

  it('should get multiple albums', function() {
    var api = new SpotifyWebApi();
    api.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'], function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.have.length(2);
      expect(data[0]).to.have.property('id');
      expect(data[1]).to.have.property('id');
    });
  });

  it('should get an artist', function() {
    var api = new SpotifyWebApi();
    api.getArtist('2hazSY4Ef3aB9ATXW7F5w3', function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.have.property('id');
    });
  });

  it('should get artist\'s albums', function() {
    var api = new SpotifyWebApi();
    api.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.have.length.of.at.least(1);
    });
  });

  it('should get artist\'s albums (with max)', function() {
    var api = new SpotifyWebApi();
    api.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10}, function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.have.length.of.at.most(10);
    });
  });

  it('should search', function() {
    var api = new SpotifyWebApi();
    api.search('Madonna', function(err, data) {
      expect(data).to.have.property('tracks');
    });
  });

  // error cases
  it('should fail with a non-existing track', function() {
    var api = new SpotifyWebApi();
    api.getTrack('something-very-weird', function(err, data) {
      expect(err).to.not.be.null;
      expect(data).to.be.null;
    });
  });
});
