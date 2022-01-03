"use strict";
// Region 1: Globle varibles
const gURL_ROLE = "http://localhost:8080/roles";
const gURL_CUSTOMER = "http://localhost:8080/customers";
const gURL_EMPLOYEE = "http://localhost:8080/employees";
// biến lưu trạng thái của form
const gFORM_MODE_NORMAL = "Normal";
const gFORM_MODE_INSERT = "Insert";
const gFORM_MODE_UPDATE = "Update";
const gFORM_MODE_DELETE = "Delete";

// biến toàn cục cho trạng thái của form: mặc định ban đầu là trạng thái Normal
var gFormMode = gFORM_MODE_NORMAL;
// Biến toàn cục để lưu trữ id voucher đang đc update or delete. Mặc định = 0;
var gId = 0;

var gSTT = 1;
// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gCOL_USER = ["photos", "id", "username", "roles[0].roleKey", "createdAt", "updatedAt", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_PHOTO = 0;
const gCOL_USERID = 1;
const gCOL_USERNAME = 2;
const gCOL_ROLE = 3;
const gCOL_DATE_CREATE = 4;
const gCOL_DATE_UPDATE = 5;
const gCOL_ACTION = 6;

//khai báo bảng customer
var gUserTable = $("#user-table").DataTable({
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    columns: [
        { data: gCOL_USER[gCOL_PHOTO] },
        { data: gCOL_USER[gCOL_USERID] },
        { data: gCOL_USER[gCOL_USERNAME] },
        { data: gCOL_USER[gCOL_ROLE] },
        { data: gCOL_USER[gCOL_DATE_CREATE] },
        { data: gCOL_USER[gCOL_DATE_UPDATE] },
        { data: gCOL_USER[gCOL_ACTION] }
    ],
    columnDefs: [
        {
            targets: gCOL_PHOTO,
            render: function (data) {
                return `<div class="try"><img src="/${data}" class="img-thumbnail toggle btn-image" style="width: 80px; height: 80px"></img>`;
            }
        },
        {
            targets: gCOL_DATE_CREATE,
            render: function (data) {
                return formatDate(data);
            }
        },
        {
            targets: gCOL_DATE_UPDATE,
            render: function (data) {
                return formatDate(data);
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="far fa-lg fas fa-user-edit text-success btn-edit-user"></i> | <i class="fas fa-lg fa-user-minus btn-delete-user text-danger"></i>`
        },
    ],
});

// Region 2: Event execute element

loadDataUserToTable();

$("#btn-add-user").click(function () {
    onBtncreateUser();
});

$("#btn-save").click(function () {
    onBtnSaveUser();
});

$("body").on("click", ".btn-edit-user", function () {
    onBtnEditUser(this);
});

$("body").on("click", "#btn-reset-password", function () {
    onBtnResetPassword(this);
});

$("body").on("click", ".btn-delete-user", function () {
    onBtnDeleteUser(this);
});

$('#modal-user').on('hidden.bs.modal', function (e) {
    restForm();
});

// Region 3: Event handlers
function loadDataUserToTable() {
    callApiGetAllUser();
}

// hàm tạo user
function onBtncreateUser() {
    gFormMode = gFORM_MODE_INSERT;
    createFormCustomer();
    callApiGetRole();
    $("#modal-user").modal().show();
}

// lưu thông tin đăng ký user
function onBtnSaveUser() {
    $('#form-user').submit(() => {
        return false;
    });
    validateForm();
}

// sửa thông tin user
function onBtnEditUser(paramIconUser) {
    var vUserData = getDataUserFromButton(paramIconUser);
    loadDataToFormUserDetail(vUserData);
    gId = vUserData.id;
    $("#modal-user-detail").modal().show();
}

// reset mật khẩu
function onBtnResetPassword() {
    callApiResetPassword(gId);
}

// delete user
function onBtnDeleteUser(paramIconDelete) {
    var vUserData = getDataUserFromButton(paramIconDelete);
    if (vUserData.customer != null) {
        callApiDeleteCustomer(vUserData.customer);
    }
    else if (vUserData.employee != null) {
        callApiDeleteEmployee(vUserData.employee);
    }
}

// Region 4: Common function
// validate form đăng ký
function validateForm() {
    $("#form-user").validate({
        rules: {
            username: {
                required: true
            },
            lastname: {
                required: true,
            },
            firstname: {
                required: true,
            },
            phoneNumber: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
        },
        messages: {
            username: {
                required: "Vui lòng nhập username"
            },
            lastname: {
                required: "Tên không được để trống",
            },
            firstname: {
                required: "Họ không được để trống",
            },
            phoneNumber: {
                required: "Vui lòng nhập số điện thoại",
            },
            email: {
                required: "Vui lòng nhập email",
                email: "Email sai định dạng"
            },
            password: {
                required: "Vui lòng nhập mật khẩu",
            },
        },
        submitHandler: function () {
            handleDataForm();
        }
    });
}

// xử lý đthu thập thông tin trên form đăng ký
function handleDataForm() {
    var vRole = $('input[name=role]:checked').val()
    var vUser = {
        username: "",
        password: "",
        customerFirstname: "",
        customerLastname: "",
        phoneNumber: "",
        roles: []
    }
    getDataUser(vUser);
    if (vRole == 3) {
        callApiCreateUser(vUser);
    }
    else {
        callApiCreateEmployee(vUser);
    }
}

//thu thập data trên form
function getDataUser(paramUser) {
    paramUser.customerFirstname = $('#inp-firstname').val().trim();
    paramUser.customerLastname = $('#inp-lastname').val().trim();
    paramUser.username = $('#inp-username').val().trim();
    paramUser.phoneNumber = $('#inp-phone-number').val().trim();
    paramUser.password = $("#inp-password").val().trim();
    paramUser.roles.push($('input[name=role]:checked').val());
}
// gọi Api lấy tất cả user
function callApiGetAllUser() {
    $.ajax({
        url: gURL_USER + `/all`,
        method: "get",
        dataType: "json",
        success: function (responseTextUser) {
            showDataUserToTable(responseTextUser);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị dữ liệu order ra bảng
function showDataUserToTable(paramResponseUser) {
    gSTT = 1;
    gUserTable.clear();
    gUserTable.rows.add(paramResponseUser);
    gUserTable.draw();
    gUserTable.buttons().container().appendTo('#user-table_wrapper .col-md-6:eq(0)');
}

// tạo form thêm khách hàng trên modal
function createFormCustomer() {
    $(".form-user-content").empty();
    $(".form-user-content").append(`
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Username</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="username" class="form-control" id="inp-username">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Tên</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="lastname" class="form-control" id="inp-lastname">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Họ</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="firstname" class="form-control" id="inp-firstname">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Số điện thoại</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="phoneNumber" class="form-control" id="inp-phone-number">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Mật khẩu</label>
            </div>
            <div class="col-sm-9">
                <input type="password" name="password" class="form-control" id="inp-password">
            </div>
        </div>
    `)
}

// tạo form thêm khách hàng trên modal
function createFromEmployee() {
    $(".form-user-content").empty();
    $(".form-user-content").append(`
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Username</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="username" class="form-control" id="inp-username">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Tên</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="lastname" class="form-control" id="inp-lastname">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Họ</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="firstname" class="form-control" id="inp-firstname">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Email</label>
            </div>
            <div class="col-sm-9">
                <input type="text" name="email" class="form-control" id="inp-phone-number">
            </div>
        </div>
        <div class="row form-group">
            <div class="col-sm-3">
                <label for="" class="required">Mật khẩu</label>
            </div>
            <div class="col-sm-9">
                <input type="password" name="password" class="form-control" id="inp-password">
            </div>
        </div>
    `);
}

// goi Api lấy list role nhân viên
function callApiGetRole() {
    $.ajax({
        url: gURL_ROLE + `/all`,
        method: "get",
        dataType: "json",
        success: function (responseTextRoles) {
            loadDataRoleToSelect(responseTextRoles);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// thêm role name vào select
function loadDataRoleToSelect(paramRoles) {
    var vSelectRole = $(".user-role");
    vSelectRole.empty();
    $(paramRoles).each(function (bI, vRole) {
        vSelectRole.append(`
            <div class="icheck-primary d-block mt-4">
                <input type="radio" id="radioPrimary${vRole.id}" name="role" class="role" value=${vRole.id}>
                <label for="radioPrimary${vRole.id}">${vRole.roleName}
                </label>
            </div>
        `);
    });

    $("#radioPrimary3").prop("checked", "checked");

    $('input[type=radio][name=role]').change(function () {
        if (this.value == '3') {
            createFormCustomer();
        }
        else if (this.value == '1' || this.value == '2') {
            createFromEmployee();
        }
    });
}

// gọi Api tạo user customer
function callApiCreateUser(paramUser) {
    $.ajax({
        url: gURL_USER + `/register/customer`,
        type: "POST",
        data: JSON.stringify(paramUser),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Tạo tài khoản thành công", 3000);
            restForm();
            loadDataUserToTable();
        },
        error: function (errors) {
            if (errors.status === 400) {
                showAlert("error", errors.responseText, 3000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}

// gọi Api tạo user employee
function callApiCreateEmployee(paramUser) {
    $.ajax({
        url: gURL_USER + `/register/employee`,
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", getCookie("token"));
        },
        data: JSON.stringify(paramUser),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Tạo tài khoản thành công", 3000);
            restForm();
            loadDataUserToTable();
        },
        error: function (errors) {
            if (errors.status === 400) {
                showAlert("error", errors.responseText, 3000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}

// gọi Api xoá customer
function callApiDeleteCustomer(paramCustomer) {
    Swal.fire({
      title: 'Xác nhận?',
      html: `<p class="text-black">Xoá tài khoản ${paramCustomer.lastName} ${paramCustomer.firstName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá!'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: gURL_CUSTOMER + `/${paramCustomer.id}`,
          type: "DELETE",
          success: function () {
            showAlert("success", "Đã xoá!", 3000);
            loadDataUserToTable();
          }
        });
      }
    });
  }

