package app.board.models

case class ArticleEntity(id: Option[Long] = None, title: String, content: String) {
  require(!title.isEmpty, "title.empty")
  require(!content.isEmpty, "content.empty")
}

case class ArticleEntityUpdate(title: Option[String] = None, content: Option[String] = None) {
  def merge(article: ArticleEntity): ArticleEntity = {
    ArticleEntity(article.id, title.getOrElse(article.title), content.getOrElse(article.content))
  }
}