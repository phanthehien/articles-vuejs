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

    const initState = {
      component: 'article-list-component',
      pagingInfo: { numberOfList: 3, currentPaging: 0}
    };
    const hashState = window.localStorage.getItem('hashState');
    const appState = hashState ? JSON.parse(util.decode(hashState)) : initState;

    this.initScreen(appState);

    window.addEventListener('popstate', this.handleBackEvent);
  },
  beforeDestroy: function() {
    window.removeEventListener('popstate', this.handleBackEvent);
  },
  methods: {
    initScreen: function(screenState) {
      window.history.replaceState(screenState, '');
      this.swapScreen(screenState);
    },
    changeScreen: function(screenComponent, article, pagingInfo)  {
      const screenState = {
        component: screenComponent,
        article: article || this.article ,
        pagingInfo: pagingInfo || this.pagingInfo
      };

      window.history.pushState(screenState, '');
      this.swapScreen(screenState);
    },
    swapScreen: function (screenState) {
      const hashState = util.encode(JSON.stringify(screenState));
      window.location.hash = hashState;
      window.localStorage.setItem('hashState', hashState);

      const { component, article, pagingInfo } = screenState;
      this.currentComponent = component;
      this.article = article;

      if (pagingInfo) {
        const { numberOfList, currentPaging } = pagingInfo;
        this.numberOfList = numberOfList;
        this.currentPaging = currentPaging;
      }
    },
    handleBackEvent: function(e) {
      if (e.state) {
        this.swapScreen(e.state);
      }
    },
    handleHashChange: function(e) {
    },
    updatePaging: function(updatePaging) {
      const { numberOfList, currentPaging } = updatePaging;

      if (numberOfList !== this.numberOfList || currentPaging !== this.currentPaging) {
        const pagingInfo = {
          numberOfList,
          currentPaging,
        };

        this.changeScreen(this.currentComponent, this.article, pagingInfo);
      }
    },
    saveArticles: function() {
      window.localStorage.setItem('articleDB', JSON.stringify(this.articles));
    },
  }
});
