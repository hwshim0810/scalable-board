package app.board.services

import app.board.models.db.ArticleEntityTable
import app.board.models.{ArticleEntity, ArticleEntityUpdate}
import app.board.utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}

class ArticlesService(val databaseService: DatabaseService)
                     (implicit executionContext: ExecutionContext) extends ArticleEntityTable {

  import databaseService._
  import databaseService.driver.api._

  def getArticles(): Future[Seq[ArticleEntity]] = db.run(articles.result)

  def getArticleById(id: Long): Future[Option[ArticleEntity]] = db.run(articles.filter(_.id === id).result.headOption)

  def createArticle(article: ArticleEntity): Future[ArticleEntity] = db.run(articles returning articles += article)

  def updateArticle(id: Long, articleUpdate: ArticleEntityUpdate): Future[Option[ArticleEntity]] = getArticleById(id).flatMap {
    case Some(article) =>
      val updatedArticle = articleUpdate.merge(article)
      db.run(articles.filter(_.id === id).update(updatedArticle)).map(_ => Some(updatedArticle))
    case None => Future.successful(None)
  }

  def deleteArticle(id: Long): Future[Int] = db.run(articles.filter(_.id === id).delete)

}