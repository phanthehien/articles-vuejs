const article_mixins = {
  article_item: {
    props: ['articles', 'change_screen', 'save_articles'],
    methods: {
      switchToList: function () {
        this.change_screen('article-list-component');
      },
    }
  }
};
