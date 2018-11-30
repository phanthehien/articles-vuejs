Vue.component(
  'article-edit-component',
  {
    template: '#articleEdit',
    mixins: [article_mixins.article_item],
    props: ['article'],
    data() {
      return {
        errorMessage: ''
      }
    },
    methods: {
      saveArticle: function() {
        const {
          title,
          content,
          author,
          email
        } = this.article;

        if (!title || !content || !author || !email) {
          this.errorMessage = 'Please input all fields.';
          return;
        }

        if (!util.validateEmail(email)) {
          this.errorMessage = 'Your email is not correct. Please check again.';
          return;
        }

        const article = this.articles.find(article => article.id === this.article.id);

        if (article) {
          article.title = title;
          article.content = content;
          article.author = author;
          article.email = email;
          article.updatedDate = util.getNow();
          this.save_articles();
          this.switchToList();
        }
      }
    }
  },

);
