new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: 'article-list-component',
    article: null,
    numberOfList: 2,
    currentPaging: 0
  },
  methods: {
    changeScreen: function(screenComponent, article)  {
      this.currentComponent = screenComponent;
      this.article = article;
    },
    updatePaging: function(updatePaging) {
      const { numberOfList, currentPaging } = updatePaging;
      this.numberOfList = numberOfList;
      this.currentPaging = currentPaging;
    }
  }
});
