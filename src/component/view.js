Vue.component(
  'article-view-component',
  {
    template: '#articleView',
    props: ['articles', 'change_screen', 'article'],
    methods: {
      switchToList: function () {
        this.change_screen('article-list-component');
      },
    }
  }
);
