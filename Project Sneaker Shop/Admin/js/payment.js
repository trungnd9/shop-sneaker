"use strict";
// Region 1: Global variables
const gURL = "http://localhost:8080/payments";
const gURL_CUSTOMER = "http://localhost:8080/customers";
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
const gCOL_PAYMENT = ["stt","idCustomer", "checkNumber", "paymentDate", "amount", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_CUSTOMER = 1;
const gCOL_CHECK_NUMBER = 2;
const gCOL_PAYMENT_DATE = 3;
const gCOL_AMMOUNT = 4;
const gCOL_ACTION = 5;

//khai báo Datatable & mapping columns
var gPaymentTable = $("#payment-table").DataTable({
  columns: [
    { data: gCOL_PAYMENT[gCOL_STT] },
    { data: gCOL_PAYMENT[gCOL_CUSTOMER] },
    { data: gCOL_PAYMENT[gCOL_CHECK_NUMBER] },
    { data: gCOL_PAYMENT[gCOL_PAYMENT_DATE] },
    { data: gCOL_PAYMENT[gCOL_AMMOUNT] },
    { data: gCOL_PAYMENT[gCOL_ACTION] },
  ],
  columnDefs: [
    {
      targets: gCOL_STT,
      render: function() {
        return gSTT++;
      }
    },
    {
      targets: gCOL_CUSTOMER,
      render: function(customerId) {
        return callApiGetCustomerName(customerId);
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
$("#select-customer").change(findPaymemntsByCustomerId);

$("#btn-add-payment").click(onBtnCreatePayment);

$("#btn-save").click(onBtnSaveData);

$("#payment-table").on("click", ".btn-edit", function () {
  onBtnEditPayment(this);
});

$("#payment-table").on("click", ".btn-delete", function () {
  onBtnDeletePayment(this);
});

$('#modal-payment').on('hidden.bs.modal', function (e) {
  restForm();
})
// Region 3: Event handlers
function onPageLoading() {
  loadDataPaymentToTable();
  callApiGetCustomerList();
}

function findPaymemntsByCustomerId() {
  var vCustomerId = this.value;
  if (vCustomerId == "0") {
    loadDataPaymentToTable();
  }
  else {
    callApiPaymentByCustomerId(vCustomerId);
  }
}

function onBtnCreatePayment() {
  gFormMode = gFORM_MODE_INSERT;

  $("#inp-payment-date").val(getDate);

  $("#modal-payment").modal().show();
}

function onBtnEditPayment(paramIconEdit) {
  gFormMode = gFORM_MODE_UPDATE;
  var vPaymentsData = getIdDataFromButton(paramIconEdit);
  loadDataToForm(vPaymentsData);
  $("#modal-payment").modal().show();
  gId = vPaymentsData.id;
}

function onBtnDeletePayment(paramIconDelete) {
  gFormMode = gFORM_MODE_DELETE;
  var vPayment = getIdDataFromButton(paramIconDelete);
  callApiDeletePayment(vPayment);
}
function onBtnSaveData() {
  var vPayment = {
    checkNumber: "",
    paymentDate: "",
    amount: ""
  }
  var vCustomerId = $("#modal-select-customer").val();
  getDataPayment(vPayment);
  if (gFormMode === gFORM_MODE_INSERT) {
    callApiCreatePayment(vCustomerId, vPayment);
  }
  else if (gFormMode === gFORM_MODE_UPDATE) {
    callApiUpdatePayment(gId, vPayment);
  }

}

// Region 4: Common function
function callApiGetCustomerName(paramCustomerId) {
  var vFullName = "";
  $.ajax({
    url: gURL_CUSTOMER + `/${paramCustomerId}`,
    method: "GET",
    dataType: "json",
    async: false,
    success: function(response) {
      vFullName = `${response.firstName} ${response.lastName}`
    },
    error: function () {
      Swal.fire({
        icon: 'error',
        title: 'Xin lỗi hệ thống quá tải, vui lòng chờ !',
        showConfirmButton: false,
        timer: 1500
      })
    }
  });
  return vFullName;
}

function loadDataPaymentToTable() {
  $.ajax({
    url: gURL ,
    method: "GET",
    dataType: "json",
    success: getPaymentList,
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

function callApiPaymentByCustomerId(paramCustomerId) {
  $.ajax({
    url: gURL + `/customer/${paramCustomerId}` ,
    method: "GET",
    dataType: "json",
    success: function(response) {
      getPaymentList(response);
    } ,
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

function getPaymentList(responseText) {
  gSTT = 1;
  gPaymentTable.clear();
  gPaymentTable.rows.add(responseText);
  gPaymentTable.draw();
}

function callApiGetCustomerList() {
  $.ajax({
    url: gURL_CUSTOMER ,
    method: "GET",
    dataType: "json",
    success: handleDataCustomer,
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

function handleDataCustomer(paramResponseCustomer) {

  var vSlectCustomer = $("#select-customer");
  var vModalSelectCustomer = $("#modal-select-customer");

  $(paramResponseCustomer).each(function(bI, customer) {
    vSlectCustomer.append($("<option>", {value: customer.id, text: `Id: ${customer.id} - ${customer.firstName} ${customer.lastName}`}));
  });
  
  $(paramResponseCustomer).each(function(bI, customer) {
    vModalSelectCustomer.append($("<option>", {value: customer.id, text: `Id: ${customer.id} - ${customer.firstName} ${customer.lastName}`}));
  });
}

function getDataPayment(paramPayment) {
  paramPayment.checkNumber = $("#inp-check-number").val();
  paramPayment.paymentDate = $("#inp-payment-date").val();
  paramPayment.amount = $("#inp-ammount").val();
}

function loadDataToForm(paramPayment) {
  $("#modal-select-customer").val(paramPayment.idCustomer);
  $("#inp-check-number").val(paramPayment.checkNumber);
  $("#inp-payment-date").val(paramPayment.paymentDate);
  $("#inp-ammount").val(paramPayment.amount);
}
function callApiCreatePayment(paramCustomerId, paramPayment) {
  if (paramCustomerId !== "0") {
    $.ajax({
      url: gURL + `/${paramCustomerId}`,
      type: "POST",
      data: JSON.stringify(paramPayment),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        showAlert("success", "Create Payment complete!", 3000);
        loadDataPaymentToTable();
        restForm();
      },
      error: function (errors) {
        if (errors.status === 400) {
          showAlert("error", JSON.parse(errors.responseText).errors, 3000);
        }
        else {
          showAlert("error", errors.responseText, 2000);
        }
      }
    });
  }
  else {
    showAlert("error", "Select Customer", 2000);
  }
}

function callApiUpdatePayment(paramId, paramPayment) {
  $.ajax({
    url: gURL + `/${paramId}`,
    type: "PUT",
    data: JSON.stringify(paramPayment),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      showAlert("success", "Update Payment complete!", 3000);
      loadDataPaymentToTable();
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

function callApiDeletePayment(paramPayment) {
  Swal.fire({
    title: 'Are you sure?',
    html: `<p class="text-black">You won't be able to revert payment ${paramPayment.checkNumber}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: gURL + `/${paramPayment.id}`,
        type: "DELETE",
        success: function () {
          showAlert("success", "Delete All Voucher complete!", 3000);
          loadDataPaymentToTable();
        }
      });
    }
  });
}

function getDate() {
  var date = moment().format("YYYY-MM-DD");
  return date;
}

function getIdDataFromButton(paramIcon) {
  var vTableRow = $(paramIcon).parents("tr");
  var vPaymentRowData = gPaymentTable.row(vTableRow).data();
  return vPaymentRowData;
}

function showAlert(status, message, timer) {
  Swal.fire({
    icon: status,
    html: `<p class="text-black">${message}`,
    showConfirmButton: false,
    timer: timer
  })
}

function restForm() {
  gFormMode = gFORM_MODE_NORMAL;

  $("#modal-select-customer").val("0");
  $("#inp-check-number").val("");
  $("#inp-payment-date").val("");
  $("#inp-ammount").val("");
  $('#modal-payment').modal('hide');
}
