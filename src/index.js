new Vue({
  el: '#app',
  data: {
    articles: db.articles,
    currentComponent: null,
    article: null,
    pagingInfo: {}
  },
  created: function () {
    const articleDB = window.localStorage.getItem('articleDB');
    this.articles = articleDB ? JSON.parse(articleDB) : db.articles;

    const appState = this._getInitState();
    this._initScreen(appState);

    window.addEventListener('popstate', this._handleBackEvent);
  },
  beforeDestroy: function () {
    window.removeEventListener('popstate', this._handleBackEvent);
  },
  methods: {
    changeScreen: function (screenComponent, article, pagingInfo) {
      const screenState = {
        component: screenComponent,
        article: article || this.article,
        pagingInfo: pagingInfo || this.pagingInfo
      };

      window.history.pushState(screenState, '');
      this._replaceScreen(screenState);
    },
    updatePaging: function (updatePaging) {
      const {numberOfList, currentPaging} = updatePaging;

      if (numberOfList !== this.pagingInfo.numberOfList ||
        currentPaging !== this.pagingInfo.currentPaging
      ) {
        const pagingInfo = {
          numberOfList,
          currentPaging
        };

        this.changeScreen(this.currentComponent, this.article, pagingInfo);
      }
    },
    saveArticles: function () {
      window.localStorage.setItem('articleDB', JSON.stringify(this.articles));
    },
    _initScreen: function (screenState) {
      window.history.replaceState(screenState, '');
      this._replaceScreen(screenState);
    },
    _getInitState: function () {
      const urlHash = util.getHash(window.location.hash);
      if (urlHash && JSON.parse(urlHash)) {
        return JSON.parse(urlHash);
      }

      const initState = {
        component: 'article-list-component',
        pagingInfo: {numberOfList: 3, currentPaging: 0}
      };
      return initState;
    },
    _replaceScreen: function (screenState) {
      const hashState = util.encode(JSON.stringify(screenState));
      window.location.hash = hashState;

      const {component, article, pagingInfo} = screenState;
      this.currentComponent = component;
      this.article = article;
      this.pagingInfo = pagingInfo;
    },
    _handleBackEvent: function (e) {
      if (e.state) {
        this._replaceScreen(e.state);
      }
    },
    _handleHashChange: function (e) {
    }
  }
});
