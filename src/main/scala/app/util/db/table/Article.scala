package app.util.db.table

import java.sql.ResultSet
import scala.collection.mutable.ListBuffer
import app.util.db.Postgre.Query

object Article {
  val NAME = "Article"
  val ID = "id"
  val TITLE = "title"
  val CONTENT = "content"

  def from(rs: ResultSet): Article =
    new Article(
      rs.getLong(ID),
      rs.getString(TITLE),
      rs.getString(CONTENT)
    )

  def create() =
    Query.execute(s"""
      CREATE TABLE IF NOT EXISTS $NAME(
        $ID BIGSERIAL PRIMARY KEY,
        $TITLE VARCHAR(1024),
        $CONTENT TEXT
      )
    """);

  def drop() = Query.execute(s"DROP TABLE $NAME");

  def select(): List[Article] = {
    val rs = Query.builder(s"SELECT * FROM $NAME").executeQuery()
    var list = ListBuffer.empty[Article]
    while (rs.next())
      list += Article.from(rs)
    list.toList
  }
}

class Article(var id: Long, var title: String, var content: String) {
  import Article._

  def insert() =
    Query.builder(s"INSERT INTO $NAME ($TITLE) VALUES (?)")
      .set(title)
      .executeUpdate()
}
