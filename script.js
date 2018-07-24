
$(document).ready(initializeApp);


var student_array =[];
var student_array_id = [];


function initializeApp(){
      addClickHandlersToElements();
}


function addClickHandlersToElements(){
      //$('tbody').on('click','button' , deleteStudent);
     $('.getData').on('click',getStudentData);
     $('.editStudent').on('click',editStudent);
}

function editStudent(){
$('#editModal').modal('show');
}



function getStudentData(){
      console.log('inside fnct');
      var serverData = {
            dataType:'json',
            url: 'https://s-apis.learningfuze.com/sgt/get',
            data:{api_key:'6O24flyBzw'},
            method:"POST",
            success:function(response){
                  console.log(response);
             var responseArray = response.data;
             student_array = responseArray;
             updateStudentList(responseArray);
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
            dataType:'json',
            url: 'https://s-apis.learningfuze.com/sgt/create',
            data:{
                  api_key:'6O24flyBzw',
                  name:studentobject.name,
                  student_id:studentobject.id,
                  grade:studentobject.grade,
                  course: studentobject.course
            },
            method:"POST",
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
            url: 'https://s-apis.learningfuze.com/sgt/delete',
            data:{
                  api_key:'6O24flyBzw',
                  student_id: studentobject.id
            },
            method:"POST",
            success:function(response){
                  console.log(response);
             getStudentData();

            }
      }
            
      $.ajax(deleteStudentFromServer);
}


function addStudent(){
      var newStudent = {
            name:null ,
            course:null ,
            grade:null,
            id:null
      }
      //newStudent.id = (student_array[student_array.length -1].id) + 1;
      newStudent.name = $('#studentName').val();
      newStudent.course = $('#course').val();
      newStudent.grade = $('#studentGrade').val();
      student_array.push(newStudent);
      studentInfoToServer(newStudent);
      clearAddStudentFormInputs();
      updateStudentList(student_array);


}

function clearAddStudentFormInputs(){
      
      $('#studentName').val(" ");
       $('#course').val(" ");
       $('#studentGrade').val(" ");
}

function renderStudentOnDom(newStudent,i){
      var tableBody = $('tbody');
      var tableRow = $('<tr>');
      tableBody.append(tableRow);
      tableRow.append(`<td> ${newStudent.name}</td>`);
      tableRow.append(`<td> ${newStudent.course}</td>`);
      tableRow.append(`<td> ${newStudent.grade}</td>`);
      var deleteButton = $('<button>').addClass('btn btn-danger deletebtn').text('delete');
      deleteButton.on('click',function(){
            var targetObject = student_array.indexOf(newStudent);
            deleteStudentFromServer(newStudent);
            
            student_array.splice(targetObject,1);
            
           // student_array_id.splice(this.student_array.id,1);
            $('tbody').empty();
            updateStudentList(student_array);
      })
      tableRow.append(deleteButton);
      var editButton = $('<button>').addClass('btn btn-success editStudent').text('Edit');
            editButton.on('click',function(){
                  $('#editModal').modal('show');
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
      $('.avgGrade').text(average);
}






