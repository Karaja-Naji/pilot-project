var updateDialog, dialog;
$( function() {
  //to delete the height which is soming from blugin
    // the accordion
    $( "#accordion" ).accordion({
      collapsible: true
    });
    $('.tab-pane.ui-accordion-content').css('height', "");


    $("#upload-image").click(function(){
       $("#fileupload").trigger('click');
    });
    $("#update-upload-image").click(function(){
       $("#update-fileupload").trigger('click');
    });
    

    

    //get the Employee data when uploading the page
    updateEmployeeData();

   var  form, updateForm,

     // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
     emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
     name = $( "#name" ),
     email = $( "#email" ),
     password = $( "#password" ),
     allFields = $( [] ).add( name ).add( email ).add( password ),
     updateName = $( "#update-name" ),
     updateEmail = $( "#update-email" ),
     UpdateAllFields = $( [] ).add( name ).add( email ).add( password ),
     tips = $( ".validateTips" );

     //validation
   function updateTips( t ) {
     tips
       .text( t )
       .addClass( "ui-state-highlight" );
     setTimeout(function() {
       tips.removeClass( "ui-state-highlight", 1500 );
     }, 500 );
   }
   //validation
   function checkLength( o, n, min, max ) {
     if ( o.val().length > max || o.val().length < min ) {
       o.addClass( "ui-state-error" );
       updateTips( "Length of " + n + " must be between " +
         min + " and " + max + "." );
       return false;
     } else {
       return true;
     }
   }
   //validation
   function checkRegexp( o, regexp, n ) {
     if ( !( regexp.test( o.val() ) ) ) {
       o.addClass( "ui-state-error" );
       updateTips( n );
       return false;
     } else {
       return true;
     }
   }

   //it takes array of objects and change it to objects
   function getFormData($form){
      var unindexed_array = $form.serializeArray();
      var indexed_array = {};

      $.map(unindexed_array, function(n, i){
          indexed_array[n['name']] = n['value'];
      });

      return indexed_array;
    }

    //add employee validation
   function employeeValidation(status) {

     var valid = validate(name, email, emailRegex);
     allFields.removeClass( "ui-state-error" );

     if ( valid ) {
      var jsonFormData = getFormData($("form#add-user-form"));
      addEmployee(jsonFormData);
     }
     return valid;
   }
   //update employee validation
   function updateEmployeeValidation() {

     var valid = validate(updateName, updateEmail, emailRegex);
     UpdateAllFields.removeClass( "ui-state-error" );

     if ( valid ) {
      var jsonFormData = getFormData($("form#update-user-form"));
      updateEmployee(jsonFormData);
     }
     return valid;
   }

   //validate the length and email
   function validate(name, email, emailRegex) {
     var valid = true;
     valid = valid && checkLength( name, "username", 3, 16 );
     valid = valid && checkLength( email, "email", 6, 80 );

     valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
     valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );

     return valid;
   }


   //add Employee Dialog
   dialog = $( "#dialog-form" ).dialog({
     autoOpen: false,
     height: 400,
     width: 350,
     modal: true,
     buttons: {
       "Create an account": employeeValidation,
       Cancel: function() {
         dialog.dialog( "close" );
       }
     },
     close: function() {
       form[ 0 ].reset();
       allFields.removeClass( "ui-state-error" );
     }
   });

   //update employee Dialog
   updateDialog = $( "#update-dialog-form" ).dialog({
     autoOpen: false,
     height: 400,
     width: 350,
     modal: true,
     buttons: {
       "Update an account": updateEmployeeValidation,
       Cancel: function() {
         updateDialog.dialog( "close" );
       }
     },
     close: function() {
       form[ 0 ].reset();
       UpdateAllFields.removeClass( "ui-state-error" );
     }
   });

   //reset the fields
   form = dialog.find( "form" ).on( "submit", function( event ) {
     event.preventDefault();
     addUser();
   });

   //reset the fields
   updateForm = updateDialog.find( "form" ).on( "submit", function( event ) {
     event.preventDefault();
     addUser();
   });

   //when click the create user
   $( ".create-user" ).button().on( "click", function() {
      $("#blah").attr("src", "uploads/user-default-pic.gif");
      $("#image_url").val("uploads/user-default-pic.gif");
     var departmentId = $(this).data("departmentid");
     //to set the department id
     $("#department").val(departmentId);

     dialog.dialog( "open" );
   });
 } );


 //update employee
 //to set the old data into the form
 function updateEmployeeForm(element) {
    var id=$(element).parent().data("id");
    var name=$(element).parent().data("name");
    var email=$(element).parent().data("email");
    var image_url=$(element).parent().data("imageurl");
    var depId = $(".ui-accordion-content.ui-accordion-content-active").find(".create-user").data("departmentid");

    $("#update-name").val(name);
    $("#update-email").val(email);
    $("#update-employee-id").val(id);
    $("#update-department").val(depId);
    $('#update-blah').attr('src',image_url);
    $("#update-image-url").val(image_url);
     updateDialog.dialog( "open" );

 }
 
