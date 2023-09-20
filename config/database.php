<?php
$host = "localhost";
$port = "5432";
$dbname = "liveness";
$user = "postgres";
$password = "admin";

try {
  $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
  $conn -> setAttribute(PDO:: ATTR_ERRMODE, PDO:: ERRMODE_EXCEPTION);
    echo "Connected successfully";
}
catch (PDOException $e) {
    echo "Connection failed: ".$e -> getMessage();
}
?>