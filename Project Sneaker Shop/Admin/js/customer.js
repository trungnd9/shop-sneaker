"use strict";
// Region 1: Globle varibles
const gURL = "http://localhost:8080/customers";
const gURL_ORDER = "http://localhost:8080/orders";
const gURL_PAYMENT = "http://localhost:8080/payments";

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
const gCOL_CUSTOMER = ["id", "lastName", "firstName", "phoneNumber", "address", "city", "state", "postalCode", "country", "userNameCustomer", "creditLimit", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_LASTNAME = 1;
const gCOL_FIRSTNAME = 2;
const gCOL_PHONENUMBER = 3;
const gCOL_ADDRESS = 4;
const gCOL_CITY = 5;
const gCOL_STATE = 6;
const gCOL_POSTAL_CODE = 7;
const gCOL_COUNTRY = 8;
const gCOL_SALESREPEMPLOYEENUMBER = 9;
const gCOL_CREDIT_LIMIT = 10;
const gCOL_ACTION = 11;

//khai báo bảng customer
var gCustomersTable = $("#customers-table").DataTable({
  "responsive": true, "lengthChange": false, "autoWidth": false,
  "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
  columns: [
    { data: gCOL_CUSTOMER[gCOL_STT] },
    { data: gCOL_CUSTOMER[gCOL_LASTNAME] },
    { data: gCOL_CUSTOMER[gCOL_FIRSTNAME] },
    { data: gCOL_CUSTOMER[gCOL_PHONENUMBER] },
    { data: gCOL_CUSTOMER[gCOL_ADDRESS] },
    { data: gCOL_CUSTOMER[gCOL_CITY] },
    { data: gCOL_CUSTOMER[gCOL_STATE] },
    { data: gCOL_CUSTOMER[gCOL_POSTAL_CODE] },
    { data: gCOL_CUSTOMER[gCOL_COUNTRY] },
    { data: gCOL_CUSTOMER[gCOL_SALESREPEMPLOYEENUMBER] },
    { data: gCOL_CUSTOMER[gCOL_CREDIT_LIMIT] },
    { data: gCOL_CUSTOMER[gCOL_ACTION]},
  ],
  columnDefs: [
    {
      targets: -1,
      defaultContent: `<i class="far fa-lg fas fa-user-edit text-success btn-edit"></i> | 
      <i class="fas fa-lg fa-shopping-cart text-warning btn-orders"></i> | <i class="fas fa-lg fa-money-bill-alt text-primary btn-payment"></i> | <i class="fas fa-lg fa-user-minus btn-delete text-danger"></i>`
    },
  ],
});

const gCOL_ORDER = ["orderDate", "requiredDate", "shippedDate", "status", "comments"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_ORDER_DATE = 0;
const gCOL_REQUIRED_DATE = 1;
const gCOL_SHIPPED_DATE = 2;
const gCOL_STATUS = 3;
const gCOL_COMMENT = 4;

//khai báo bảng order
var gOrderTable = $("#order-table").DataTable({
  columns: [
    { data: gCOL_ORDER[gCOL_ORDER_DATE] },
    { data: gCOL_ORDER[gCOL_REQUIRED_DATE] },
    { data: gCOL_ORDER[gCOL_SHIPPED_DATE] },
    { data: gCOL_ORDER[gCOL_STATUS] },
    { data: gCOL_ORDER[gCOL_COMMENT] },
  ],
  columnDefs: [
    {
      targets: [gCOL_ORDER_DATE, gCOL_REQUIRED_DATE, gCOL_SHIPPED_DATE],
      render: function (date) {
        if (date != null) {
          return formatDate(date);
        }
        else {
          return null;
        }
      }
    }
  ]
});

const gCOL_PAYMENT = ["stt", "checkNumber", "paymentDate", "amount"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_PAYMENT_STT = 0;
const gCOL_CHECK_NUMBER = 1;
const gCOL_PAYMENT_DATE = 2;
const gCOL_AMMOUNT = 3;

//khai báo payment
var gPaymentTable = $("#payment-table").DataTable({
  columns: [
    { data: gCOL_PAYMENT[gCOL_PAYMENT_STT] },
    { data: gCOL_PAYMENT[gCOL_CHECK_NUMBER] },
    { data: gCOL_PAYMENT[gCOL_PAYMENT_DATE] },
    { data: gCOL_PAYMENT[gCOL_AMMOUNT] },
  ],
  columnDefs: [
    {
      targets: gCOL_STT,
      render: function () {
        return gSTT++;
      }
    }
  ],
});
// Region 2: Event execute element
onPageLoading();

$("#btn-add-customer").click(function () {
  onBntcreateCustomerData();
});
$("#btn-save").click(function () {
  onBtnSaveData();
});
$("#customers-table").on("click", ".btn-edit", function () {
  onBtnEditCustomer(this);
});
$("#customers-table").on("click", ".btn-orders", function () {
  onBtnGetOrderByCustomer(this);
});
$("#customers-table").on("click", ".btn-payment", function () {
  onBtnGetPaymentByCustomer(this);
});
$("#customers-table").on("click", ".btn-delete", function () {
  onBtnDeleteCustomer(this);
});
$('#modal-customer').on('hidden.bs.modal', function (e) {
  restForm();
})
// Region 3: Event handlers
function onPageLoading() {
  loadDataCustomerToTable();
}
//hàm xử lí khi nút thêm voucher được click
function onBntcreateCustomerData() {
  gFormMode = gFORM_MODE_INSERT;

  $("#modal-customer").modal().show();

}
// hàm xử lý click nút edit
function onBtnEditCustomer(paramIconEdit) {
  gFormMode = gFORM_MODE_UPDATE;
  var vCustomerData = getIdDataFromButton(paramIconEdit);
  loadDataToForm(vCustomerData);
  $("#modal-customer").modal().show();
  gId = vCustomerData.id;
}
// hàm xử lý click nút delete
function onBtnDeleteCustomer(paramIconDelete) {
  gFormMode = gFORM_MODE_DELETE;
  var vCustomer = getIdDataFromButton(paramIconDelete);
  callApiDeleteCustomer(vCustomer);
}
// hàm xử lý click nút xem order
function onBtnGetOrderByCustomer(paramIconOrder) {
  var vCustomer = getIdDataFromButton(paramIconOrder);
  callApiGetOrderListByCustomerId(vCustomer.id);
}
// hàm xử lý click nút xem payment
function onBtnGetPaymentByCustomer(paramIconPayment) {
  var vCustomer = getIdDataFromButton(paramIconPayment);
  callApiGetPaymentByCustomerId(vCustomer.id);
}
// hàm xử lý click lưu thông tin customer
function onBtnSaveData() {
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
  getDataCustomer(vCustomer);
  if (gFormMode === gFORM_MODE_INSERT) {
    callApiCreateCustomer(vCustomer);
  }
  else if (gFormMode === gFORM_MODE_UPDATE) {
    callApiUpdateCustomerData(gId, vCustomer);
  }
}
// Region 4: Common function
// hiển thị dạn sách customer ra bảng
function getAllCustomer(paramResponse) {
  gSTT = 1;
  gCustomersTable.clear();
  gCustomersTable.rows.add(paramResponse);
  gCustomersTable.draw();
  gCustomersTable.buttons().container().appendTo('#customers-table_wrapper .col-md-6:eq(0)');
}
// call Api lấy dữ liệu customer
function loadDataCustomerToTable() {
  $.ajax({
    url: gURL,
    method: "get",
    dataType: "json",
    success: function (response) {
      getAllCustomer(response);
    },
    error: function () {
      showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
    }
  });
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
// gọi Api tạo mới customer
function callApiCreateCustomer(paramCustomer) {
  $.ajax({
    url: gURL,
    type: "POST",
    data: JSON.stringify(paramCustomer),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      showAlert("success", "Tạo mới thành công!", 2000);
      loadDataCustomerToTable();
      restForm();
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
// gọi Api sửa customer
function callApiUpdateCustomerData(paramCustomerId, paramCustomer) {
  $.ajax({
    url: gURL + `/${paramCustomerId}`,
    type: "PUT",
    data: JSON.stringify(paramCustomer),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      showAlert("success", "Cập nhật thành công!", 3000);
      loadDataCustomerToTable();
      restForm();
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
// gọi Api xoá customer
function callApiDeleteCustomer(paramCustomer) {
  Swal.fire({
    title: 'Xác nhận?',
    html: `<p class="text-black">Xoá khách hàng ${paramCustomer.lastName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: gURL + `/${paramCustomer.id}`,
        type: "DELETE",
        success: function () {
          showAlert("success", "Đã xoá!", 3000);
          loadDataCustomerToTable();
        }
      });
    }
  });
}
// goi Api lấy danh sách order theo customer
function callApiGetOrderListByCustomerId(paramCustomerId) {
  $.ajax({
    url: gURL_ORDER + `/customer/${paramCustomerId}`,
    method: "get",
    dataType: "json",
    success: function (responseTextOrder) {
      handleDataOrderList(responseTextOrder);
    },
    error: function () {
      showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
    }
  });
}
// hiển thị dữ liệu order ra bảng
function handleDataOrderList(paramResponseOrder) {
  gSTT = 1;
  gOrderTable.clear();
  gOrderTable.rows.add(paramResponseOrder);
  gOrderTable.draw();
  $("#modal-orders").modal().show();
}
// goi Api lấy danh sách payment theo customer
function callApiGetPaymentByCustomerId(paramCustomerId) {
  $.ajax({
    url: gURL_PAYMENT + `/customer/${paramCustomerId}`,
    method: "get",
    dataType: "json",
    success: function (responseTextPayment) {
      handleDataPaymentList(responseTextPayment);
    },
    error: function () {
      showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
    }
  });
}
// hiển thị dữ liệu payment ra bảng
function handleDataPaymentList(paramResponsePayment) {
  gSTT = 1;
  gPaymentTable.clear();
  gPaymentTable.rows.add(paramResponsePayment);
  gPaymentTable.draw();
  $("#modal-payment").modal().show();
}

// lấy dữ liệu từng hàng trên bảng khi click button
function getIdDataFromButton(paramIcon) {
  var vTableRow = $(paramIcon).parents("tr");
  var vCustomerRowData = gCustomersTable.row(vTableRow).data();
  return vCustomerRowData;
}

// hiện thị data customer lên form
function loadDataToForm(paramCustomer) {
  $("#inp-lastname").val(paramCustomer.lastName);
  $("#inp-firstname").val(paramCustomer.firstName);
  $("#inp-phone-number").val(paramCustomer.phoneNumber);
  $("#inp-address").val(paramCustomer.address);
  $("#inp-city").val(paramCustomer.city);
  $("#inp-state").val(paramCustomer.state);
  $("#inp-postal-code").val(paramCustomer.postalCode);
  $("#inp-country").val(paramCustomer.country);
  $("#inp-s-r-e-n").val(paramCustomer.salesRepEmployeeNumber);
  $("#inp-credit-limit").val(paramCustomer.creditLimit);

}
// hiển thị thông báo
function showAlert(status, message, timer) {
  Swal.fire({
    icon: status,
    html: `<p class="text-black">${message}`,
    showConfirmButton: false,
    timer: timer
  })
}
// định dạng ngày
function formatDate(paramDate) {
  var date = moment(paramDate).format("YYYY-MM-DD");
  return date;
}
// xoá data customer trên form
function restForm() {
  gFormMode = gFORM_MODE_NORMAL;
  $("#inp-lastname").val("");
  $("#inp-firstname").val("");
  $("#inp-phone-number").val("");
  $("#inp-address").val("");
  $("#inp-city").val("");
  $("#inp-state").val("");
  $("#inp-postal-code").val("");
  $("#inp-country").val("");
  $("#inp-s-r-e-n").val("");
  $("#inp-credit-limit").val("");

  $('#modal-customer').modal('hide');
}