new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: null,
    article: null,
    numberOfList: 0,
    currentPaging: 0,
  },
  created: function() {
    const articleDB = window.localStorage.getItem('articleDB');
    this.articles = articleDB ? JSON.parse(articleDB) : db.articles;

    const articlePaging = window.localStorage.getItem('articlePaging');
    const pagingInfo = articlePaging ? JSON.parse(articlePaging) : { numberOfList: 3, currentPaging: 0};

    const screenState = {
      component: 'article-list-component',
      pagingInfo
    };
    this.initScreen(screenState);

    window.addEventListener('popstate', this.handleBackEvent);
  },
  methods: {
    initScreen: function(screenState) {
      window.history.replaceState(screenState, '');
      this.swapScreen(screenState);
    },
    handleBackEvent: function(e) {
      if (e.state) {
        this.swapScreen(e.state);
      }
    },
    changeScreen: function(screenComponent, article, pagingInfo)  {
      const screenState = {
        component: screenComponent,
        article,
        pagingInfo
      };
      window.history.pushState(screenState, '');

      this.swapScreen(screenState);

    },
    swapScreen: function (screenState) {
        const { component, article, pagingInfo } = screenState;

        this.currentComponent = component;
        this.article = article;

        if (pagingInfo) {
            const { numberOfList, currentPaging } = pagingInfo;
            this.numberOfList = numberOfList;
            this.currentPaging = currentPaging;
        }
    },
    updatePaging: function(updatePaging) {
      const { numberOfList, currentPaging } = updatePaging;

      if (numberOfList !== this.numberOfList || currentPaging !== this.currentPaging) {
        const pagingInfo = {
          numberOfList,
          currentPaging,
        };

        this.changeScreen(this.currentComponent, this.article, pagingInfo);
        window.localStorage.setItem('articlePaging', JSON.stringify(updatePaging));
      }
    },
    saveArticles: function() {
      window.localStorage.setItem('articleDB', JSON.stringify(this.articles));
    },
  }
});
