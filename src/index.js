new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: 'article-create-component'
  },
  methods: {
    swapComponent: function(component)
    {
      this.currentComponent = component;
    }
  }
});
