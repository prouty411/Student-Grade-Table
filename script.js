
$(document).ready(initializeApp);
var student_array =[];
var student_array_id = [];

function initializeApp(){
      displayInitialLoader();
      $('#studentName, #course_name, #studentGrade, #studentNameEdit, #courseEdit, #studentGradeEdit').on('click',function(){
            removeClassError($(this));
      })
      getStudentData();
      $('#editModal').on('hide.bs.modal', function (e) {
            resetLoaderAndButtons();
            
          });
}
function resetLoaderAndButtons(){
      document.getElementById("loader").style.visibility = "hidden";
      $('.saveChanges').prop("disabled",false);
}

function removeClassError(element){
      element.parent().removeClass('has-error');
}
function displayInitialLoader(){
      document.getElementById("initialLoader").style.visibility = "visible";
}

function getStudentData(){
      var serverData = {
            dataType:'json',
            url: 'data.php',
            data:{
                  action:'readAll',
            },
            method:"GET",
            success:function(response){
                  document.getElementById("initialLoader").style.visibility = "hidden";
                  var responseArray = response.data;
                  if(!responseArray === undefined){
                        student_array = responseArray;
                  }
                  if(responseArray === undefined){
                        student_array = student_array;
                  }else{
                        student_array = responseArray;

                  }
                  updateStudentList(student_array);

            },
            error:function(){
                  console.log('connection failed');
            }
            
      }
      $.ajax(serverData);
}

function handleAddClicked(){
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
            error:function(){
                  console.log('error');
            },
            success:function(){
            getStudentData();
            updateStudentList(student_array);
            }
      }
      $.ajax(studentInfoToServer);
}

function deleteStudentFromServer(studentobject){
      var deleteStudentFromServer = {
            dataType:'json',
            url: 'data.php',
            data:{
                  action:'delete',
                  student_id: studentobject
            },
            method:"get",
            error:function(){
                  console.log('error');
            },
            success:function(){
                  hideModal();
                  getStudentData();
                  updateStudentList(student_array);
                  document.getElementById("loaderTwo").style.visibility = "hidden";

            }
      }
            
$.ajax(deleteStudentFromServer);
}

function addStudent(){
      if($('#studentName').val().length === 0 || $('#course_name').val().length === 0 || $('#studentGrade').val().length === 0){
            $('#addModal').modal("show");
            $('#infoModal').text('Please fill in all the fields.');
            return;
      }
      var testName = /^[a-zA-Z ]+$/gi.test($('#studentName').val());
      var testCourse = /^[a-zA-Z ]+$/gi.test($('#course_name').val());
      var testGrade = /(?:\b|-)([0-9]{1,2}[0]?|100)\b/gi.test($('#studentGrade').val());
      if(!testName){
            $('#addModal').modal("show");
            $('#infoModal').text('Please input a valid name.');
            $('#studentName').parent().addClass("has-error");
            return;
      }
      if(!testCourse){
            $('#addModal').modal("show");
            $('#infoModal').text('Please input a valid course name.');
            $('#course_name').parent().addClass("has-error");
            return;
      }
      if(!testGrade){
            $('#addModal').modal("show");
            $('#infoModal').text('Please input a valid grade.');
            $('#studentGrade').parent().addClass("has-error");
            return;
      }
      if($('#studentGrade').val() < 0){
            $('#addModal').modal("show");
            $('#infoModal').text('Grade must be between 0-100.');
            return;
      }

      $('tbody').empty();
      var newStudent = {
            name:null ,
            course_name:null ,
            grade:null,
            id:null
      }
      newStudent.name = $('#studentName').val();
      newStudent.course_name = $('#course_name').val();
      newStudent.grade = $('#studentGrade').val();
      studentInfoToServer(newStudent);
      clearAddStudentFormInputs();
      $('#infoModal').text('Student has been added.');
      $('#addModal').modal('show');

      for(var i = 0 ; i<student_array.length;i++){
            var temp = student_array[i];
            renderStudentOnDom(temp , i);
            student_array_id.push(student_array[i].id);
      }
}
function hideModal(){
      $('#deleteModal').modal('hide');
}


function clearUpdateFields(){
      $('#studentNameEdit').val("");
      $('#courseEdit').val("");
      $('#studentGradeEdit').val("");
}

