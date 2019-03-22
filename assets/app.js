$("#formRegistration").submit( function (e){
  if ($("#email").val() == "" || $("#password").val() == "") {
    e.preventDefault();
    if($("#password").val() == ""){    
      $("#password").addClass("border border-danger text-danger");
      $("#help-block-password").text("ingrese un password valido");
    }
    else{
      $("#password").removeClass("border border-danger text-danger");
      $("#help-block-password").text("");
    }
    if ($("#email").val() == "") {
      $("#email").addClass("border border-danger text-danger");
      $("#help-block-email").text("ingrese un email valido");
    }
    else{
      $("#email").removeClass("border border-danger text-danger");
      $("#help-block-email").text("");
    }    
  } 
});

$("#formLogin").submit( function (e){
  if ($("#email").val() == "" || $("#password").val() == "") {
    e.preventDefault();
    if($("#password").val() == ""){    
      $("#password").addClass("border border-danger text-danger");
      $("#help-block-password").text("ingrese un password valido");
    }
    else{
      $("#password").removeClass("border border-danger text-danger");
      $("#help-block-password").text("");
    }
    if ($("#email").val() == "") {
      $("#email").addClass("border border-danger text-danger");
      $("#help-block-email").text("ingrese un email valido");
    }
    else{
      $("#email").removeClass("border border-danger text-danger");
      $("#help-block-email").text("");
    }    
  } 
});