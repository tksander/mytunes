var PlaylistsView = Backbone.View.extend({

  tagName: "div",

  initialize: function() {
    this.render();

    this.collection.on("add", this.render, this);
  },

  events: {
    'click #playlistButton': function() {
      // add playlist to playlist collection
      this.collection.addPlaylist();
    },

    'change #dropdown': function() {
      var playlistName = this.$el.find('#dropdown').val(); 
      this.collection.playPlaylist(playlistName);
    }
  },

  render: function() {
    this.$el.children().detach();
    // map over each element in collection and instantiate,render, append to el
    this.$el.append( $('<button type="button" id="playlistButton">Create Playlist</button>') );
    this.$el.append('<h4>Playlists</h4>');
    var $dropdown = $('<select id="dropdown"></select>').append(this.collection.map(function(playlist) {
      return new PlaylistView({model: playlist}).render();
    }));
    
    this.$el.append($dropdown);

  }
  
});
