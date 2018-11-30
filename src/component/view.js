Vue.component(
  'article-view-component',
  {
    template: '#articleView',
    props: ['articles', 'change_screen', 'article', 'save_articles'],
    created: function() {
      // increase the viewCount anytime user views the article
      this.article.viewCount += 1;
      this.save_articles();
    },
    methods: {
      switchToList: function () {
        this.change_screen('article-list-component');
      },
    }
  }
);
