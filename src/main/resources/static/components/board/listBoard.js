def(['components/component'], function(exports) {
  exports.ListBoard = class extends Component {
    constructor(node) {
      super(node);
      this.url = '/board/';
    }

    /**
     * Build pagination Virtual-DOM node
     * @param  {Number} t Total page
     * @param  {Number} p Current page
     * @return {_Node}    Pagination Virtual-DOM node
     */
    getPagination(t, p) {
      let item = (s, to = s) =>
        li({
          onclick: () => this.refresh(this.url + s + '/info'),
          class: s == p ? 'active' : ''
        }, [s.toString()]);

      let list = [];

      if (p > 3) {
        list.push(item(1));
        list.push(item('...', p - 3));
      }

      for (let i = p - 2; i <= p + 2; ++i)
        if (i > 0 && i < t)
          list.push(item(i));

      if (t - p >= 3)
        list.push(item('...', p + 3));

      list.push(item(t));

      return ul({ class: 'pagination' }, list);
    }

    dataToVirtualDOMs(data) {
      let list = data.articleList;
      let pagination = this.getPagination(data.totalPage, data.currentPage);

      return [
        table({ class: 'table' }, [
          thead({}, [
            tr({}, [
              th({}, ['ID']),
              th({}, ['Title'])
            ])
          ]),
          tbody({},
            list.map(item => tr({}, [
              th({}, [item.id.toString()]),
              td({}, [item.title])
            ]))
          )
        ]),
        pagination
      ];
    }
  }
});
