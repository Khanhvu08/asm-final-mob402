$(function () {
    $(".btn").click(function () {
      $("#errorLogin").empty(); // Xóa bỏ bất kỳ thông báo lỗi nào hiện tại
      if (!$(".inputUsr").val()) {
        $("#errorLogin").text("Vui lòng không để trống email");
        return false;
      }
  
      if (!isEmail($(".inputUsr").val())) {
        $("#errorLogin").text("Vui lòng nhập đúng định đạng email");
        return false;
      }
      if (!$(".inputPwd").val()) {
        $("#errorLogin").text("Vui lòng không để trống password");
        return false;
      }
    });
  
    if ($("#errLG").length > 0) {
      $("#errLG").fadeIn().delay(2000).fadeOut();
    }
  });
  function isEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }
  