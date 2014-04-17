var SpotifyWebApi = (function() {

  'use strict';
  var _baseUri = 'https://api.spotify.com/v1';
  var _accessToken = null;

  var _promiseProvider = function(promiseFunction, callback) {
    if (window.Promise) {
      return new Promise(promiseFunction);
    }
    else {
      var other = window.Q || window.when;
      if (other) {
        var deferred = other.defer();
        promiseFunction(function(resolvedResult) {
          deferred.resolve(resolvedResult);
        }, function(rejectedResult) {
          deferred.reject(rejectedResult);
        });
        return deferred.promise;
      } else {
        if (callback) {
          return promiseFunction(function(resolvedResult) {
            callback(null, resolvedResult);
          }, function(rejectedResult) {
            callback(rejectedResult, null);
          });
        }
      }
    }
    return null;
  };

  var _checkParamsAndPerformRequest = function(requestData, options, callback) {
    var opt = {};
    var cb = null;

    if (typeof options === 'object') {
      opt = options;
      cb = callback;
    } else if (typeof options === 'function') {
      cb = options;
    }
    _extend(requestData.params, opt);
    return _performRequest(requestData, cb);
  };

  var _performRequest = function(requestData, callback) {
    var promiseFunction = function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(requestData.type || 'GET',
        _buildUrl(requestData.url, requestData.params),
        true);

      if (_accessToken) {
        req.setRequestHeader('Authorization', 'Bearer ' + _accessToken);
      }

      req.onload = function() {
        if (req.status === 200) {
          var data = JSON.parse(req.responseText);
          if (resolve) {
            resolve(data);
          }
          callback(null, data);
        } else {
          if (reject) {
            reject(req);
          }
          callback(new Error(req), null);
        }
      };
      req.send(null);
    };

    return _promiseProvider(promiseFunction, callback);
  };

  var _extend = function() {
    var args = Array.prototype.slice.call(arguments);
    var target = args[0];
    var objects = args.slice(1);
    target = target || {};
    for (var i = 0; i < objects.length; i++) {
      for (var j in objects[i]) {
        if (!(j in target)) {
          target[j] = objects[i][j];
        }
      }
    }
    return target;
  };

  var _buildUrl = function(url, parameters){
    var qs = '';
    for (var key in parameters) {
      var value = parameters[key];
      qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
    if (qs.length > 0){
      qs = qs.substring(0, qs.length - 1); //chop off last '&'
      url = url + '?' + qs;
    }
    return url;
  };

  var Constr = function() {};

  // public API — prototype
  Constr.prototype = {
    constructor: SpotifyWebApi
  };

  Constr.prototype.getGeneric = function(url, callback) {
    var requestData = {
      url: url
    };
    return _checkParamsAndPerformRequest(requestData, callback);
  };

  Constr.prototype.getMe = function(options, callback) {
    var requestData = {
      url: _baseUri + '/me'
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getUser = function(userId, options, callback) {
    var requestData = {
      url: _baseUri + '/users/' + userId
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getUserPlaylist = function(userId, playlistId, options, callback) {
    var requestData = {
      url: _baseUri + '/users/' + userId + '/playlists/' + playlistId
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getUserPlaylists = function(userId, options, callback) {
    var requestData = {
      url: _baseUri + '/users/' + userId + '/playlists'
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getAlbum = function(albumId, options, callback) {
    var requestData = {
      url: _baseUri + '/albums/' + albumId
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getAlbums = function(albumIds, options, callback) {
    var requestData = {
      url: _baseUri + '/albums/',
      params: { ids: albumIds.join(',') }
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getTrack = function(trackId, options, callback) {
    var requestData = {};
    requestData.url = _baseUri + '/tracks/' + trackId;
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getTracks = function(trackIds, options, callback) {
    var requestData = {
      url: _baseUri + '/tracks/',
      params: { ids: trackIds.join(',') }
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getArtist = function(artistId, options, callback) {
    var requestData = {
      url: _baseUri + '/artists/' + artistId
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getArtists = function(artistIds, options, callback) {
    var requestData = {
      url: _baseUri + '/artists/',
      params: { ids: artistIds.join(',') }
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.getArtistAlbums = function(artistId, options, callback) {
    var requestData = {
      url: _baseUri + '/artists/' + artistId + '/albums'
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.search = function(query, options, callback) {
    var requestData = {
      url: _baseUri + '/search/',
      params: { q: query }
    };
    return _checkParamsAndPerformRequest(requestData, options, callback);
  };

  Constr.prototype.setAccessToken = function(accessToken) {
    _accessToken = accessToken;
  };

  return Constr;
})();
