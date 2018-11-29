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

    window.addEventListener('hashchange', this._handleHashChange);
  },
  beforeDestroy: function () {
    window.removeEventListener('hashchange', this._handleHashChange);
  },
  methods: {
    changeScreen: function (screenComponent, article, pagingInfo) {
      const screenState = {
        component: screenComponent,
        article: article || this.article,
        pagingInfo: pagingInfo || this.pagingInfo
      };

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
      this._replaceScreen(screenState);
    },
    _getStateFromHash: function () {
      const urlHash = util.getHash(window.location.hash);

      if (urlHash && JSON.parse(urlHash)) {
        return JSON.parse(urlHash);
      }

      return null;
    },
    _getInitState: function () {
      const state = this._getStateFromHash();

      if (state) {
        return state;
      }

      const initialState = {
        component: 'article-list-component',
        pagingInfo: {numberOfList: 3, currentPaging: 0}
      };

      return initialState;
    },
    _replaceScreen: function (screenState) {
      const hashState = util.encode(JSON.stringify(screenState));
      const { component, article, pagingInfo } = screenState;

      window.location.hash = hashState;
      this.currentComponent = component;
      this.article = article;
      this.pagingInfo = pagingInfo;
    },
    _handleHashChange: function (e) {
      if (window.location.hash) {
        const state = this._getStateFromHash();
        this._replaceScreen(state);
      }
    }
  }
});
