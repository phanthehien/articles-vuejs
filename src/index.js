
Vue.filter('formatDate', function (date) {
  return util.toDateString(date);
});

Vue.filter('shortContent', function (content) {
  return util.getSubString(content);
});



new Vue({
  el: '#app',
  data: {
    articles: null,
    currentComponent: null,
    article: null,
    pagingInfo: {}
  },
  created: function () {
    this.articles = db.getArticles();
    this._initScreen();

    // this one to handle the back/forward buttons in browser
    window.addEventListener('hashchange', this._handleHashChange);
  },
  beforeDestroy: function () {
    window.removeEventListener('hashchange', this._handleHashChange);
  },
  methods: {
    changeScreen: function (screenComponent, article, pagingInfo) {
      const screenState = {
        component: screenComponent,
        articleId: article && article.id,
        pagingInfo: pagingInfo || this.pagingInfo
      };

      this._replaceScreen(screenState);
    },
    updatePaging: function (updatePaging) {
      // updating paging info in the screen
      const { numberOfList, currentPaging } = updatePaging;

      if (
        numberOfList !== this.pagingInfo.numberOfList ||
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
      db.saveArticles(this.articles);
    },
    _initScreen: function() {
      const appState = this._getInitState();
      this._replaceScreen(appState);
    },
    _getStateFromHash: function () {
      const urlHash = util.getHash(window.location.hash);

      if (urlHash) {
        return this._urlStringToScreenState(urlHash)
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
      const hashState = this._screenStateToUrlString(screenState);
      const { component, articleId, pagingInfo } = screenState;

      let article = null;

      if (articleId) {
        article = this.articles.find(article => article.id === articleId);
      }

      this.currentComponent = component;
      this.article = article;
      this.pagingInfo = pagingInfo;

      window.location.hash = hashState;
    },
    _handleHashChange: function (e) {
      if (window.location.hash) {
        const state = this._getStateFromHash();
        this._replaceScreen(state);
      }
    },
    _screenStateToUrlString: function(screenState) {
      // converting screenState to url String
      const { component, articleId, pagingInfo } = screenState;

      let url = `component=${component}`;

      if (articleId) {
        url += `&articleId=${articleId}`
      }

      if (pagingInfo) {
        const { numberOfList, currentPaging } = pagingInfo;
        url += `&pagingInfo.numberOfList=${numberOfList}&pagingInfo.currentPaging=${currentPaging}`
      }

      return url;
    },
    _urlStringToScreenState: function(url) {
      // converting urlString to screenState

      if (url) {
        let screenState = {};
        const fieldAndValues = url.split('&');

        fieldAndValues.map(fieldAndValue => {
          const words = fieldAndValue.split('=');
          const field = words[0];
          const value = words.length > 1 ? words[1] : null;

          util.setByDot(screenState, field, value);
        });

        if (!screenState.pagingInfo) {
          screenState.pagingInfo = {
            numberOfList: 3,
            currentPaging: 0
          }
        }

        return screenState;
      }

      return null;
    }
  }
});
