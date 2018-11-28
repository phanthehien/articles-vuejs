Vue.component(
  'article-create-component',
  {
    template: '#articleCreate',
    data() {
      return {
        article: {

        },
        errorMessage: ''
      }
    },
    props: ['articles', 'change_screen', 'save_articles'],
    methods: {
      switchToList: function() {
        this.change_screen('article-list-component');
      },
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

        const article = {
          id: util.guid(),
          title: title,
          content: content,
          author: author,
          email: email,
          updatedDate: util.formatDate(new Date()),
          viewCount: 0
        };

        this.articles.unshift(article);
        this.save_articles();
        this.switchToList();
      },

    }
  },

);
