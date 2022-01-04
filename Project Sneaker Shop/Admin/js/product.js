
"use strict";
// Region 1: Globle variables
const gURL = "http://localhost:8080/products";
const gURL_PRODUCT_LINE = "http://localhost:8080/product-lines";
const gURL_PRODUCT_IMG = "http://localhost:8080/images";
const gURL_RATING = "http://localhost:8080/rating/review";
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
// Biến mảng hằng số chứa danh sách tên các thuộc tính bảng product
const gCOL_PRODUCT = ["stt", "productCode", "productName", "productDescription", "productImgs", "productVendor", "quantityInStock", "buyPrice", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_STT = 0;
const gCOL_PRODUCT_CODE = 1;
const gCOL_PRODUCT_NAME = 2;
const gCOL_DESCRIPTION = 3;
const gCOL_PRODUCT_IMG = 4;
const gCOL_PRODUCT_VENDOR = 5;
const gCOL_QUANTITY_IN_STOCK = 6;
const gCOL_BUY_PRICE = 7;
const gCOL_ACTION = 8;

//khai báo Datatable & mapping columns
var gProductTable = $("#product-table").DataTable({
    columns: [
        { data: gCOL_PRODUCT[gCOL_STT] },
        { data: gCOL_PRODUCT[gCOL_PRODUCT_CODE] },
        { data: gCOL_PRODUCT[gCOL_PRODUCT_NAME] },
        { data: gCOL_PRODUCT[gCOL_DESCRIPTION] },
        { data: gCOL_PRODUCT[gCOL_PRODUCT_IMG] },
        { data: gCOL_PRODUCT[gCOL_PRODUCT_VENDOR] },
        { data: gCOL_PRODUCT[gCOL_QUANTITY_IN_STOCK] },
        { data: gCOL_PRODUCT[gCOL_BUY_PRICE] },
        { data: gCOL_PRODUCT[gCOL_ACTION] },
    ],
    columnDefs: [
        {
            targets: gCOL_STT,
            render: function () {
                return gSTT++;
            }
        },
        {
            targets: gCOL_PRODUCT_IMG,
            render: function (data) {
                return `<div class="try"><img src="/${data[data.length - 1].url}" class="img-thumbnail toggle btn-image"></img>`;
            }
        },
        {
            targets: gCOL_BUY_PRICE,
            render: function (data) {
                return convertMoney(data);
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="far fa-lg fa-edit text-success btn-edit"></i> | <i class="fas fa-lg fa-cloud-upload-alt text-primary btn-upload"></i> 
                | <i class="fas fas fa-lg fa-star text-warning btn-show-rating"></i>
                <i class="fas fa-lg fa-trash-alt text-danger btn-delete"></i>`,
        },
    ],
});

// bảng hình ảnh sản phẩm
// Biến mảng hằng số chứa danh sách tên các thuộc tính bảng images product
const gCOL_IMAGE_PRODUCT = ["idProduct","productName", "url", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_IMAGE_STT = 0;
const gCOL_IMAGE_PRODUCTNAME = 1;
const gCOL_PRODUCT_IMAGE = 2;
const gCOL_DETAIL = 3;

//khai báo Datatable & mapping columns
var gImageProductTable = $("#table-image").DataTable({
    columns: [
        { data: gCOL_IMAGE_PRODUCT[gCOL_IMAGE_STT] },
        { data: gCOL_IMAGE_PRODUCT[gCOL_IMAGE_PRODUCTNAME] },
        { data: gCOL_IMAGE_PRODUCT[gCOL_PRODUCT_IMAGE] },
        { data: gCOL_IMAGE_PRODUCT[gCOL_DETAIL] },
    ],
    columnDefs: [
        {
            targets: gCOL_IMAGE_STT,
            render: function () {
                return gSTT++;
            }
        },
        {
            targets: gCOL_PRODUCT_IMAGE,
            render: function (data) {
                return `<div class="try"><img src="/${data}" class="img-thumbnail toggle btn-image"></img>`;
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="fas fa-lg fa-trash-alt text-danger btn-delete-image"></i>`,
        },
    ],
});

// bảng hình ảnh sản phẩm
// Biến mảng hằng số chứa danh sách tên các thuộc tính bảng rating product
const gCOL_RATING_PRODUCT = ["ordersDetail.userName","createdAt", "rating", "review", "action"];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOL_RATING_USERNAME = 0;
const gCOL_RATING_CREATE_DATE = 1;
const gCOL_RATING = 2;
const gCOL_REVIEW = 3;
const gCOL_RATING_ACTION = 4;

//khai báo Datatable & mapping columns
var gRatingProductTable = $("#table-rating").DataTable({
    columns: [
        { data: gCOL_RATING_PRODUCT[gCOL_RATING_USERNAME] },
        { data: gCOL_RATING_PRODUCT[gCOL_RATING_CREATE_DATE] },
        { data: gCOL_RATING_PRODUCT[gCOL_RATING] },
        { data: gCOL_RATING_PRODUCT[gCOL_REVIEW] },
        { data: gCOL_RATING_PRODUCT[gCOL_RATING_ACTION] },
    ],
    columnDefs: [
        {
            targets: gCOL_RATING_CREATE_DATE,
            render: function (date) {
                return formatDate(date);
            }
        },
        {
            targets: gCOL_RATING,
            render: function (rating) {
                return formatRating(rating);
            }
        },
        {
            targets: -1,
            defaultContent: `<i class="fas fa-lg fa-trash-alt text-danger btn-delete-rating"></i>`,
        },
    ],
});

// Region 2: event execute element
onPageLoading();

$("#btn-add-product").click(onBtnCreateProduct);

$("#btn-save").click(onBtnSaveData);

$("#btn-save-image").click(onBtnComfirmUploadImage);

$("#product-table").on("click", ".btn-edit", function () {
    onBtnEditProduct(this);
});

$("#product-table").on("click", ".btn-upload", function () {
    onBtnUploadImageProduct(this);
});

$("#product-table").on("click", ".btn-delete", function () {
    onBtnDeleteProduct(this);
});

$("#product-table").on("click", ".btn-image", function () {
    onBtnShowImageProduct(this);
});

$("#table-image").on("click", ".btn-delete-image", function () {
    onBtnDeleteImageProduct(this);
});

$("body").on("click", ".btn-show-rating", function () {
    onBtnShowRatingReview(this);
});

$("#table-rating").on("click", ".btn-delete-rating", function () {
    onBtnDeleteRatingProduct(this);
});

$('#modal-product').on('hidden.bs.modal', function (e) {
    restFormProduct();
});
$('#modal-image-product').on('hidden.bs.modal', function (e) {
    restFormProductImage();
});

$('body').on(".toggle", function () {
    $("body .inner").animate({ top: '-=100px' }, 2000);
}, function () {
    $("body .inner").animate({ top: '+=100px' }, 2000);
});

// Region 3: Event handlers
function onPageLoading() {
    loadDataProductToTable();
    callApiGetDataProductLine();
}
// xử lý sự kiện click thêm sản phẩm
function onBtnCreateProduct() {
    gFormMode = gFORM_MODE_INSERT;

    $("#modal-product").modal().show();

}
// sử lý sự kiện click sửa sản phẩm
function onBtnEditProduct(paramIconEdit) {
    gFormMode = gFORM_MODE_UPDATE;
    var vProductData = getIdDataFromButton(gProductTable ,paramIconEdit);
    gId = vProductData.id;
    loadDataToFormProduct(vProductData);
    
    $("#modal-product").modal().show();
}
// show image to modal
function onBtnShowImageProduct(paramImage) {
    var vProductData = getIdDataFromButton(gProductTable ,paramImage);
    gId = vProductData.id;
    callApiGetListImageProduct(vProductData.id);

    $("#modal-show-image-product").modal().show();
}

// sử lý upload ảnh sản phẩm
function onBtnUploadImageProduct(paramIconUpload) {
    var vProductData = getIdDataFromButton(gProductTable ,paramIconUpload);
    loadDataProductToFormImage(vProductData);

    $("#modal-image-product").modal("show");
}

// xử lý xoá sản phẩm
function onBtnDeleteProduct(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vProductData = getIdDataFromButton(gProductTable ,paramIconDelete);
    callApiDeleteProduct(vProductData);
}

//xử lý xóa ảnh sản phẩm
function onBtnDeleteImageProduct(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vImageProductData = getIdDataFromButton(gImageProductTable ,paramIconDelete);
    console.log(vImageProductData.id)
    callApiDeleteImageProductById(vImageProductData.id);
}
// xử lý lưu thông tin sản phẩm
function onBtnSaveData() {
    var vProduct = {
        productCode: "",
        productName: "",
        productDescription: "",
        productSize: "",
        productColor: "",
        productVendor: "",
        quantityInStock: "",
        buyPrice: ""
    }
    var vProductLineId = $("#select-product-line").val();
    getDataProduct(vProduct);
    if (gFormMode === gFORM_MODE_INSERT) {
        callApiCreateProduct(vProductLineId, vProduct);
    }
    else if (gFormMode === gFORM_MODE_UPDATE) {
        callApiUpdateProduct(gId, vProduct);
    }

}

// xử lý xác nhận thêm ảnh mới
function onBtnComfirmUploadImage() {
    var vProductId = $(".btn-save-image").attr("id");
    // console.log(vProductId);
    var images = document.getElementById('image-file').files.length;
    var vFormData = new FormData();
    for (let index = 0; index < images; index++) {
        vFormData.append("images", document.getElementById('image-file').files[index])

    }

    $.ajax({
        url: gURL_PRODUCT_IMG + `/uploadMultiple/${vProductId}`,
        type: 'POST',
        data: vFormData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            showAlert("success", "Hoàn thành", 3000);
            restFormProductImage();
        }
    });
}

// show rating product
function onBtnShowRatingReview(paramIconRating) {
    var vProductData = getIdDataFromButton(gProductTable ,paramIconRating);
    callApiGetListRating(vProductData.id);
    $("#modal-show-review-product").modal("show");
}

// goi Api xoá rating
function onBtnDeleteRatingProduct(paramIconDelete) {
    gFormMode = gFORM_MODE_DELETE;
    var vRatingProductData = getIdDataFromButton(gRatingProductTable ,paramIconDelete);
    callApiDeleteratingProductById(vRatingProductData.id);
}

// Region 4: Common function
// gọi Api lấy dữ liệu tất cả sản phẩm
function loadDataProductToTable() {
    $.ajax({
        url: gURL,
        method: "GET",
        dataType: "json",
        success: getProductList,
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

function callApiGetListImageProduct(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT_IMG + `/${paramProductId}`,
        method: "GET",
        dataType: "json",
        success: showImageProduct,
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

// hiển thị dữ liệu ra bảng
function getProductList(responseText) {
    gSTT = 1;
    gProductTable.clear();
    gProductTable.rows.add(responseText);
    gProductTable.draw();
}

// hiẻn thi ảnh sản phẩm ra bảng
function showImageProduct(paramImageProduct) {
    gSTT = 1;
    gImageProductTable.clear();
    gImageProductTable.rows.add(paramImageProduct);
    gImageProductTable.draw();
}

// oi Api lấy dữ liệu dòng sản phẩm
function callApiGetDataProductLine() {
    $.ajax({
        url: gURL_PRODUCT_LINE,
        method: "GET",
        dataType: "json",
        success: handleDateProductLine,
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

// hiển thị dữ liệu lên select
function handleDateProductLine(paramResponseProductLine) {
    var vSelectProductLine = $("#select-product-line");
    $(paramResponseProductLine).each(function (bI, productLine) {
        vSelectProductLine.append($("<option>", { value: productLine.id, text: `Id: ${productLine.id} - ${productLine.productLine}` }));
    });
}

// thu thập dữ liệu sản phẩm
function getDataProduct(paramProduct) {
    paramProduct.productCode = $("#inp-product-code").val();
    paramProduct.productName = $("#inp-product-name").val();
    paramProduct.productDescription = $("#inp-description").val();
    paramProduct.productColor = $("#inp-product-color").val();
    paramProduct.productScale = $("#inp-product-scale").val();
    paramProduct.productVendor = $("#inp-product-vendor").val();
    paramProduct.quantityInStock = $("#inp-quantity-in-stock").val();
    paramProduct.buyPrice = $("#inp-buy-price").val();
}

// hiển thị dữ liệu lên form chi tiết
function loadDataToFormProduct(paramProduct) {
    $("#select-product-line").val(paramProduct.idProductLine);
    $("#inp-product-code").val(paramProduct.productCode);
    $("#inp-product-name").val(paramProduct.productName);
    $("#inp-description").val(paramProduct.productDescription);
    $("#inp-product-color").val(paramProduct.productColor);
    $("#inp-product-vendor").val(paramProduct.productVendor);
    $("#inp-quantity-in-stock").val(paramProduct.quantityInStock);
    $("#inp-buy-price").val(paramProduct.buyPrice);

}

// hiển thị dữ liệu lên form ảnh
function loadDataProductToFormImage(paramProduct) {
    $("#product-code").val(paramProduct.productCode);
    $("#product-name").val(paramProduct.productName);
    $(".btn-save-image").attr("id", paramProduct.id);
}

// gọi Api tạo mới sản phẩm
function callApiCreateProduct(paramProductLineId, paramProduct) {
    if ($("#select-product-line").val() !== "0") {
        $.ajax({
            url: gURL + `/product-line/${paramProductLineId}`,
            type: "POST",
            data: JSON.stringify(paramProduct),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                showAlert("success", "Thêm mới thành công!", 3000);
                loadDataProductToTable();
                restFormProduct();
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
    else {
        showAlert("error", "Hãy chọn dòng sản phẩm", 3000);
    }
}

//goi Api update sản phẩm
function callApiUpdateProduct(paramId, paramProduct) {
    $.ajax({
        url: gURL + "/" + paramId,
        type: "PUT",
        data: JSON.stringify(paramProduct),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Chỉnh sửa thành công!", 3000);
            loadDataProductToTable();
            restFormProduct();
        },
        error: function (errors) {
            // console.log(JSON.parse(errors.responseText));
            if (errors.status === 400 && errors.responseText !== undefined) {
                showAlert("error", JSON.parse(errors.responseText).errors, 3000);
            }
            else {
                showAlert("error", errors.responseText, 3000);
            }
        }
    });
}

// goi Api xoá sản phẩm
function callApiDeleteProduct(paramProduct) {
    Swal.fire({
        title: 'Are you sure?',
        html: `<p class="text-black">Bạn có muốn xóa sản phẩm ${paramProduct.productName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL + `/${paramProduct.id}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xoá!", 3000);
                    loadDataProductToTable();
                }
            });
        }
    });
}

// goi Api xóa ảnh sản phẩm
function callApiDeleteImageProductById(paramImageProductId) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Bạn có muốn xóa ảnh này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL_PRODUCT_IMG + `/deleteImageProduct/${paramImageProductId}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xóa!", 3000);
                    loadDataProductToTable();
                }
            });
        }
    }); 
}

// gọi Api lấy danh sách rating sản phẩm
function callApiGetListRating(paramProductId) {
    $.ajax({
        url: gURL_RATING + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        success: function (responseRating) {
            showRatingToTable(responseRating);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// Goi Api xoá rating product
function callApiDeleteratingProductById(paramRatingId) {
    Swal.fire({
        title: 'Xác nhận?',
        html: `<p class="text-black">Bạn có muốn xóa đánh giá này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: gURL_RATING + `/delete/${paramRatingId}`,
                type: "DELETE",
                success: function () {
                    showAlert("success", "Đã xóa!", 3000);
                    loadDataProductToTable();
                    $("#modal-show-review-product").modal("hide");
                }
            });
        }
    }); 
}

