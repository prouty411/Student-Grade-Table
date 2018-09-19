<?php


$id = $_GET['student_id'];
$name = mysqli_real_escape_string($conn,$_GET['name']);
$course = mysqli_real_escape_string($conn,$_GET['course_name']);
$grade = mysqli_real_escape_string($conn,$_GET['grade']);
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