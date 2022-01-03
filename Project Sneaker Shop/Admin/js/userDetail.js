"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_EMPLOYEE = "http://localhost:8080/employees";
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {

    getEmployeeId();

    $("#btn-save").click(function () {
        onBtnSaveData(this);
    });

    $("#inp-upload-photo-user").change(function () {
        onBtnUploadPhotoUser(this);
    });

    $("#inp-update-password").click(function () {
        onBtnUploadPasswordUser(this);
    });

    $("#btn-save-password").click(function () {
        onBtnConfirmPasswordUser(this);
    });
});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// hàm xử lý click lưu thông tin customer
function onBtnSaveData(paramButton) {
    var vEmployee = {
        lastName: "",
        firstName: "",
        extension: "",
        email: "",
        officeCode: "",
        reportTo: "",
        jobTitle: ""
    };
    var vEmployeeId = $(paramButton).attr("data");
    $('#form-user-employee').submit (() => {
        return false;
    });
    $("#form-user-employee").validate({
        rules: {
            lastname: {
                required: true
            },
            firstname: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
        },
        messages: {
            lastname: {
                required: "Vui lòng nhập lastname"
            },
            firstname: {
                required: "Vui lòng nhập firstname"
            },
            email: {
                required: "Vui lòng nhập email",
                email:"Email không đúng định dạng"
            },
        },
        submitHandler: function() {
            getDataEmployee(vEmployee);
            callApiUpdateEmployee(vEmployeeId, vEmployee);
        }
    });
}

// sử lý upload ảnh sản phẩm
function onBtnUploadPhotoUser(paramIconUpload) {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vUserId = vUrlParams.get('userId');
    // console.log(vProductId);
    var images = document.getElementById('inp-upload-photo-user').files.length;
    var vFormData = new FormData();
    for (let index = 0; index < images; index++) {
        vFormData.append("image", document.getElementById('inp-upload-photo-user').files[index])

    }

    $.ajax({
        url: gURL_USER + `/upload/${vUserId}`,
        type: 'POST',
        data: vFormData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            showAlert("success", "Hoàn thành", 3000);
            $("#div-password").hide("500");
            scrollToElement("body");   

        }
    });
}

// xử lý đổi mật khẩu user
function onBtnUploadPasswordUser(paramButton) {
    $("#div-password").show("500");
    scrollToElement("#div-password");
}

// cập nhật mật khẩu
function onBtnConfirmPasswordUser() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vUserId = vUrlParams.get('userId');
    var vNewPassword = {
        password: "",
        passwordNew: ""
    }
    getValuaNewpassword(vNewPassword);
    var vCheck = validateFormPassword(vNewPassword);
    if (vCheck) {
        callApiChangePassword(vUserId, vNewPassword);
    }
}

/*** REGION 4 - Common funtions - Vùng khais báo hàm dùng chung trong toàn bộ chương trình*/
// lấy Id user employee trên url
function getEmployeeId() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vUserId = vUrlParams.get('userId');
    callApiGetDataUserEmployee(vUserId);
}

//hàm goi Api lấy thông tin chi tiết user theo Id
function callApiGetDataUserEmployee(paramUserId) {

    $.ajax({
        url: gURL_USER + `/${paramUserId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            showDataUser(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// call Api cập nhật data employee
function callApiUpdateEmployee(paramId, paramEmployee) {
    $.ajax({
        url: gURL_EMPLOYEE + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramEmployee),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            getEmployeeId();
            $("#div-password").hide("500");
            scrollToElement("body"); 
        },
        error: function (errors) {
            // console.log(JSON.parse(errors.responseText));
            if (errors.status === 400) {
                showAlert("error", JSON.parse(errors.responseText).errors, 5000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}

// Gọi Api thay đổi mật khẩu user
function callApiChangePassword(paramUserId, paramPasswordNew) {
    $.ajax({
        url: gURL_USER + `/change/password/${paramUserId}`,
        type: "POST",
        data: JSON.stringify(paramPasswordNew),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            fomatFormPassword();
            $("#div-password").hide("500");
            scrollToElement("body");   
        },
        error: function (errors) {
            // console.log(JSON.parse(errors.responseText));
            if (errors.status === 400) {
                showAlert("error", errors.responseText, 3000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}

// thu thập thông tin mật khẩu 
function getValuaNewpassword(paramPassword) {
    paramPassword.password = $("#inp-password-old").val().trim();
    paramPassword.passwordNew = $("#inp-password-new").val().trim();
}

// validate form password
function validateFormPassword(paramPassword) {
    var vCheck = 0;
    if (!paramPassword.password) {
        $("#error-password-old").html("Vui lòng nhập mật khẩu của bạn");
        vCheck = 0;
    }
    else {
        $("#error-password-old").html("");
        vCheck += 1;
    }
    if (!paramPassword.passwordNew) {
        $("#error-password-new").html("Vui lòng nhập mật khẩu mới");
        vCheck = 0;
    }
    else {
        $("#error-password-new").html("");
        vCheck += 1;
    }
    if (!checkPassword()) {
        $("#error-password-return").html("Mật khẩu không khớp với mật khẩu mới");
        vCheck = 0;
    }
    else {
        $("#error-password-return").html("");
        vCheck += 1;
    }
    if (vCheck == 3) {
        return true;
    }
}

// check nhập đúng xác nhận mật khẩu
function checkPassword() {
    if ($("#inp-password-return").val() == $("#inp-password-new").val()) {
        return true;
    }
    else {
        return false;
    }
}

// thu thập data employee trên form
function getDataEmployee(paramEmployee) {
    paramEmployee.lastName = $("#inp-lastname").val();
    paramEmployee.firstName = $("#inp-firstname").val();
    paramEmployee.extension = $("#inp-extention").val();
    paramEmployee.email = $("#inp-email").val();
    paramEmployee.officeCode = $("#inp-office-code").val();
    paramEmployee.reportTo = $("#inp-report-to").val();
    paramEmployee.jobTitle = $("#inp-job-title").val();
}

// hiển thị thông tin lên giao diện
function showDataUser(paramDataUser) {
    console.log(paramDataUser)
    $("#btn-save").attr("data", paramDataUser.employee.id);
    $("#img-user").attr("src", `/${paramDataUser.photos}`);
    $("#inp-username").html(paramDataUser.username);
    $("#inp-lastname").val(paramDataUser.employee.lastName);
    $("#inp-firstname").val(paramDataUser.employee.firstName);   
    $("#inp-extention").val(paramDataUser.employee.extension);
    $("#inp-email").val(paramDataUser.employee.email);
    $("#inp-office-code").val(paramDataUser.employee.officeCode);
    $("#inp-report-to").val(paramDataUser.employee.reportTo);
    $("#inp-job-title").val(paramDataUser.employee.jobTitle);
    $("#inp-role").val(paramDataUser.roles[0].roleName);
}

function fomatFormPassword() {
    $("#inp-password-old").val("");
    $("#inp-password-new").val("");
    $("#inp-password-return").val("");
}

function showAlert(status, message, timer) {
    Swal.fire({
        icon: status,
        html: `<p class="text-black">${message}`,
        showConfirmButton: false,
        timer: timer
    });
}

function scrollToElement(paramElement) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(paramElement).offset().top
    }, 200);
}

