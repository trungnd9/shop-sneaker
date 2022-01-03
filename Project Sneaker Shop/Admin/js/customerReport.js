// Region 1: Global variables
const gURL_CUSTOMER = "http://localhost:8080/customers"
gDataSumMomey = [];
gDataSumOrder = [];
gData = [];
// khai báo bar chart tính tổng tiền
var optionsMoney = {
    title: {
        text: "Tổng tiền khách hàng",
        fontFamily: "Verdana,sans-serif",
    },
    animationEnabled: true,
    data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: gDataSumMomey
        }
    ]
};
// khai báo bar chart tính tổng order
var optionsOrder = {
    title: {
        text: "Tổng đơn hàng",
        fontFamily: "Verdana,sans-serif",
    },
    animationEnabled: true,
    data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: gDataSumOrder
        }
    ]
};

// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gCOL_CUSTOMER = ["name", "orderNumer", "totalMoney"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_NAME = 0;
const gCOL_ORDERNUMER = 1;
const gCOL_TOTALMONEY = 2;

//khai báo Datatable & mapping columns
var gCustomersTable = $("#customers-table").DataTable({
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print"],
    columns: [
        { data: gCOL_CUSTOMER[gCOL_NAME] },
        { data: gCOL_CUSTOMER[gCOL_ORDERNUMER] },
        { data: gCOL_CUSTOMER[gCOL_TOTALMONEY],
            render: function(money) {
                return convertMoney(money);
            }
        }
    ],
});
// Region 2:  Event execute element
$(document).ready(function () {
    onPageLoading();
});
// Region 3: Event handlers
function onPageLoading() {
    // callApiSumTotalMoney();
}

// hàm lọc customer theo tổng tiền mua
function onBtnSelectCustomer() {
    var vTotalMoney = $("#select-customer").val();
    callApiFilterCustomer(vTotalMoney);
}

// hàm lọc customer theo tổng order
function onBtnFilterCustomerByOrderNumber() {
    var vTotalOrder = $("#inp-totalOrder").val();
    if (vTotalOrder == "" || vTotalOrder == 0) {
        callApiSumTotalMoney();
    }
    else {
        callApiFilterOrderByTotalOrder(vTotalOrder);
    }
}

// xuat data ra excel
function onBtnExportExcel() {
    $("#modal-customer").modal('show')
}
// Region 4: Common funtion
// load data vao bảng
function loadDataToTable(paramResponse) {
    gCustomersTable.clear();
    gCustomersTable.rows.add(paramResponse);
    gCustomersTable.draw();
    gCustomersTable.buttons().container().appendTo('#customers-table_wrapper .col-md-6:eq(0)');
}

// call Api trả về tổng tiền mua của khách và tổng order
function callApiSumTotalMoney() {
    $.ajax({
        url: gURL_CUSTOMER + `/totalMoney`,
        method: "get",
        dataType: "json",
        success: function (paramDate) {
            handleRespon(paramDate);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// call Api trả lọc khách hàng theo tổng tiền mua
function callApiFilterCustomer(paramTotalMoney) {
    $.ajax({
        url: gURL_CUSTOMER + `/totalMoney/${paramTotalMoney}`,
        method: "get",
        dataType: "json",
        success: function (paramDate) {
            handleRespon(paramDate);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// call Api trả lọc khách hàng theo tổng order
function callApiFilterOrderByTotalOrder(paramTotalOrder) {
    $.ajax({
        url: gURL_CUSTOMER + `/totalOrder/${paramTotalOrder}`,
        method: "get",
        dataType: "json",
        success: function (paramDate) {
            handleRespon(paramDate);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}


// hàm xử lý các Api trả về load data lên bar chart và bảng
function handleRespon(paramRespon) {
    gDataSumMomey.splice(0, gDataSumMomey.length);
    gDataSumOrder.splice(0, gDataSumOrder.length);
    gData.splice(0, gData.length);
    $(paramRespon).each((bI, data) => {
        const map = new Map([['label', data[1]], ['y', data[3]]]);
        const obj = Object.fromEntries(map);
        gDataSumMomey.push(obj);
    });
    $(paramRespon).each((bI, data) => {
        const map = new Map([['label', data[1]], ['y', data[2]]]);
        const obj = Object.fromEntries(map);
        gDataSumOrder.push(obj);
    });
    $(paramRespon).each((bI, data) => {
        const map = new Map([['name', data[1]], ['orderNumer', data[2]], ['totalMoney', data[3]]]);
        const obj = Object.fromEntries(map);
        gData.push(obj);
    });
    $("#chartTotalMoney").CanvasJSChart(optionsMoney);
    $("#chartTotalOrder").CanvasJSChart(optionsOrder);
    loadDataToTable(gData);
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
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
