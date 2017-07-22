package app.board.http.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.PathMatchers.IntNumber
import de.heikoseeberger.akkahttpcirce.CirceSupport
import app.board.http.SecurityDirectives
import app.board.models.ArticleEntityUpdate
import app.board.services.ArticlesService
import io.circe.generic.auto._
import io.circe.syntax._

import scala.concurrent.ExecutionContext

class ArticlesServiceRoute(val articlesService: ArticlesService)
                          (implicit executionContext: ExecutionContext) extends CirceSupport {

  import StatusCodes._
  import articlesService._

  val route =
    pathEndOrSingleSlash {
      get {
        getFromResource("static/main.html")
      }
    } ~ {
      getFromResourceDirectory("static")
    } ~
    path(IntNumber / "info") { page =>
      get {
        complete(getArticles().map(_.asJson))
      }
    } ~
    path("articles" / IntNumber / "info") { id =>
      get {
        complete(getArticleById(id).map(_.asJson))
      }
    }
}