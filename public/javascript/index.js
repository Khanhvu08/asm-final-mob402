$(function () {
  $("#btn-add-product").click(function () {
    const errModal = $("#error");
    errModal.empty();
    if (
      !$("#productName").val() ||
      !$("#productPrice").val() ||
      !$("#productColor").val() ||
      !$("#productType").val()
    ) {
      errModal.text("Vui lòng không để trống các trường");
      return false;
    }
  });

  $("#btn-update-product").click(function () {
    const errModalU = $("#errorModalUpdate");
    if (
      !$("#updateName").val() ||
      !$("#updatePrice").val() ||
      !$("#updateColor").val() ||
      !$("#updateType").val()
    ) {
      errModalU.text("Vui lòng không để trống các trường");
      return false;
    }
  });
  $("#btn_Search").click(function () {
    if (!$("#search_query").val()) {
      $("#errorSearch").text("Vui lòng nhập từ khoá");
      return false;
    }
  });
  if ($("#errorSearch").length > 0) {
    $("#errorSearch").fadeIn().delay(2000).fadeOut();
  }
  $("#btn-register").click(function () {
    if (!$("#email").val()) {
      $("#errorRegister").text("Vui lòng không để trống email");
      return false;
    }
    if (!$("#fullName").val()) {
      $("#errorRegister").text("Vui lòng nhập đầy đủ họ và tên");
      return false;
    }
    if (!$("#password").val()) {
      $("#errorRegister").text("Vui lòng không để trống mật khẩu");
      return false;
    }
    if ($("#password").val().length < 3) {
      $("#errorRegister").text("Mật khẩu tối thiểu 3 kí tự");
      return false;
    }
    //password :1
    //re-password :2
    if ($("#password").val() !== $("#re-password").val()) {
      $("#errorRegister").text("Mật khẩu nhập lại không đúng");
      return false;
    }
  });
});
