var fs = require('fs');
var path = require('path');

function loadFixture(fixtureName) {
  return fs.readFileSync(path.join(__dirname, 'fixtures/' + fixtureName + '.json'), 'UTF8');
};

module.exports = {
  track: loadFixture('track'),
  tracks: loadFixture('tracks'),
  track_audio_features: loadFixture('track_audio_features'),
  tracks_audio_features: loadFixture('tracks_audio_features'),
  track_audio_analysis: loadFixture('track_audio_analysis'),
  album: loadFixture('album'),
  album_tracks: loadFixture('album_tracks'),
  albums: loadFixture('albums'),
  artist: loadFixture('artist'),
  artists: loadFixture('artists'),
  artist_albums: loadFixture('artist_albums'),
  artist_albums_limit_2: loadFixture('artist_albums_limit_2'),
  artist_related_artists: loadFixture('artist_related_artists'),
  artist_top_tracks: loadFixture('artist_top_tracks'),
  search: loadFixture('search'),
  search_album: loadFixture('search_album'),
  search_artist: loadFixture('search_artist'),
  search_track: loadFixture('search_track'),
  search_playlist: loadFixture('search_playlist'),
  user: loadFixture('user'),
  me: loadFixture('me'),
  user_playlists: loadFixture('user_playlists'),
  user_new_playlist: loadFixture('user_new_playlist'),
  user_saved_tracks: loadFixture('user_saved_tracks'),
  user_saved_albums: loadFixture('user_saved_albums'),
  user_top_artists: loadFixture('user_top_artists'),
  user_top_tracks: loadFixture('user_top_tracks'),
  playlist: loadFixture('playlist'),
  playlist_tracks: loadFixture('playlist_tracks'),
  featured_playlists: loadFixture('featured_playlists'),
  browse_categories: loadFixture('browse_categories'),
  category: loadFixture('category'),
  category_playlists: loadFixture('category_playlists'),
  new_releases: loadFixture('new_releases'),
  follow_is_following_users: loadFixture('follow_is_following_users'),
  follow_is_following_artists: loadFixture('follow_is_following_artists'),
  follow_are_following_playlist: loadFixture('follow_are_following_playlist'),
  followed_artists: loadFixture('followed_artists'),
  recommendations: loadFixture('recommendations'),
  genre_seeds: loadFixture('genre_seeds'),
  recently_played_tracks: loadFixture('recently_played_tracks'),
  available_devices: loadFixture('available_devices'),
  current_playback: loadFixture('current_playback'),
  current_playing_track: loadFixture('current_playing_track')
};
