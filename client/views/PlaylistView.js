var PlaylistView = Backbone.View.extend({

  tagName: "option",

  render: function() {
    return this.$el.text(this.model.get("name")).val(this.model.get("name"));
  }
});