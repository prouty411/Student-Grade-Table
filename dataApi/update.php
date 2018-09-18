<?php


$id = $_GET['student_id'];
$name = $_GET['name'];
$course = $_GET['course_name'];
$grade = $_GET['grade'];
$sql = "UPDATE `student_data` SET `name`='$name',`grade`='$grade',`course_name`='$course' WHERE `id`='$id' " ;
$result = $conn->query($sql);


if(empty($result)){
    $output['error'][] = 'no data';
} else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;     
    }else{
        $output['error'][] = 'no data';

    }
}

?>