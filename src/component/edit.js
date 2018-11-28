Vue.component(
  'article-edit-component',
  {
    template: '#articleEdit',
    props: ['articles', 'change_screen', 'article', 'save_articles'],
    methods: {
      switchToList: function() {
        this.change_screen('article-list-component');
      },
      saveArticle: function() {
        const {
          title,
          content,
          author,
          email
        } = this.article;

        if (!title || !content || !author || !email) {
          alert('Please input all value');
          return;
        }

        const article = this.articles.find(article => article.id === this.article.id);

        if (article) {
          article.title = title;
          article.content = content;
          article.author = author;
          article.email = email;
          article.updatedDate = util.formatDate(new Date());
          this.save_articles();
          this.switchToList();
        }
      }
    }
  },

);
