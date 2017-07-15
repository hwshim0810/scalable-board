name := "scalable-board"

version := "1.0"

scalaVersion := "2.12.1"

sourceDirectories in Compile += new File("src")

resolvers += "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.0.9",
  "com.typesafe.akka" %% "akka-http-testkit" % "10.0.9" % Test,
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.0.9",
  "com.typesafe.slick" %% "slick" % "3.2.0",
  "org.slf4j"% "slf4j-nop"% "1.6.4",
  "postgresql" % "postgresql" % "9.1-901.jdbc4"
)