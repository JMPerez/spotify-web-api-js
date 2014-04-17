describe('Basic', function() {
  it('should get a track', function() {
    var api = new SpotifyWebApi();
    api.getTrack('3Qm86XLflmIXVm1wcwkgDK', function(err, data) {
      expect(data).to.have.property('id');
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
