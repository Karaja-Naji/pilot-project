//add employee to the server
//call the api to add employee and return success or error
 function addEmployee(data) {

   $.ajax({
         url: "/api/addEmployee",
         type: "POST",
         contentType: "application/json;odata=verbose",
         data: JSON.stringify(data),
         headers: {
             "Accept": "application/json;odata=verbose"
         },
         success: function (data) {
             //success(data.d);
             updateEmployeeData();
         },
         error: function (data) {
             //failure(data.responseJSON.error);
             console.log(data);
         }
     });
     dialog.dialog( "close" );
 }
//update employee function
//by send thye new data end the id for the server side
 function updateEmployee(data) {

  var id=$("#update-employee-id").val();

   $.ajax({
         url: "/api/updateEmployee/",
         type: "PUT",
         contentType: "application/json;odata=verbose",
         data: JSON.stringify(data),
         headers: {
             "Accept": "application/json;odata=verbose"
         },
         success: function (data) {
             //success(data.d);
             updateEmployeeData();
         },
         error: function (data) {
             //failure(data.responseJSON.error);
             console.log(data);
         }
     });
     updateDialog.dialog( "close" );
 }

//delete the emploee from the db
 function deleteEmployee(element) {
  var result = confirm("Are you sure you to delete?");
  if (!result) {
      //Logic to delete the item
      return;
  }

   var id=$(element).parent().data("id");
   $(element).parent().parent().remove();

   $.ajax({
         url: "/api/deleteEmployee/"+id,
         type: "DELETE",
         contentType: "application/json;odata=verbose",
         data: JSON.stringify({name:"employeeAfter", email:"emp1after@gmail.com", image_url:"http://bootdey.com/img/Content/user_1.jpg", department:"marketing"}),
         headers: {
             "Accept": "application/json;odata=verbose"
         },
         success: function (data) {
             //success(data.d);
             $(element).parent().parent().remove();
         },
         error: function (data) {
             //failure(data.responseJSON.error);

             console.log(data);
         }
     });
 }

//to fetch the employee data fropm the server
//and upload it to the index page
 function updateEmployeeData() {
   $(".table-rows").remove();
   $.ajax({
         url: "/api/employees",
         type: "GET",
         contentType: "application/json;odata=verbose",
         headers: {
             "Accept": "application/json;odata=verbose"
         },
         success: function (data) {
             //success(data.d);
             data = JSON.parse(data);
             $.each( data, function( index, value ){
               var htmlRow=buildTableRow(value);
               if (value.department == "58accd819666a1de296cdfb4") {
                  $("#marketing-employee tr:last").after(htmlRow);
               }else if (value.department == "58accd8d9666a1de296cdfb5") {
                 $("#finance-employee tr:last").after(htmlRow);
               }
             });
         },
         error: function (data) {
             //failure(data.responseJSON.error);
             console.log(data);
         }
     });
 }

 //build row for the Employee Table
 function buildTableRow(value) {
   var html= '<tr class="table-rows"> \
     <td> \
       <img src="'+value.image_url+'" width="100" height="100" alt=""> \
       <span class="user-subhead">'+value.name+'</span> \
     </td> \
   <td> <a href="#">'+value.email+'</a></td>\
   <td style="width: 20%;" data-imageurl='+value.image_url+' data-name='+value.name+' data-email='+value.email+' data-id='+value._id+'>\
      <a href="javascript:void(0)" class="table-link" onclick="updateEmployeeForm(this);">\
        <span class="fa-stack">\
          <i class="fa fa-square fa-stack-2x"></i>\
          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>\
        </span>\
    </a>\
    <a href="javascript:void(0)" class="table-link danger" onclick="deleteEmployee(this);">\
      <span class="fa-stack">\
        <i class="fa fa-square fa-stack-2x"></i>\
        <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>\
      </span>\
    </a>\
  </td>\
  </tr>';

  return html;
 }

$( function() {
 //upload the picUpload
    $('#fileupload').fileupload({
            dataType: 'json',
            url:"api/file-upload",
            add: function (e, data) {
              $('#blah').attr('src',"uploads/loading.gif");
              // data.context = $('<p/>').text('Uploading...').appendTo(".validateTips");
               data.submit();
            },
            done: function (e, data) {
                // console.log("done e target ",e);
                // console.log("done e target ",data);
            },

            success:function (data) {
              $('#blah').attr('src',data.imagePath);
              $("#image_url").val(data.imagePath);
            }
        });

        $('#update-fileupload').fileupload({
                dataType: 'json',
                url:"api/file-upload",
                add: function (e, data) {

                  $('#udate-blah').attr('src',"uploads/loading.gif");
                  // data.context = $('<p/>').text('Uploading...').appendTo(".validateTips");
                   data.submit();
                },
                done: function (e, data) {
                    // console.log("done e ",e);
                    // console.log("done e ",data);
                },

                success:function (data) {
                  $('#update-blah').attr('src',data.imagePath);
                  $("#update-image-url").val(data.imagePath);
                }
            });
  });