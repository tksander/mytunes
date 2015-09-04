// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());
    this.set('playlists', new Playlists());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    // params.library.on('play', function(song) {
    //   this.set('currentSong', song);
    // }, this);

    this.get('songQueue').on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    // listen for addPlaylist event from Playlists, then add songs from SongQueue to Playlists
    this.get('playlists').on('addPlaylist', function(playlists) {
      var songQueue = this.get('songQueue');
      var songsArray = songQueue.toArray();
      var newPlaylist = new Playlist({"songs": new Songs(songsArray)});
      playlists.add(newPlaylist);
    }, this);

    // listen on Playlists for playPlaylist
    this.get('playlists').on('playPlaylist', function(playlistModel) {
      debugger;
      var songsArray = playlistModel.get("songs").toArray()
      // add playlist model to songqueue
      this.get('songQueue').reset(songsArray);
    }, this);




    params.library.on('enqueue', function(song) {
      var songQueue = this.get('songQueue');
      // var songCopy = song.attributes;
      // songCopy.url = song.get('url');
      // debugger;
      // songQueue.add( new SongModel(songCopy) );
      songQueue.add( song );
      if(songQueue.length === 1){
        songQueue.playFirst();
      }
    }, this);
  }


});
