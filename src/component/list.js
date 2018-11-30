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
        return `Current: ${this.numberOfList}`;
      },
      rangeLabel() {
        const from = this.currentPaging * this.numberOfList + 1;
        const to = Math.min(from + this.numberOfList - 1, this.articles.length);

        if (from < to) {
          return `Items ${from} to ${to}`;
        } else if (from === to) {
          return `Item ${from}`;
        } else {
          return ``;
        }
      },
      pagingNumbers() {
        return this.pagingValues;
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

        return this.articles.slice(skip, endIndex);
      }
    },
    methods: {
      switchToCreate: function () {
        this.change_screen('article-create-component');
      },
      switchToView: function (article) {
        this.change_screen('article-view-component', article);
      },
      switchToEdit: function (article) {
        this.change_screen('article-edit-component', article);
      },
      handleActions: function () {
        // check for the child component first then
        // if not then check for current component
        if (!this._handleAction(event.target)) {
          this._handleAction(event.currentTarget);
        }
      },
      handlePaginationClick: function () {
        if (event.target.dataset) {
          const { index, action } = event.target.dataset;

          switch (action) {
            case 'actionNumberOfList':
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
        const result = confirm('are you sure to delete this article: \n ' + title + ' ?');

        if (result === true) {
          const index = this.articles.findIndex(article => article.id === id);
          this.articles.splice(index, 1);
          this.save_articles();
        }
      },
      _handleAction: function (target) {
        if (target && target.dataset) {
          const { id, action } = target.dataset;
          const article = this.articles.find(article => article.id === id);

          switch (action) {
            case 'actionEdit':
              this.switchToEdit(article);
              return true;
              break;

            case 'actionDelete':
              this.deleteArticle(article);
              return true;
              break;

            case 'actionViewRow':
              this.switchToView(article);
              return true;
              break;

            default:
              return false;
              break;
          }
        }

        return false;
      },
    }
  }
);
