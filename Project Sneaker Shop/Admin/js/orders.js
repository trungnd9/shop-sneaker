"use strict";
// Region 1: Global variables
const gURL = "http://localhost:8080/orders";
const gURL_CUSTOMER = "http://localhost:8080/customers";
const gURL_ORDER_DETAIL = "http://localhost:8080/order-details";
const gURL_PRODUCT = "http://localhost:8080/products"
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

var gOrderDetail = [];
// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gCOL_ORDER = ["stt", "orderDate", "requiredDate", "shippedDate", "status", "comments", "customerName", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_ORDER_DATE = 1;
const gCOL_REQUIRED_DATE = 2;
const gCOL_SHIPPED_DATE = 3;
const gCOL_STATUS = 4;
const gCOL_COMMENT = 5;
const gCOL_FULLNAME = 6;
const gCOL_ACTION = 7;

//khai báo bảng order
var gOrderTable = $("#order-table").DataTable({
    columns: [
        { data: gCOL_ORDER[gCOL_STT] },
        { data: gCOL_ORDER[gCOL_ORDER_DATE] },
        { data: gCOL_ORDER[gCOL_REQUIRED_DATE] },
        { data: gCOL_ORDER[gCOL_SHIPPED_DATE] },
        { data: gCOL_ORDER[gCOL_STATUS] },
        { data: gCOL_ORDER[gCOL_COMMENT] },
        { data: gCOL_ORDER[gCOL_FULLNAME] },
        { data: gCOL_ORDER[gCOL_ACTION] },
    ],
    columnDefs: [
        {
            targets: gCOL_STT,
            render: function () {
                return gSTT++;
            }
        },
        {
            targets: [gCOL_ORDER_DATE, gCOL_REQUIRED_DATE, gCOL_SHIPPED_DATE],
            render: function (date) {
                if (date == null) {
                    return null;
                }
                else {
                    return formatDate(date);
                }
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="far fa-lg fa-edit text-success btn-edit"></i> | <i class="fas fa-lg fa-info-circle text-primary btn-detail"></i> | <i class="fas fa-lg fa-trash btn-delete text-danger"></i>`,
        },
    ],
});

const gCOL_ORDER_DETAIL = ["stt", "orderId", "quantity", "price", "productName"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_DETAIL_STT = 0;
const gCOL_ORRDER_ID = 1
const gCOL_QUANTITY_ORDER = 2;
const gCOL_PRICE_EACH = 3;
const gCOL_PRODUCT = 4;

//khai báo bảng order detail
var gOrderDetailTable = $("#orderDetail-table").DataTable({
    columns: [
        { data: gCOL_ORDER_DETAIL[gCOL_DETAIL_STT] },
        { data: gCOL_ORDER_DETAIL[gCOL_ORRDER_ID] },
        { data: gCOL_ORDER_DETAIL[gCOL_QUANTITY_ORDER] },
        { data: gCOL_ORDER_DETAIL[gCOL_PRICE_EACH] },
        { data: gCOL_ORDER_DETAIL[gCOL_PRODUCT] },
    ],
    columnDefs: [
        {
            targets: gCOL_STT,
            render: function () {
                return gSTT++;
            }
        },
        {
            targets: gCOL_PRICE_EACH,
            render: function (price) {
                return convertMoney(price);
            }
        }
    ],
});
// Region 2:  Event execute element

$('#inp-required-date').inputmask('yyyy-mm-dd', { 'placeholder': 'yyyy-mm-dd' });
$('#inp-shipped-date').inputmask('yyyy-mm-dd', { 'placeholder': 'yyyy-mm-dd' });
$('#inp-order-date').inputmask('yyyy-mm-dd', { 'placeholder': 'yyyy-mm-dd' });
onPageLoading();

$("#btn-add-order").click(onBtnCreateOrder);

$("#btn-save-order").click(onBtnSaveOrder);

$("#order-table").on("click", ".btn-detail", function () {
    onBtnGetOrderDetailList(this);
});

$("#order-table").on("click", ".btn-edit", function () {
    onBtnEditOrder(this);
});

$("#order-table").on("click", ".btn-delete", function () {
    onBtnDeleteOrder(this);
});

$("#form-order").on("click", ".btn-add-order-detail", function () {
    onBtnAddOrderDetail();
});

$("#form-order-detail").on("change", "#select-productId", function () {
    changeSelectProduct(this);
});

$("#form-order-detail").on("change", "#inp-quantity-order", function () {
    changeQuantityOrder(this);
});

$("body").on("click", "#btn-save-order-detail", function () {
    onBtnSaveOrderDetail();
});

$('#modal-order').on('hidden.bs.modal', function (e) {
    resetFormOrder();
});

$('#modal-add-order-detail').on('hidden.bs.modal', function (e) {
    resetFormOrderDetail();
});
// Region 3: Event handlers
function onPageLoading() {
    loadDataOrderToTable();
    callApiGetCustomers();
}
// hàm xử lý click nut tạo order
function onBtnCreateOrder() {
    gFormMode = gFORM_MODE_INSERT;
    $("#inp-order-date").attr('disabled', 'disabled').val(getDate);
    $('.select2').select2();
    addFromDetailOrder();
    $("#modal-order").modal().show();
}
// hàm xử lý click nut edit order
function onBtnEditOrder(paramIconEdit) {
    gFormMode = gFORM_MODE_UPDATE;
    var vOrderData = getIdDataFromButton(paramIconEdit);
    gId = vOrderData.id;
    deleteFromDetailOrder();
    loadDataToFormModal(vOrderData);
    $("#modal-order").modal().show();
    $('.select2').select2();
}
// hàm xử lý click nut delete order
function onBtnDeleteOrder(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vOrder = getIdDataFromButton(paramIconDelete);
    callApiDeleteOrder(vOrder);
}
// hàm xử lý click nut show order detail theo order
function onBtnGetOrderDetailList(paramIconDetail) {
    var vOrder = getIdDataFromButton(paramIconDetail);
    callApiGetProductNameByOrderId(vOrder.id);
    $("#modal-orderDetail").modal().show();
}

// hàm xử lý click thêm order detail
function onBtnAddOrderDetail() {
    callApiGetProductId();
    $('#modal-add-order-detail').modal('show');
}
// hàm xử lý change select product
function changeSelectProduct(paramSelectProduct) {
    var vSeletcProductId = $(paramSelectProduct).val();
    callApiGetPriceProduct(vSeletcProductId);
}
// xử lý thay đổi số lượng sản phẩm order
function changeQuantityOrder(paramInputQuantityOrder) {
    var vInpQuantityOrder = $(paramInputQuantityOrder).val();
    if (vInpQuantityOrder <= 0) {
        showAlert("error", "Số lượng nhỏ nhất là 1", 3000);
        $(paramInputQuantityOrder).val("1");
    }
    else if (vInpQuantityOrder > 10) {
        showAlert("error", "Số lượng đặt tối đa là 10", 3000);
        $(paramInputQuantityOrder).val("10");
    }
}
// xử lý lưu sản phẩm order
function onBtnSaveOrderDetail() {
    var vOrderDetail = {
        idProduct: "",
        quantityOrder: "",
        priceEach: ""
    };
    getDataInputOrderDetail(vOrderDetail);
    if (vOrderDetail.idProduct == 0) {
        showAlert("error", "Vui lòng chọn sản phẩm", 3000);
    }
    else {
        gOrderDetail.push(vOrderDetail);
        showAlert("success", "Đã thêm sản phẩm", 3000);
        resetFormOrderDetail();
    }
}
// xử lý lưu order tạo mới
function onBtnSaveOrder() {
    var vCustomerId = "";
    var vOrder = {
        orderDate: "",
        requiredDate: "",
        shippedDate: "",
        status: "",
        comments: "",
        orderDetails: []
    };
    vCustomerId = $("#select-user-modal").val();
    getDataOrder(vOrder);
    if (moment(vOrder.requiredDate, 'YYYY-MM-DD', true).isValid() && vOrder.shippedDate === "") {
        if (gFormMode === gFORM_MODE_INSERT) {
            if (vOrder.orderDetails.length != 0) {
                callApiCreateOrder(vCustomerId, vOrder);
            }
            else {
                showAlert("error", "Hãy thêm sản phẩm", 3000);
            }
        }
        else if (gFormMode === gFORM_MODE_UPDATE) {
            callApiUpdateOrder(gId, vOrder);
        }
    }
    else if (vOrder.shippedDate !== "" && moment(vOrder.shippedDate, 'YYYY-MM-DD', true).isValid()) {
        if (gFormMode === gFORM_MODE_INSERT) {
            if (vOrder.orderDetails.length != 0) {
                callApiCreateOrder(vCustomerId, vOrder);
            }
            else {
                showAlert("error", "Hãy thêm sản phẩm", 3000);
            }
        }
        else if (gFormMode === gFORM_MODE_UPDATE) {
            callApiUpdateOrder(gId, vOrder);
        }
    }
    else {
        showAlert("error", "Định dạng ngày phải là YYYY-MM-DD", 3000);
    }

}

// Region 4: Common funtion
// goi Api lấy tên sản phẩm theo order id
function callApiGetProductNameByOrderId(paramOrderId) {
    $.ajax({
        url: gURL_ORDER_DETAIL + `/order/${paramOrderId}/product`,
        method: "GET",
        dataType: "json",
        success: getModalOrderDetailList,
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
// hiển thi order detail lên bảng modal
function getModalOrderDetailList(paramResponseOrderDetail) {
    gSTT = 1;
    gOrderDetailTable.clear();
    gOrderDetailTable.rows.add(paramResponseOrderDetail);
    gOrderDetailTable.draw();
}
// Gọi Api lấy data order
function loadDataOrderToTable() {
    $.ajax({
        url: gURL,
        method: "GET",
        dataType: "json",
        success: getOrdersList,
    });
}
// Goi Api lấy data customer
function callApiGetCustomers() {
    $.ajax({
        url: gURL_CUSTOMER,
        method: "GET",
        dataType: "json",
        success: loadDateCustomerToSelect,
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
// hiển thị data order ra bảng
function getOrdersList(responseText) {
    gSTT = 1;
    gOrderTable.clear();
    gOrderTable.rows.add(responseText);
    gOrderTable.draw();

}
// Goi Api Tạo mới order
function callApiCreateOrder(paramUserId, paramOrder) {
    if (paramUserId !== "0") {
        $.ajax({
            url: gURL + `/orderDetail/customerId/${paramUserId}`,
            type: "POST",
            data: JSON.stringify(paramOrder),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                showAlert("success", "Tạo đơn hàng thành công!", 3000);
                loadDataOrderToTable();
                resetFormOrder();
                gOrderDetail = [];
            },
            error: function (errors) {
                // console.log(JSON.parse(errors.responseText).errors);
                if (errors.status === 400) {
                    showAlert("error", JSON.parse(errors.responseText).errors, 3000);
                }
                else {
                    showAlert("error", errors.responseText, 3000);
                }
            }
        });
    }
    else {
        showAlert("error", "Hãy thêm customer trước", 3000);
    }

}
// Gọi Api cập nhật order
function callApiUpdateOrder(paramId, paramUser) {
    $.ajax({
        url: gURL + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramUser),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cập nhật thành công!", 3000);
            loadDataOrderToTable();
            resetFormOrder();
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
// Gọi Api xoá order
function callApiDeleteOrder(paramOrder) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Xoá đơn hàng ngày ${paramOrder.orderDate}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL + `/${paramOrder.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xoá!", 3000);
                    loadDataOrderToTable();
                }
            });
        }
    });
}

