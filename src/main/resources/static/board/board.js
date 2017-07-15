eval(load('util/element.js'));

var ListBoard = class {
  constructor(element) {
    this.elmRoot = element;

    this.elmList =
      elem('ul')
        .addClass('list')
        .appendTo(this.elmRoot);

    this.elmPagination =
      elem('ul')
        .addClass('pagination')
        .appendTo(this.elmRoot);

    this.setPage(2);
  }

  setPage(page) {
    this.page = page;
    this.refresh();
  }

  refresh() {
    this.elmPagination.clear();
    for (let page of [2,1]) {
      elem('li')
        .setText(page)
        .addClassIf('active', page == this.page)
        .setOnclick(() => this.setPage(page))
        .appendTo(this.elmPagination);
    }

    this.list = this.getDummyList();
    this.elmList.clear();
    for (let article of this.list) {
      elem('li')
        .setText('[ ' + article.id + ' ] ' + article.title)
        .appendTo(this.elmList);
    }
  }

  getDummyList() {
    if (this.page == 1)
      return [
        { id: 3, title: '3번 글' },
        { id: 2, title: 'E번 글' },
        { id: 1, title: '1번 글' },
      ];
    else if (this.page == 2)
      return [
        { id: 6, title: '6번 글' },
        { id: 5, title: '5번 글' },
        { id: 4, title: '4번 글' },
      ];
  }
}
