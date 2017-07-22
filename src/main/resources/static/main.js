const main = () => {
  def([
    'components/board/listBoard'
  ], exports => {
    for (let node of document.getElementsByClassName('component')) {
      this[node.dataset.class]
        .create(node)
        .refresh(node.dataset.url);
    }
  });
};