// call Api get product
function callApiGetProductId() {
    $.ajax({
        url: gURL_PRODUCT,
        method: "GET",
        dataType: "json",
        success: getProductList,
    });
}

// show product to modal select
function getProductList(paramResponseProduct) {
    var vSelectProduct = $("#select-productId");
    vSelectProduct.empty();
    $(paramResponseProduct).each(function (bI, vProduct) {
        vSelectProduct.append($("<option>", { value: vProduct.id, text: `Id: ${vProduct.id} - ${vProduct.productName}` }));
    });
}

// call Api get price product 
function callApiGetPriceProduct(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT + `/${paramProductId}`,
        method: "GET",
        dataType: "json",
        success: function (responseProduct) {
            $('#inp-quantity-order').val("1");
            $('#inp-price-each').val(convertMoney(responseProduct.buyPrice));
        },
    });
}
// thu thập data order detail trên form
function getDataInputOrderDetail(paramOrderDetail) {
    paramOrderDetail.idProduct = $("#select-productId").val();
    paramOrderDetail.quantityOrder = $("#inp-quantity-order").val();
    paramOrderDetail.priceEach = convertMoneyToNumber($("#inp-price-each").val());
}

// tạo nut thêm order detail
function addFromDetailOrder() {
    $('.form-orderDetail').empty();
    $('.form-orderDetail').append(
        `
        <div class="col-sm-3">
            <label for="" class="required">Thêm chi tiết</label>
        </div>
        <div class="col-sm-9">
            <button type="button" class="btn btn-success w-100 btn-add-order-detail">Chọn sản phẩm</button>
        </div>
        `
    );

}
// xoá nút thêm order detail
function deleteFromDetailOrder() {
    $('.form-orderDetail').empty();

}
// ;ấy data của 1 hàng trên bảng khi click hàng đó
function getIdDataFromButton(paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vOrderRowData = gOrderTable.row(vTableRow).data();
    return vOrderRowData;
}
// thu thập data order trên form
function getDataOrder(paramOrder) {
    paramOrder.orderDate = $("#inp-order-date").val();
    paramOrder.requiredDate = $("#inp-required-date").val();
    paramOrder.shippedDate = $("#inp-shipped-date").val();
    paramOrder.status = $("#inp-status").val();
    paramOrder.comments = $("#inp-comment").val();
    paramOrder.orderDetails = gOrderDetail;
}
// hiển thi data của 1  order lên form
function loadDataToFormModal(paramOrder) {
    $("#select-user-modal").val(paramOrder.idCustomer);
    $("#inp-order-date").val(paramOrder.orderDate);
    $("#inp-required-date").val(paramOrder.requiredDate);
    $("#inp-shipped-date").val(paramOrder.shippedDate);
    $("#inp-status").val(paramOrder.status);
    $("#inp-comment").val(paramOrder.comments);
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
// hiện thị ngày hiện tại
function getDate() {
    var date = moment().format("YYYY-MM-DD");
    return date;
}
// định dạng ngày
function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD");
    return date;
}
// xoá data trên form order
function resetFormOrder() {
    gFormMode = gFORM_MODE_NORMAL;
    $("#select-user-modal").val("0");
    $("#inp-order-date").val("");
    $("#inp-required-date").val("");
    $("#inp-shipped-date").val("");
    $("#inp-status").val("");
    $("#inp-comment").val("");

    $('#modal-order').modal('hide');
    gOrderDetail = [];
}
// xoá data trên form order detail
function resetFormOrderDetail() {
    $("#select-productId").val("0");
    $("#inp-quantity-order").val("");
    $("#inp-price-each").val("");

    $('#modal-add-order-detail').modal('hide');
}
// load cusotmer vào select
function loadDateCustomerToSelect(paramResponseCustomer) {
    "use strict";
    let selectCustomerElement = $("#select-customer");
    let selectCustomerModal = $("#select-user-modal");

    $(paramResponseCustomer).each(function (bI, customer) {
        selectCustomerElement.append($("<option>", { value: customer.id, text: `Id: ${customer.id} - ${customer.firstName} ${customer.lastName}` }));
    });

    $(paramResponseCustomer).each(function (bI, customer) {
        selectCustomerModal.append($("<option>", { value: customer.id, text: `Id: ${customer.id} - ${customer.firstName} ${customer.lastName}` }));
    });
    $('.select2').select2();

}
// xử lý sưk kiện khi select customer thay đổi
$("#select-customer").change(getCustomerId);
let OrderData = "";
function getCustomerId(event) {
    "use strict";
    let customerId = event.target.value;
    if (customerId !== "0") {
        $.ajax({
            url: `http://localhost:8080/orders/customer/${customerId}`,
            method: "GET",
            dataType: "json",
            success: getOrdersList,
            error: loadDataOrderToTable,
        });
    }
    else {
        loadDataOrderToTable();
    }
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

function convertMoneyToNumber(money) {
    var currency = money;
    var number = Number(currency.replace(/[^0-9\.]+/g,"").split('.').join(''));
    return number;
}

