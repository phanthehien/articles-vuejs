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

    const articlePaging = window.localStorage.getItem('articlePaging');
    const pagingInfo = articlePaging ? JSON.parse(articlePaging) : { numberOfList: 2, currentPaging: 0};

    const { numberOfList, currentPaging } = pagingInfo;

    this.numberOfList = numberOfList;
    this.currentPaging = currentPaging;
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

      window.localStorage.setItem('articlePaging', JSON.stringify(updatePaging));
    },
    saveArticles: function() {
      window.localStorage.setItem('articleDB', JSON.stringify(this.articles));
    },
  }
});
