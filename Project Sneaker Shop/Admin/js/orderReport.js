// Region 1: Global variables
$('#reservation').daterangepicker();
const gURL_ORDER = "http://localhost:8080/orders";
var gData = [];
var options = {
    animationEnabled: true,
    title: {
        text: "Tổng tiền đơn hàng",
        fontFamily: "Verdana,sans-serif",
    },
    data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "spline",
            dataPoints: gData
        }
    ]
};
var gDate = {
    startDate: "",
    finnalDate: ""
}

// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gCOL = ["label", "y"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_TIME = 0;
const gCOL_TOTAL_MONEY = 1;

//khai báo bảng tổng tiền
var gTotalMoneyTable = $("#total-money-table").DataTable({
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print"],
    columns: [
        { data: gCOL[gCOL_TIME] },
        { data: gCOL[gCOL_TOTAL_MONEY], 
            render: function(money) {
                return convertMoney(money);
            }
        }
    ],
});
// Region 2:  Event execute element
onPageLoading();

$("body").on("click", ".applyBtn", onBtnFilterDate);

$('input[type=radio][name=r1]').change(function() {
    onBtnFilterDate();
});
// Region 3: Event handlers
function onPageLoading() {
    // callApiTotalMoneyByOrder();
}
// hàm lọc theo ngày
function onBtnFilterDate() {
    getDataDate(gDate);
    callApiFilterOrderDate(gDate);
    $('input[type=radio][name=r1]').change(function() {
        if (this.value == 'day') {
            callApiFilterOrderDate(gDate);
        }
        else if (this.value == 'week') {
            onBtnFilterWeek();
        }
        else if (this.value == 'month'){
            onBtnFilterMonth();
        }
    });
}
// lọc thie tuần
function onBtnFilterWeek() {
    getDataDate(gDate);
    callApiFilterOrderWeek(gDate);
}
// lọc theo tháng
function onBtnFilterMonth() {
    getDataDate(gDate);
    callApiFilterOrderMonth(gDate);
}
// xuất ra excel
function onBtnExportExcel() {
    $("#modal-order").modal('show')
}
// Region 4: Common funtion
// hiển thị data báo cáo ra bảng
function loadDataToTable(paramResponse) {
    gTotalMoneyTable.clear();
    gTotalMoneyTable.rows.add(paramResponse);
    gTotalMoneyTable.draw();
    gTotalMoneyTable.buttons().container().appendTo('#total-money-table_wrapper .col-md-6:eq(0)');
}
// Goi Api lấy tổng order
function callApiTotalMoneyByOrder() {
    $.ajax({
        url: gURL_ORDER + `/totalOrder`,
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
// thu thập data ngày
function getDataDate(paramDate) {
    var splitted = $("#reservation").val().split(" ", 3);
    paramDate.startDate = getDate(splitted[0]);
    paramDate.finnalDate = getDate(splitted[2])
}
// định dạng ngày
function getDate(date) {
    var vDate = moment(date).format("YYYY-MM-DD");
    return vDate;
}
// call Api lọc order theo ngày
function callApiFilterOrderDate(paramDate) {
    $.ajax({
        url: gURL_ORDER + `/${paramDate.startDate}/${paramDate.finnalDate}`,
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
// call Api lọc order theo tuần
function callApiFilterOrderWeek(paramDate) {
    $.ajax({
        url: gURL_ORDER + `/week/${paramDate.startDate}/${paramDate.finnalDate}`,
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
// call Api lọc order theo tháng
function callApiFilterOrderMonth(paramDate) {
    $.ajax({
        url: gURL_ORDER + `/month/${paramDate.startDate}/${paramDate.finnalDate}`,
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
// xử lý data và hiển thị lên biểu đồ
function handleRespon(paramRespon) {
    gData.splice(0, gData.length);
    $(paramRespon).each(function (bI, data) {
        const map = new Map([['label', data[0]], ['y', data[1]]]);
        const obj = Object.fromEntries(map);
        gData.push(obj)
    });
    $("#chartContainer").CanvasJSChart(options);
    loadDataToTable(gData);
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}