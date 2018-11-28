new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: 'article-list-component',
    article: null
  },
  methods: {
    changeScreen: function(screenComponent, article)  {
      this.currentComponent = screenComponent;
      this.article = article;
    }
  }
});
