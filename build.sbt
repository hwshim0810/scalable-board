name := "scalable-board"

version := "1.0"

scalaVersion := "2.12.1"

sourceDirectories in Compile += new File("src")

resolvers += "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.0.9",
  "com.typesafe.akka" %% "akka-http-testkit" % "10.0.9" % Test,
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.0.9"
)