const ArticleListComponent = Vue.extend({
  template: '#articleList'
});

Vue.component(
  'article-component',
  {
    template: '#articleList',
    data() {
      return {
        numberOfList: 2,
        pagingValues: [1, 2, 3, 5, 7, 9],
      }
    },
    props: ['articles'],
    computed: {
      numberOfListLabel() {
        return `Number of Items: ${this.numberOfList}`;
      },
    }
  }
);

new Vue({
  el: '#app',
  data: {
    numberOfList: 2,
    pagingValues: [1, 2, 3, 5, 7, 9],
  },
  computed: {
    articles() {
      const articleData = db.articles.map((article) => {
        const newArticle = article;
        newArticle.shortContent = util.getSubString(article.content);
        newArticle.author = article.author;
        newArticle.email = article.email;
        newArticle.title = article.title;
        newArticle.content = article.content;

        return newArticle;
      });

      return articleData;
    }
  }
});
