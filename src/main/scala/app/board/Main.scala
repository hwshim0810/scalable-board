package app.board

import scala.io.StdIn

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer



object Main {
  def main(args: Array[String]) {

    implicit val system = ActorSystem("board-sys")
    implicit val materializer = ActorMaterializer()
    // needed for the future flatMap/onComplete in the end
    implicit val executionContext = system.dispatcher

    val route: Route =
      pathSingleSlash {
        get {
          getFromResource("static/main.html")
        }
      } ~ {
        getFromResourceDirectory("static")
      } ~
      pathPrefix("board") {
        path(IntNumber / "info") { page =>
          get {
            complete {
              "info : " + page
            }
          }
        } ~
        path("articles" / IntNumber / "info") { articleid =>
          get {
            complete {
              "article : " + articleid
            }
          }
        }
      }

    // `route` will be implicitly converted to `Flow` using `RouteResult.route2HandlerFlow`
    val bindingFuture = Http().bindAndHandle(route, "localhost", 8080)
    println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine() // let it run until user presses return
    bindingFuture
      .flatMap(_.unbind()) // trigger unbinding from the port
      .onComplete(_ => system.terminate()) // and shutdown when done
  }
}
