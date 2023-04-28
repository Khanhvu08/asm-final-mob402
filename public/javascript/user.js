$(() => {
  $("#btn-add-user").click(() => {
    const errorUser = $("#errorUser");
    if (
      !$("#username").val() ||
      !$("#userEmail").val() ||
      !$("#userPassword").val()
    ) {
      errorUser.text("Vui lòng không để trống các trường");
      return false;
    }
    if ($("#userPassword").val().length < 3) {
      errorUser.text("Mật khẩu tối thiểu 3 kí tự");
      return false;
    }
  });
  $("#btnUpdateUser").click(() => {
    const errorUUser = $("#errorModalUser");
    errorUUser.text("May da click")
    return false
    // if (
    //   !$("#updateName").val() ||
    //   !$("#updateEmail").val() ||
    //   !$("#UNewPassword").val() ||
    //   !$("#URe-password").val()
    // ) {
    //   errorUUser.text("Vui lòng không để trống các trường");
    //   return false;
    // }
    // if ($("#UNewPassword").val().length < 3) {
    //   errorUUser.text("Mật khẩu tối thiểu 3 kí tự");
    //   return false;
    // }
    // if ($("#UNewPassword").val() !== $("#URe-password").val()) {
    //   errorUUser.text("Mật khẩu nhập lại không đúng");
    //   return false;
    // }
  });
 
});
