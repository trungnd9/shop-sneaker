"use strict";
// Region 1: Globle varibles
const gURL_CUSTOMER = "http://localhost:8080/customers";
var gId = "";
// Region 2: Event execute element
$(document).ready(function () {
    onPageLoading();
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
// Region 3: Event handlers
// lấy thông tin user
function onPageLoading() {
    getCustomerIdUrl();
}
// hàm xử lý click lưu thông tin customer
function onBtnSaveData(paramButton) {
    // khai báo đối tượng
    var vCustomer = {
        lastName: "",
        firstName: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        salesRepEmployeeNumber: "",
        creditLimit: ""
    }
    var vCustomerId = $(paramButton).attr("data");
    getDataCustomer(vCustomer);
    callApiUpdateCustomerData(vCustomerId, vCustomer);
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
// Region 4: Common function
// hàm lấy thông tin id trên đường dẫn
function getCustomerIdUrl() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vUserId = vUrlParams.get('userId');
    callApiGetDataUser(vUserId);
}

//hàm goi Api lấy thông tin chi tiết user theo Id
function callApiGetDataUser(paramUserId) {
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

// gọi Api sửa customer
function callApiUpdateCustomerData(paramCustomerId, paramCustomer) {
    $.ajax({
        url: gURL_CUSTOMER + `/${paramCustomerId}`,
        type: "PUT",
        data: JSON.stringify(paramCustomer),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            getCustomerIdUrl();
            $("#div-password").hide("500");
            scrollToElement("body");   
        },
        error: function (errors) {
            // console.log(JSON.parse(errors.responseText));
            if (errors.status === 400) {
                showAlert("error", JSON.parse(errors.responseText).errors, 5000);
            }
            else {
                showAlert("error", errors.responseText);
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

// hiển thị thông tin lên giao diện
function showDataUser(paramDataUser) {
    $("#btn-save").attr("data", paramDataUser.customer.id);
    $("#img-user").attr("src", paramDataUser.photos);
    $("#inp-username").html(paramDataUser.username);
    $("#inp-lastname").val(paramDataUser.customer.lastName);
    $("#inp-firstname").val(paramDataUser.customer.firstName);
    $("#inp-phone-number").val(paramDataUser.customer.phoneNumber);
    $("#inp-address").val(paramDataUser.customer.address);
    $("#inp-city").val(paramDataUser.customer.city);
    $("#inp-state").val(paramDataUser.customer.state);
    $("#inp-postal-code").val(paramDataUser.customer.postalCode);
    $("#inp-country").val(paramDataUser.customer.country);
    $("#inp-s-r-e-n").val(paramDataUser.customer.salesRepEmployeeNumber);
    $("#inp-credit-limit").val(paramDataUser.customer.creditLimit);
}

// thu thâp dữ liệu customer trên form
function getDataCustomer(paramCustomer) {
    paramCustomer.lastName = $("#inp-lastname").val().trim();
    paramCustomer.firstName = $("#inp-firstname").val().trim();
    paramCustomer.phoneNumber = $("#inp-phone-number").val().trim();
    paramCustomer.address = $("#inp-address").val().trim();
    paramCustomer.city = $("#inp-city").val().trim();
    paramCustomer.state = $("#inp-state").val().trim();
    paramCustomer.postalCode = $("#inp-postal-code").val().trim();
    paramCustomer.country = $("#inp-country").val().trim();
    paramCustomer.salesRepEmployeeNumber = $("#inp-s-r-e-n").val().trim();
    paramCustomer.creditLimit = $("#inp-credit-limit").val().trim();
}

function scrollToElement(paramElement) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(paramElement).offset().top
    }, 200);
}

function fomatFormPassword() {
    $("#inp-password-old").val("");
    $("#inp-password-new").val("");
    $("#inp-password-return").val("");
}