new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: 'article-list-component',
    article: null,
    numberOfList: 2,
    currentPaging: 0,
  },
  created: function() {
    const articleDB = window.localStorage.getItem('articleDB');
    this.articles = articleDB ? JSON.parse(articleDB) : db.articles;
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
    },
    saveArticles: function() {
      window.localStorage.setItem('articleDB', JSON.stringify(this.articles));
    },
  }
});
