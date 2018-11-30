Vue.component(
  'article-create-component',
  {
    template: '#articleCreate',
    mixins: [article_mixins.article_item],
    data() {
      return {
        article: { },
        errorMessage: ''
      }
    },
    methods: {
      createArticle: function() {
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

        const now = util.getNow();

        const article = {
          id: util.guid(),
          title: title,
          content: content,
          author: author,
          email: email,
          updatedDate: now,
          createdDate: now,
          viewCount: 0
        };

        this.articles.unshift(article);
        this.save_articles();
        this.switchToList();
      },

    }
  },

);
