package app.board.http

import akka.http.scaladsl.server.directives.{ RouteDirectives, BasicDirectives, HeaderDirectives, FutureDirectives }
import akka.http.scaladsl.server.Directive1
import app.board.models.UserEntity
import app.board.services.AuthService
import app.board.services.ArticlesService

trait SecurityDirectives {

  import BasicDirectives._
  import HeaderDirectives._
  import RouteDirectives._
  import FutureDirectives._

  def authenticate: Directive1[UserEntity] = {
    headerValueByName("Token").flatMap { token =>
      onSuccess(authService.authenticate(token)).flatMap {
        case Some(user) => provide(user)
        case None       => reject
      }
    }
  }

  protected val authService: AuthService
//  protected val articlesService: ArticlesService

}
