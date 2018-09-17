
$(document).ready(initializeApp);
var student_array =[];
var student_array_id = [];

function initializeApp(){
      addClickHandlersToElements();
}

function addClickHandlersToElements(){
     $('.getData').on('click',getStudentData);
     $('.editStudent').on('click',editStudent);
}

function editStudent(){
      $('#editModal').modal('show');
}

function getStudentData(){
      console.log('got to the getstudentdata function');
      var serverData = {
            dataType:'json',
            url: 'data.php',
            data:{
                  action:'readAll',
            },
            method:"GET",
            success:function(response){
                  console.log(response);
                  var responseArray = response.data;
                  student_array = responseArray;
                  updateStudentList(responseArray);
            },
            error:function(){
                  console.log('connection failed');
            }
            
      }
      $.ajax(serverData);
}

function handleAddClicked(){
      $('tbody').empty();
      addStudent();
}

function handleCancelClick(){
      clearAddStudentFormInputs();
}

function studentInfoToServer(studentobject){
      var studentInfoToServer = {
            dataType:'JSON',
            url: 'data.php',
            data:{
                  action:'insert',
                  name:studentobject.name,
                  student_id:studentobject.id,
                  grade:studentobject.grade,
                  course_name: studentobject.course_name
            },
            method:"get",
            success:function(response){
            getStudentData();

             console.log('sent the info!');
            }
      }

      $.ajax(studentInfoToServer);

}

function deleteStudentFromServer(studentobject){
      console.log(studentobject);
      var deleteStudentFromServer = {
            dataType:'json',
            url: 'data.php',
            data:{
                  action:'delete',
                  student_id: studentobject.id
            },
            method:"get",
            success:function(response){
                  console.log(response);
             //getStudentData();

            }
      }
            
$.ajax(deleteStudentFromServer);
}

function addStudent(){
      var newStudent = {
            name:null ,
            course_name:null ,
            grade:null,
            id:null
      }
      newStudent.name = $('#studentName').val();
      newStudent.course_name = $('#course_name').val();
      newStudent.grade = $('#studentGrade').val();
      student_array.push(newStudent);
      studentInfoToServer(newStudent);
      clearAddStudentFormInputs();
      $('#addModal').modal('show');
}

function handleUpdateClick(){
      var studentNameEdit = $('#studentNameEdit');
      var courseEdit = $('#courseEdit');
      var studentGradeEdit = $('#studentGradeEdit');
      var studentUpdate = {
            dataType:'JSON',
            url: 'data.php',
            data:{
                  action:'update',
                  name:studentNameEdit,
                  //student_id:studentobject.id,
                  grade:studentGradeEdit,
                  course_name: courseEdit
            },
            method:"get",
            success:function(response){
            console.log('sent the info!');
            }
      }

      $.ajax(studentUpdate);
}

function clearAddStudentFormInputs(){  
      $('#studentName').val(" ");
      $('#course_name').val(" ");
      $('#studentGrade').val(" ");
}

function renderStudentOnDom(newStudent,i){
      var tableBody = $('tbody');
      var tableRow = $('<tr>');
      tableBody.append(tableRow);
      tableRow.append(`<td> ${newStudent.name}</td>`);
      tableRow.append(`<td> ${newStudent.course_name}</td>`);
      tableRow.append(`<td> ${newStudent.grade}</td>`);
      var deleteButton = $('<button>').addClass('btn btn-danger deletebtn').text('delete');
      deleteButton.on('click',function(){
            var targetObject = student_array.indexOf(newStudent);
            deleteStudentFromServer(newStudent);
            student_array.splice(targetObject,1);            
            $('tbody').empty();
            updateStudentList(student_array);
      })
      tableRow.append(deleteButton);
      var editButton = $('<button>').addClass('btn btn-success editStudent').text('Edit');
            editButton.on('click',function(){
                  editStudent();
            });
      tableRow.append(editButton);
}

function updateStudentList(student_array){
      for(var i = 0 ; i<student_array.length;i++){
            var temp = student_array[i];
            renderStudentOnDom(temp , i);
            student_array_id.push(student_array[i].id);
      }
    

      renderGradeAverage(calculateGradeAverage(student_array));
}


function calculateGradeAverage(student_array){
      var sum = 0;
      var average =0;


for(var gradeIndex = 0 ; gradeIndex<student_array.length;gradeIndex++){
      sum = sum  + parseInt(student_array[gradeIndex].grade);
}
      average = parseInt(sum/student_array.length);
      return average;
}

function renderGradeAverage(average){
      if(!average){
            $('.avgGrade').text('N/A');
      }else{
            $('.avgGrade').text(average);
      }
}






