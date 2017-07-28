package app.util.db

import java.util.Properties
import java.io.FileInputStream
import java.sql._

object Postgre {

  private val conn = getConnection()
  private def getConnection() = {
    // Load postgresql driver
    Class.forName("org.postgresql.Driver")

    // Read connect info from properties file and connect to db
    val props = new Properties()
    val fis = new FileInputStream("db.properties")
    try { props.load(fis) } finally { fis.close() }
    val url = String.format("jdbc:postgresql://%s:%s/%s", props.getProperty("host"), props.getProperty("port"), props.getProperty("database"))
    DriverManager.getConnection(url, props)
  }

  def initialize() {
    import app.util.db.table.Article
    Article.create()
  }

  object Query {
    def builder(query: String) = new Query(query)
    def execute(query: String) = builder(query).execute()
  }

  class Query(val query: String) {
    val stmt = conn.prepareStatement(query)
    var i = 1

    def set(param: Any): Query = {
      param match {
        case x: Int => stmt.setInt(i, x)
        case x: Long => stmt.setLong(i, x)
        case x: Float => stmt.setFloat(i, x)
        case x: Double => stmt.setDouble(i, x)
        case x: Boolean => stmt.setBoolean(i, x)
        case x: String => stmt.setString(i, x)
        case x: Any => stmt.setString(i, x.toString())
      }
      i += 1
      this
    }

    def execute() = stmt.execute()
    def executeQuery(): ResultSet = stmt.executeQuery()
    def executeUpdate(): Int = stmt.executeUpdate()
  }
}
