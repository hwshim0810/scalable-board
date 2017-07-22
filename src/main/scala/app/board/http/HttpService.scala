package app.board.http

import akka.http.scaladsl.server.Directives._
import app.board.http.routes.{ArticlesServiceRoute, AuthServiceRoute, UsersServiceRoute}
import app.board.services.{ArticlesService, AuthService, UsersService}
import app.board.utils.CorsSupport

import scala.concurrent.ExecutionContext

class HttpService(usersService: UsersService,
                  authService: AuthService,
                  articlesService: ArticlesService
                 )(implicit executionContext: ExecutionContext) extends CorsSupport {

  val usersRouter = new UsersServiceRoute(authService, usersService)
  val authRouter = new AuthServiceRoute(authService)
  val articlesRouter = new ArticlesServiceRoute(articlesService)

  val routes =
    pathPrefix("board") {
      corsHandler {
        usersRouter.route ~
        authRouter.route ~
        articlesRouter.route
      }
    }

}
