Vue.component(
  'article-view-component',
  {
    template: '#articleView',
    mixins: [article_mixins.article_item],
    props: ['article'],
    created: function () {
      // increase the viewCount anytime user views the article
      this.article.viewCount += 1;
      this.save_articles();
    }
  }
);
