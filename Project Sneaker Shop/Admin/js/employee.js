"use strict";
// Region 1:Globle variables
const gURL = "http://localhost:8080/employees";
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
const gCOL_EMPLOYEE = ["id", "lastName", "firstName", "extension", "email", "officeCode", "reportTo", "jobTitle", "userNameEmployee", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_LASTNAME = 1;
const gCOL_FIRSTNAME = 2;
const gCOL_EXTENTION = 3;
const gCOL_EMAIL = 4;
const gCOL_OFFICE_CODE = 5;
const gCOL_REPORT_TO = 6;
const gCOL_JOB_TITLE = 7;
const gCOL_USER_NAME = 8;
const gCOL_ACTION = 9;

//khai báo bảng employee
var gEmployeeTable = $("#employee-table").DataTable({
    columns: [
        { data: gCOL_EMPLOYEE[gCOL_STT] },
        { data: gCOL_EMPLOYEE[gCOL_LASTNAME] },
        { data: gCOL_EMPLOYEE[gCOL_FIRSTNAME] },
        { data: gCOL_EMPLOYEE[gCOL_EXTENTION] },
        { data: gCOL_EMPLOYEE[gCOL_EMAIL] },
        { data: gCOL_EMPLOYEE[gCOL_OFFICE_CODE] },
        { data: gCOL_EMPLOYEE[gCOL_REPORT_TO] },
        { data: gCOL_EMPLOYEE[gCOL_JOB_TITLE] },
        { data: gCOL_EMPLOYEE[gCOL_USER_NAME] },
        { data: gCOL_EMPLOYEE[gCOL_ACTION] },
    ],
    columnDefs: [
        {
            targets: gCOL_STT,
            render: function () {
                return gSTT++;
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="far fa-lg fa-edit text-success btn-edit"></i> | 
                            <i class="fas fa-lg fa-trash-alt text-danger btn-delete"></i>`,
        },
    ],
});
// Region 2: Event execute element
onPageLoading();

$("#btn-add-employee").click(onBtnCreateEmployees);

$("#btn-save-employee").click(onBtnSaveEmployees);


$("#employee-table").on("click", ".btn-edit", function () {
    onBtnEditEmployee(this);
});
$("#employee-table").on("click", ".btn-delete", function () {
    onBtnDeleteEmployee(this);
});
$('#modal-employee').on('hidden.bs.modal', function (e) {
    resetForm();
});
// Region 3: Event handlers
function onPageLoading() {
    loadDataEmployeesToTable();
}
// xử lý click thêm employee
function onBtnCreateEmployees() {

    gFormMode = gFORM_MODE_INSERT;

    $("#modal-employee").modal().show();
}
// xử lý click cập nhật data của employee
function onBtnEditEmployee(paramIconEdit) {
    gFormMode = gFORM_MODE_UPDATE;
    var vREmployeeData = getIdDataFromButton(paramIconEdit);
    gId = vREmployeeData.id;
    loadDataToFormModal(vREmployeeData);
    $("#modal-employee").modal().show();
}
// xử lý click xoá employee
function onBtnDeleteEmployee(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vEmployeeData = getIdDataFromButton(paramIconDelete);
    callApiDeleteEmployee(vEmployeeData);
}
// // xử lý click lưu data employee
function onBtnSaveEmployees() {
    var vEmployee = {
        lastName: "",
        firstName: "",
        extension: "",
        email: "",
        officeCode: "",
        reportTo: "",
        jobTitle: ""
    };
    getDataEmployee(vEmployee);

    if (gFormMode === gFORM_MODE_INSERT) {
        callApiCreateEmployee(vEmployee);
    }
    else if (gFormMode === gFORM_MODE_UPDATE) {
        callApiUpdateEmployee(gId, vEmployee);
    }

}

// Region 4: Common function
// Goi api lấy data employee
function loadDataEmployeesToTable() {
    $.ajax({
        url: gURL,
        method: "GET",
        dataType: "json",
        success: getEmployeesList,
    });
}
// hiển thị data empployee ra bảng
function getEmployeesList(responseText) {
    gSTT = 1;
    gEmployeeTable.clear();
    gEmployeeTable.rows.add(responseText);
    gEmployeeTable.draw();
}
// call Api tạo mới employee
function callApiCreateEmployee(paramEmployee) {
    $.ajax({
        url: gURL,
        type: "POST",
        data: JSON.stringify(paramEmployee),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Thêm mới thành công!", 3000);
            loadDataEmployeesToTable();
            resetForm();
        },
        error: function (errors) {
            // console.log(JSON.parse(errors.responseText));
            if (errors.status === 400) {
                showAlert("error", JSON.parse(errors.responseText).errors, 3000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}
// call Api cập nhật data employee
function callApiUpdateEmployee(paramId, paramEmployee) {
    $.ajax({
        url: gURL + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramEmployee),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            resetForm();
            loadDataEmployeesToTable();
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
// Goi Api xoá employee
function callApiDeleteEmployee(paramEmployee) {
    Swal.fire({
        title: 'Are you sure?',
        html: `<p class="text-black">You won't be able to revert employee ${paramEmployee.lastName} ${paramEmployee.firstName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL + `/${paramEmployee.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Delete Employee complete!", 3000);
                    loadDataEmployeesToTable();
                }
            });
        }
    });
}
// lấy data trên 1 hàng của bảng
function getIdDataFromButton(paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vEmployeeRowData = gEmployeeTable.row(vTableRow).data();
    return vEmployeeRowData;
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

// hiển thị data của 1 employee lên form
function loadDataToFormModal(paramEmployee) {
    $("#inp-lastname").val(paramEmployee.lastName);
    $("#inp-firstname").val(paramEmployee.firstName);
    $("#inp-extention").val(paramEmployee.extension);
    $("#inp-email").val(paramEmployee.email);
    $("#inp-office-code").val(paramEmployee.officeCode);
    $("#inp-report-to").val(paramEmployee.reportTo);
    $("#inp-job-title").val(paramEmployee.jobTitle);
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
// xoá data trên form
function resetForm() {
    $("#inp-lastname").val("");
    $("#inp-firstname").val("");
    $("#inp-extention").val("");
    $("#inp-email").val("");
    $("#inp-office-code").val("");
    $("#inp-report-to").val("");
    $("#inp-job-title").val("");

    $('#modal-employee').modal('hide');
}