// Goi Api xoá employee
function callApiDeleteEmployee(paramEmployee) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Xoá tài khoản ${paramEmployee.lastName} ${paramEmployee.firstName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL_EMPLOYEE + `/${paramEmployee.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xóa!", 3000);
                    loadDataUserToTable();
                }
            });
        }
    });
}

// Goi Api reset password
function callApiResetPassword() {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Mật khẩu sẽ được đặt lại thành tên tài khoản?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đặt lại!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL_USER + `/reset/password/${gId}`,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", getCookie("token"));
                },
                type: "PUT",
                success: function () {
                    showAlert("success", "Đã đặt lại!", 3000);
                    $('#modal-user-detail').modal('hide');
                    loadDataUserToTable();
                }
            });
        }
    });
}

// lấy dữ liệu từng hàng trên bảng khi click button
function getDataUserFromButton(paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vUserRowData = gUserTable.row(vTableRow).data();
    return vUserRowData;
}

// hiện thị data user lên form
function loadDataToFormUserDetail(paramUserDeil) {
    if (paramUserDeil.customer != null) {
        $("#inp-fullname").val(`${paramUserDeil.customer.lastName} ${paramUserDeil.customer.firstName}`);
    }
    else if (paramUserDeil.employee != null) {
        $("#inp-fullname").val(`${paramUserDeil.employee.lastName} ${paramUserDeil.employee.firstName}`);
    }
    $("#inp-create-date").val(formatDate(paramUserDeil.createdAt));
    $("#inp-update-date").val(formatDate(paramUserDeil.updatedAt));
    $("#inp-createBy").val(paramUserDeil.createdBy);
    $("#inp-updateBy").val(paramUserDeil.updatedBy);
    $("#inp-role").val(paramUserDeil.roles[0].roleName);
    $("#img-user").attr("src", `/${paramUserDeil.photos}`);
    $("#inp-username").html(paramUserDeil.username);
}

// định dạng ngày
function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD - hh:mm");
    return date;
}

// xoá data customer trên form
function restForm() {
    gFormMode = gFORM_MODE_NORMAL;
    gId = 0;
    $("#inp-lastname").val("");
    $("#inp-firstname").val("");
    $("#inp-phone-number").val("");
    $("#inp-username").val("");
    $('#modal-user').modal('hide');
}

// hiển thị thông báo
function showAlert(status, message, timer) {
    Swal.fire({
        icon: status,
        html: `<p class="text-black">${message}`,
        showConfirmButton: false,
        timer: timer
    });
}