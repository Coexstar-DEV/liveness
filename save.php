<?php
$host = "localhost";
$port = "5432";
$dbname = "liveness";
$user = "postgres";
$password = "admin";


$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo "Error connecting to the database.";
    exit;
}

if (($_FILES['my_file']['name']!="")){
// Where the file is going to be stored
	$target_dir = "uploads/";
	$file = $_FILES['my_file']['name'];
	$path = pathinfo($file);
	$filename = $path['filename'];
	$ext = $path['extension'];
    $uniqueNumber = bin2hex(random_bytes(8));
    $new_filename = $filename.".".$uniqueNumber;
	$temp_name = $_FILES['my_file']['tmp_name'];
	$path_filename_ext = $target_dir.$new_filename.".".$ext;
 
// Check if file already exists
if (file_exists($path_filename_ext)) {
 echo "Sorry, file already exists.";
 }else{
 move_uploaded_file($temp_name,$path_filename_ext);
  header("Location:success.html");
 }
}


$video = $new_filename;
$email = "john.doe@example.com";

$sql = "INSERT INTO video(email, video) VALUES ('$email', '$video')";

// Execute the query
$result = pg_query($conn, $sql);

if ($result) {
    echo "Data inserted successfully.";
} else {
    echo "Error inserting data.";
}

// Close the connection
pg_close($conn);




?>