// lấy thông tin sản phẩn trên row
function getIdDataFromButton(paramTable,paramIcon) {
    var vTableRow = $(paramIcon).parents("tr");
    var vProductRowData = paramTable.row(vTableRow).data();
    return vProductRowData;
}

// hiển thị đánh giá lên bảng
function showRatingToTable(paramRating) {
    gSTT = 1;
    gRatingProductTable.clear();
    gRatingProductTable.rows.add(paramRating);
    gRatingProductTable.draw();
}

// hiển thị đánh giá bằng sao
function formatRating(paramRating) {
    if (paramRating == 1) {
        return `<div>
            <i class="fas fa-star text-warning"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>`
    }
    if (paramRating == 2) {
        return `<div>
             <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>`
    }
    if (paramRating == 3) {
        return `<div>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>`
    }
    if (paramRating == 4) {
        return `<div>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="far fa-star"></i>
        </div>`
    }
    if (paramRating == 5) {
        return `<div>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
            <i class="fas fa-star text-warning"></i>
        </div>`
    }
}

function showAlert(status, message, timer) {
    Swal.fire({
        icon: status,
        html: `<p class="text-black">${message}`,
        showConfirmButton: false,
        timer: timer
    });
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// định dạng ngày
function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD - HH:mm");
    return date;
}

//reset form 
function restFormProduct() {
    gFormMode = gFORM_MODE_NORMAL;
    $("#select-product-line").val("0");
    $("#inp-product-code").val("");
    $("#inp-product-name").val("");
    $("#inp-description").val("");
    $("#inp-product-color").val("");
    $("#inp-product-scale").val("");
    $("#inp-product-vendor").val("");
    $("#inp-quantity-in-stock").val("");
    $("#inp-buy-price").val("");

    $('#modal-product').modal('hide');
}

//reset form
function restFormProductImage() {
    gFormMode = gFORM_MODE_NORMAL;
    $("#product-code").val("");
    $("#product-name").val("");
    $("#image-file").val("");

    $("#modal-image-product").modal("hide");
}
