Vue.component(
  'article-create-component',
  {
    template: '#articleCreate',
    data() {
      return {
        article: {

        }
      }
    },
    props: ['articles', 'change_screen'],
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
          alert('Please input all value');;
          return;
        }

        const article = {
          id: util.guid(),
          title: encodeURI(title),
          content: encodeURI(content),
          author: encodeURI(author),
          email: encodeURI(email),
          updatedDate: util.formatDate(new Date()),
          viewCount: 0
        };

        this.articles.unshift(article);
        this.switchToList();
      }
    }
  },

);
