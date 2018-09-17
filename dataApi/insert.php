<?php

$name = $_GET['name'];
$grade = $_GET['grade'];
$course_name = $_GET['course_name'];

$sql = "INSERT INTO `student_data`(`name`, `grade`, `course_name`) 
    VALUES ('$name','$grade','$course_name')";

print_r($course_name);

$result = $conn->query($sql);

if(empty($result)){
    $output['error'][] = 'no data';
} else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        while($row = mysqli_fetch_assoc($result)){
           $output['data'][] = $row; 
        }
    }
}

?>