
"use strict";
// Region 1: Globle variables
const gURL_PRODUCT_LINE = "http://localhost:8080/product-lines";

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
const gCOL_PRODUCT_LINE = ["id", "productLine", "description", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_LINE = 1;
const gCOL_DESCRIPTION = 2;
const gCOL_ACTION = 3;

//khai báo product line
var gProductLineTable = $("#product-line-table").DataTable({
    columns: [
        { data: gCOL_PRODUCT_LINE[gCOL_STT] },
        { data: gCOL_PRODUCT_LINE[gCOL_LINE] },
        { data: gCOL_PRODUCT_LINE[gCOL_DESCRIPTION] },
        { data: gCOL_PRODUCT_LINE[gCOL_ACTION] },
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
$("#btn-add-product-line").click(onBtnProductLine);

$("#btn-save").click(onBtnSaveData);

$("#product-line-table").on("click", ".btn-edit", function () {
    onBtnEditProductLine(this);
});
$("#product-line-table").on("click", ".btn-delete", function () {
    onBtnDeleteProductLine(this);
});
$('#modal-product-line').on('hidden.bs.modal', function (e) {
    restForm();
});
// Region 3: Event handlers
function onPageLoading() {
    loadDataProductLineToTable();
}
// xử lý click nút thêm product line
function onBtnProductLine() {
    gFormMode = gFORM_MODE_INSERT;

    $("#modal-product-line").modal().show();
}
// xử lý click nút sửa product line
function onBtnEditProductLine(paramIconEdit) {
    gFormMode = gFORM_MODE_UPDATE;
    var vProductLine = getIdDataFromButton(paramIconEdit);
    gId = vProductLine.id;
    loadDataToForm(vProductLine);
    $("#modal-product-line").modal().show();
}
// xử lý click nút xoá product line
function onBtnDeleteProductLine(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vProductLineId = getIdDataFromButton(paramIconDelete);
    callApiDeleteProductLine(vProductLineId);
}
// // xử lý click nút save product line
function onBtnSaveData() {
    var vProductLine = {
        productLine: "",
        description: ""
    }
    getDataProductLine(vProductLine);
    if (gFormMode === gFORM_MODE_INSERT) {
        callApiCreateProductLine(vProductLine);
    }
    else if (gFormMode === gFORM_MODE_UPDATE) {
        callApiUpdateProductLine(gId, vProductLine);
    }

}

// Region 4: Common function
// gọi Api lấy data product line
function loadDataProductLineToTable() {
    $.ajax({
        url: gURL_PRODUCT_LINE,
        method: "GET",
        dataType: "json",
        success: getUsersList,
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Xin lỗi hệ thống quá tải, vui lòng chờ !',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
}
// hiển thi data productline vào bảng
function getUsersList(responseText) {
    gSTT = 1;
    gProductLineTable.clear();
    gProductLineTable.rows.add(responseText);
    gProductLineTable.draw();
}
// lấy data product line trên form
function getDataProductLine(paramProductLine) {
    paramProductLine.productLine = $("#inp-product-line").val();
    paramProductLine.description = $("#inp-description").val();
}
// hiển thị data product line lên form
function loadDataToForm(paramProductLine) {
    $("#inp-product-line").val(paramProductLine.productLine);
    $("#inp-description").val(paramProductLine.description);
}
// Gọi Api tạo mới product line
function callApiCreateProductLine(paramProductLine) {
    $.ajax({
        url: gURL_PRODUCT_LINE,
        type: "POST",
        data: JSON.stringify(paramProductLine),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (paramProductLine) {
            showAlert("success", "Tạo mới thành công!", 3000);
            loadDataProductLineToTable();
            restForm();
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
// call Api sửa product line
function callApiUpdateProductLine(paramId, paramProductLine) {
    $.ajax({
        url: gURL_PRODUCT_LINE + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramProductLine),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            loadDataProductLineToTable();
            restForm();
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
// call Api xoá product line
function callApiDeleteProductLine(paramProductLine) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Xoá dòng sản phẩm ${paramProductLine.productLine}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL_PRODUCT_LINE + `/${paramProductLine.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Delete User complete!", 3000);
                    loadDataProductLineToTable();
                }
            });
        }
    });
}
// lấy data product line trên 1 hàng của bảng
function getIdDataFromButton(paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vProductLineRowData = gProductLineTable.row(vTableRow).data();
    return vProductLineRowData;
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
function restForm() {
    gFormMode = gFORM_MODE_NORMAL;
    $("#inp-product-line").val("");
    $("#inp-description").val("");

    $('#modal-product-line').modal('hide');
}
