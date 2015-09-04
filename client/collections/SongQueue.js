// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function() {
    
    this.on('ended',function(){
      this.shift();
      if(this.length > 0) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(song) {
      this.remove(song);
    }, this);

    this.on('reset', this.playFirst, this);
  },
  playFirst: function() {
    this.at(0).play();
  } 

});