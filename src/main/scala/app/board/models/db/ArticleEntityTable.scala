package app.board.models.db

import app.board.models.ArticleEntity
import app.board.utils.DatabaseService

trait ArticleEntityTable {

  protected val databaseService: DatabaseService
  import databaseService.driver.api._

  class Articles(tag: Tag) extends Table[ArticleEntity](tag, "articles") {
    def id = column[Option[Long]]("id", O.PrimaryKey, O.AutoInc)
    def title = column[String]("title")
    def content = column[String]("content")

    def * = (id, title, content) <> ((ArticleEntity.apply _).tupled, ArticleEntity.unapply)
  }

  protected val articles = TableQuery[Articles]

}