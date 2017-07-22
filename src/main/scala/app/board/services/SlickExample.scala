package app.board.services

import java.sql.Timestamp
import java.util.Date
import scala.concurrent.ExecutionContext.Implicits.global

import slick.jdbc.H2Profile.api._

class SlickExample {
  val db = Database.forConfig("lazylife")

//  try {

    class Articles(tag: Tag) extends Table[(Int, String, String, Timestamp)](tag, "Articles") {
      def id = column[Int]("id")
      def title = column[String]("title")
      def content = column[String]("content")
      def created_at = column[Timestamp]("created_at")

      def * = (id, title, content, created_at)
    }
    val articles = TableQuery[Articles]

    val setup = DBIO.seq(
      (articles.schema).create,
      articles += (1, "Title", "Contents", new Timestamp(new Date().getTime))
    )
    val setupFuture = db.run(setup)

    def getAllArticles()= {
      val q1 = for(article <- articles)
        yield LiteralColumn(" ") ++ article.title ++ "\t" ++ article.content
      db.stream(q1.result).foreach(println)
    }

//  } finally db.close()
}
