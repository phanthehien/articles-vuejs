Vue.component(
  'article-list-component',
  {
    template: '#articleList',
    data() {
      return {
        pagingValues: [1, 2, 3, 5, 7, 9]
      }
    },
    props: [
      'articles',
      'change_screen',
      'paging_info',
      'update_paging',
      'save_articles'
    ],
    computed: {
      numberOfList() {
        return this.paging_info ? Number(this.paging_info.numberOfList) : 3;
      },
      currentPaging() {
        return this.paging_info ? Number(this.paging_info.currentPaging) : 0;
      },
      numberOfListLabel() {
        return `Number of Items: ${this.numberOfList}`;
      },
      paginationItems() {
        const paginationItems = [];

        if (this.articles && this.numberOfList) {
          const numberOfPaging = Math.ceil(this.articles.length / this.numberOfList);

          for (let i = 0; i < numberOfPaging; i += 1) {
            paginationItems.push(i + 1);
          }
        }

        return paginationItems;
      },
      currentArticles() {
        const skip = this.currentPaging * this.numberOfList;
        const endIndex = Math.min(skip + this.numberOfList, this.articles.length);

        const articleData = this.articles.slice(skip, endIndex).map((article) => {
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
    },
    methods: {
      switchToCreate: function() {
        this.change_screen('article-create-component');
      },
      switchToView: function(article) {
        this.change_screen('article-view-component', article);
      },
      switchToEdit: function(article) {
        this.change_screen('article-edit-component', article);
      },
      handleActions: function() {
        if (event.target && event.target.dataset) {
          const { id, action } = event.target.dataset;
          const article = this.articles.find(article => article.id === id);

          switch (action) {
            case 'actionEdit':
              this.switchToEdit(article);
              break;

            case 'actionDelete':
              this.deleteArticle(article);
              break;

            default:
              if (event.currentTarget && event.currentTarget.dataset) {
                const { id, action } = event.currentTarget.dataset;
                const article = this.articles.find(article => article.id === id);

                switch(action) {
                  case 'actionViewRow':
                  case 'actionView':
                    this.switchToView(article);
                    break;

                  default:
                    break
                }

              }
              break;
          }
        }
      },
      handlePaginationClick: function () {
        if (event.target.dataset) {
          const { index, action } = event.target.dataset;

          switch (action) {
            case 'actionDropdown':
              this.update_paging({
                numberOfList: parseInt(index),
                currentPaging: 0
              });
              break;

            case 'actionPagination':
              this.update_paging({
                numberOfList: this.numberOfList,
                currentPaging: parseInt(index - 1)
              });

              break;

            default:
              break;
          }
        }
      },
      deleteArticle(article) {
        const { title, id } = article;
        const result = confirm('are you sure to delete this article: \n ' +  title + ' ?');

        if (result === true) {
          const index = this.articles.findIndex(article => article.id === id);
          this.articles.splice(index, 1);
          this.save_articles();
        }
      }
    }
  }
);