function handleUpdateClick(){
      if($('#studentNameEdit').val().length === 0 || $('#courseEdit').val().length === 0 || $('#studentGradeEdit').val().length === 0){
            $('#editError').text('Please complete all the fields.');
            return;
      }
      var testName = /^[a-zA-Z ]+$/gi.test($('#studentNameEdit').val());
      var testCourse = /^[a-zA-Z ]+$/gi.test($('#courseEdit').val());
      var testGrade = /(?:\b|-)([0-9]{1,2}[0]?|100)\b/gi.test($('#studentGradeEdit').val());
      if(!testName){
            $('#editError').text('Please input a valid name.');
            $('#studentNameEdit').parent().addClass("has-error");
            return;
      }
      if(!testCourse){
            $('#editError').text('Please input a valid course name.');
            $('#courseEdit').parent().addClass("has-error");
            return;
      }
      if(!testGrade){
            $('#editError').text('Please input a valid grade.');
            $('#studentGradeEdit').parent().addClass("has-error");
            return;
      }
      document.getElementById("loader").style.visibility = "visible";
      $('.saveChanges').prop("disabled",true);

      $('#editError').text('');
      var studentNameEdit = $('#studentNameEdit').val();
      var courseEdit = $('#courseEdit').val();
      var studentGradeEdit = $('#studentGradeEdit').val();
      var individualId = parseInt($('.individualId').attr("id"));
      var studentUpdate = {
            dataType:'json',
            url: 'data.php',
            data:{
                  action:'update',
                  name:studentNameEdit,
                  student_id:individualId,
                  grade:studentGradeEdit,
                  course_name: courseEdit
            },
            method:"get",
            success:function(){
                 
                  updateStudentList(student_array);
                  $('#studentNameEdit').val("");
                  $('#courseEdit').val("");
                  $('#studentGradeEdit').val("");
                  $('tbody').empty();
                  $('#editModal').modal('hide');
                  getStudentData();
            },
            error:function(){
                  console.log('error connecting to update');
            }
      }

      $.ajax(studentUpdate);
}

function clearAddStudentFormInputs(){  
      $('#studentName').val("");
      $('#course_name').val("");
      $('#studentGrade').val("");
}

function renderStudentOnDom(newStudent,i){
      var tableBody = $('tbody');
      var tableRow = $('<tr>', {
            style: 'border-bottom: 1px solid #ddd'
      });
      tableBody.append(tableRow);
      tableRow.append(`<td class="tableInfo"> ${newStudent.name}</td>`);
      tableRow.append(`<td class="tableInfo"> ${newStudent.course_name}</td>`);
      tableRow.append(`<td class="tableInfo"> ${newStudent.grade}</td>`);
      var deleteButton = $('<button>',{
            class:'btn btn-danger deletebtn glyphicon glyphicon-trash',
            id:newStudent.id,
            style:'margin-right:3% ; margin-bottom:3%;'
      });
      deleteButton.on('click',function(){
            var self = $(this)
            $('.modalDeleteButton').on('click',function(){
                  var currentStudentId = parseInt(self.attr('id'));
                  deleteStudentFromServer(currentStudentId);
                  $('tbody').empty();
                  student_array = [];
                  getStudentData();
                  document.getElementById("loaderTwo").style.visibility = "visible";

            })
            $('#deleteModal').modal('show');
            
      });
      tableRow.append(deleteButton);
      var editButton = $('<button>',{
            class:"btn btn-success editStudent fa fa-pencil",
            id:newStudent.id,
            studentName: newStudent.name,
            studentCourse: newStudent.course_name,
            studentGrade: newStudent.grade,
            style:'margin-bottom:3%;margin-top:2%'
      });
      editButton.on('click',function(newStudent){
            $('#editModal').modal('show');
            $('.individualId').attr({"id":editButton[0].id});
            $('.individualId').attr({"studentName":editButton[0].attributes[2].nodeValue});
            $('.individualId').attr({"studentCourse":editButton[0].attributes[3].nodeValue});
            $('.individualId').attr({"studentGrade":editButton[0].attributes[4].nodeValue});
            $('#studentNameEdit').val($('.individualId').attr("studentname"));
            $('#courseEdit').val($('.individualId').attr("studentcourse"));
            $('#studentGradeEdit').val($('.individualId').attr("studentgrade"));

            });
      tableRow.append(editButton);
}

function updateStudentList(student_array){
      if(!student_array){
            $('emptyModal').modal('show');
            return;
      }
      $('tbody').empty();

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
      if(!average){
            return('0%');
      }
      return (average + '%');
}

function renderGradeAverage(average){
      if(!average){
            $('.avgGrade').text('N/A');
      }else{
            $('.avgGrade').text(average);
      }
}






