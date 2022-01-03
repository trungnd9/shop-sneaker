"use strict";
// Region 1:Globle variables
const gURL = "http://localhost:8080/offices";
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
const gCOL_OFFICE = ["stt", "city", "phone", "addressLine", "state", "country", "territory", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_CITY = 1;
const gCOL_PHONE = 2;
const gCOL_ADDRESS = 3;
const gCOL_STATE = 4;
const gCOL_COUNTRY = 5;
const gCOL_TERRITORY = 6;
const gCOL_ACTION = 7;

//khai báo bảng office
var gOfficeTable = $("#office-table").DataTable({
    columns: [
        { data: gCOL_OFFICE[gCOL_STT] },
        { data: gCOL_OFFICE[gCOL_CITY] },
        { data: gCOL_OFFICE[gCOL_PHONE] },
        { data: gCOL_OFFICE[gCOL_ADDRESS] },
        { data: gCOL_OFFICE[gCOL_STATE] },
        { data: gCOL_OFFICE[gCOL_COUNTRY] },
        { data: gCOL_OFFICE[gCOL_TERRITORY] },
        { data: gCOL_OFFICE[gCOL_ACTION] },
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
            defaultContent: `<i class="far fa-2x fa-edit text-success btn-edit"></i> | 
      <i class="fas fa-2x fa-trash-alt text-danger btn-delete"></i>`,
        },
    ],
});
// Region 2: Event execute element
onPageLoading();

$("#btn-add-office").click(onBtnCreateOffice);

$("#btn-save").click(onBtnSaveRegion);


$("#office-table").on("click", ".btn-edit", function () {
    onBtnEditOffice(this);
});
$("#office-table").on("click", ".btn-delete", function () {
    onBtnDeleteOffice(this);
});
$('#modal-office').on('hidden.bs.modal', function (e) {
    resetForm();
});
// Region 3: Event handlers
function onPageLoading() {
    loadDataOfficeToTable();
}
// xử lý click thêm office
function onBtnCreateOffice() {

    gFormMode = gFORM_MODE_INSERT;

    $("#modal-office").modal().show();
}
// xử lý click sửa office
function onBtnEditOffice(paramIconEdit) {
    gFormMode = gFORM_MODE_UPDATE;
    var vOfficeData = getIdDataFromButton(paramIconEdit);
    gId = vOfficeData.id;
    loadDataToFormModal(vOfficeData);
    $("#modal-office").modal().show();
}
// xử lý click xoá office
function onBtnDeleteOffice(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vOfficeId = getIdDataFromButton(paramIconDelete).id;
    callApiDeleteOffice(vOfficeId);
}
// xử lý click lưu data office
function onBtnSaveRegion() {
    var vOffice = {
        city: "",
        phone: "",
        addressLine: "",
        state: "",
        country: "",
        territory: "",
    };
    getDataOffice(vOffice);

    if (gFormMode === gFORM_MODE_INSERT) {
        callApiCreateOffice(vOffice);
    }
    else if (gFormMode === gFORM_MODE_UPDATE) {
        callApiUpdateOffice(gId, vOffice);
    }

}

// Region 4: Common function
// Goi Api lấy daya office
function loadDataOfficeToTable() {
    $.ajax({
        url: gURL,
        method: "GET",
        dataType: "json",
        success: getOfficeList,
    });
}
// hiển thi data office ra bảng
function getOfficeList(responseText) {
    gOfficeTable.clear();
    gOfficeTable.rows.add(responseText);
    gOfficeTable.draw();
}
// Goi Api tạo mới office
function callApiCreateOffice(paramOffice) {
    $.ajax({
        url: gURL,
        type: "POST",
        data: JSON.stringify(paramOffice),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);
            showAlert("success", "Thêm mới thành công!", 3000);
            loadDataOfficeToTable();
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
// Goi Api cập nhật office
function callApiUpdateOffice(paramId, paramOffice) {
    $.ajax({
        url: gURL + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramOffice),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            resetForm();
            loadDataOfficeToTable();
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
// goi Api xoá office
function callApiDeleteOffice(paramOffice) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Xoá văn phòng ${paramOffice.id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL + `/${paramOffice.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xoá!", 3000);
                    loadDataOfficeToTable();
                }
            });
        }
    });
}
// lấy data office trên 1 hàng của bảng
function getIdDataFromButton(paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vOfficeRowData = gOfficeTable.row(vTableRow).data();
    return vOfficeRowData;
}

// thu thập data office trên form
function getDataOffice(paramOffice) {
    paramOffice.city = $("#inp-city").val();
    paramOffice.phone = $("#inp-phone").val();
    paramOffice.addressLine = $("#inp-address").val();
    paramOffice.state = $("#inp-state").val();
    paramOffice.country = $("#inp-country").val();
    paramOffice.territory = $("#inp-territory").val();
}
// hiển thị data 1 hàng của bảng lên form
function loadDataToFormModal(paramOffice) {
    $("#inp-city").val(paramOffice.city);
    $("#inp-phone").val(paramOffice.phone);
    $("#inp-address").val(paramOffice.addressLine)
    $("#inp-state").val(paramOffice.state);
    $("#inp-country").val(paramOffice.country);
    $("#inp-territory").val(paramOffice.territory);
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
    $("#inp-city").val("");
    $("#inp-phone").val("");
    $("#inp-address").val("")
    $("#inp-state").val("");
    $("#inp-country").val("");
    $("#inp-territory").val("");

    $('#modal-office').modal('hide');
}

