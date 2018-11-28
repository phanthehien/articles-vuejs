new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: 'article-list-component'
  },
  methods: {
    changeScreen: function(screenComponent)  {
      this.currentComponent = screenComponent;
    }
  }
});
