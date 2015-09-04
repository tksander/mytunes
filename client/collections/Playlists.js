// Playlists.js - Defines a backbone collection class for Playlists.
var Playlists = Backbone.Collection.extend({

  model: Playlist,

  // function  for addPlaylist
  addPlaylist: function() {
    this.trigger('addPlaylist', this);
  },

  playPlaylist: function(playlistName) {
    var playlistModel = this.find(function(playlist) {
      return playlist.get('name') === playlistName;
    });
    this.trigger('playPlaylist', playlistModel);
  }

});