"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_PRODUCT = "http://localhost:8080/products";
const gURL_IMG = "http://localhost:8080/images";
const gURL_RATING = "http://localhost:8080/rating/review";

var gRating = "";
var gOrderDetailId = "";
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    onPageLoading();

    $("body").on("click", ".btn-repurchase", function () {
        onBtnRepurchase(this);
    });
    $("body").on("click", ".btn-rating", function () {
        onBtnRatingReview(this);
    });
    $("body").on("click", ".btn-show-rating", function () {
        onBtnShowRatingReview(this);
    });
    $("body").on("click", "#btn-send-review", function () {
        onBtnSendRatingReview();
    });
    $("body").on("click", "#btn-edit-review", function () {
        onBtnEditRatingReview(this);
    });
    $('#modal-review-product').on('hidden.bs.modal', function (e) {
        restFormRatingReview();
    });
    $('#modal-show-review-product').on('hidden.bs.modal', function (e) {
        restFormShowRatingReview();
    });
    $("body").on("click", ".btn-go-shop", function () {
        onBtnToShopProduct();
    });
    clickRatingReview('#stars');
    clickRatingReview('#show-stars');
});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    getCustomerIdUrl();
}

// hàm xử lý khi ấn nút chi tiết
function onBtnRepurchase(paramButtom) {
    var vProductId = $(paramButtom).attr("id");
    var vUrlProductDetail = "product-detail.html"
    window.location.href = vUrlProductDetail + `?id=${vProductId}`;
}
// hàm xử lý đánh giá sản phẩm đã mua
function onBtnRatingReview(paramButtom) {
    var vProductId = $(paramButtom).attr("data");
    gOrderDetailId = $(paramButtom).attr("id");
    callApiGetProductById(vProductId);
    $("#modal-review-product").modal("show");
}

// hàm xem đánh giá sản phẩm
function onBtnShowRatingReview(paramButtom) {
    $(".review-product").show(300);
    var vProductId = $(paramButtom).attr("data");
    gOrderDetailId = $(paramButtom).attr("id");
    callApiGetProductById(vProductId);
    callApiGetRatingReviewOrderdetail(gOrderDetailId);
    $("#modal-show-review-product").modal("show");
}

// hàm gửi đánh giá sản phẩm
function onBtnSendRatingReview() {
    var vRatingReview = {
        rating: "",
        review: ""
    }
    getDataRatingAndReview(vRatingReview);
    if (!vRatingReview.rating) {
        showAlert("error", "Bạn chưa đánh giá sản phẩm", 3000);
    }
    else {
        callApiCreateRatingAndReview(vRatingReview, gOrderDetailId);
    }
}

// hàm sửa đánh giá sản phẩm
function onBtnEditRatingReview(paramButon) {
    var vRatingReviewId = $(paramButon).attr("data");
    var vRatingReview = {
        rating: "",
        review: ""
    }
    getDataRatingAndReview(vRatingReview);
    if (!vRatingReview.rating) {
        showAlert("error", "Bạn chưa đánh giá sản phẩm", 3000);
    }
    else {
        callApiUpdateRatingAndReview(vRatingReview, vRatingReviewId);
    }
}

// đi đến trang cửa hàng
// chuyển về trang shop
function onBtnToShopProduct() {
    window.location.href = "shop.html";
}

/*** REGION 4 - Common funtions - Vùng khais báo hàm dùng chung trong toàn bộ chương trình*/
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// hàm lấy thông tin id trên đường dẫn
function getCustomerIdUrl() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vCustomerId = vUrlParams.get('customerId');
    callApiGetDataOrderByCustomer(vCustomerId);
}

//hàm goi Api lấy thông tin chi tiết sản phẩm theo Id
function callApiGetDataOrderByCustomer(parmCustomerId) {
    $.ajax({
        url: gURL_PRODUCT + `/customerId/${parmCustomerId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleDataRespon(response);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// xử lý data trả về hiển thị lên giao diện
function handleDataRespon(paramResponOrder) {
    var vListProduct = $(".list-product-order");
    if (paramResponOrder.length == 0) {
        vListProduct.empty();
        vListProduct.append(`
            <div class="product-order my-3 mx-2">
                <div class="row">
                    <h4 class="text-danger mx-2"> Bạn chưa có đơn hàng nào</h4>
                </div>
                <div class="row mt-3 mx-2">
                    <button class="btn btn-outline-success btn-go-shop">Đi đến cửa hàng</button>
                </div>
            </div>
        `)
    }
    else {
        vListProduct.empty();
        paramResponOrder.forEach(orderDetail => {
            var vCheckRating = callApiCheckRatingReviewOrderdetail(orderDetail.orderDetailId);
            if (!vCheckRating) {
                vListProduct.append(`
                <div class="product-order shadow my-3 border">
                    <div class="row border-bottom mx-2">
                        <div class="col my-2 img-product">
                            <img src=${orderDetail.image} alt="" class="img-thumbnail img-product" width="80%">
                        </div>
                        <div class="col-7">
                            <h4>${orderDetail.productName}</h4>
                            <span>Ngày mua: ${formatDate(orderDetail.orderDate)}</span><br>
                            <span>x${orderDetail.count}</span>
                        </div>
                        <div class="col align-self-center d-flex justify-content-end">
                            <h5>${convertMoney(orderDetail.price)}</h5>
                        </div>
                    </div>
                    <div class="row mx-2 mt-2">
                        <div class="col">
                            <div class="row">
                                <div class="col mb-2">
                                    <button class="btn btn-outline-success w3-hover-shadow btn-repurchase w-100"
                                        id=${orderDetail.productId}>Mua lại</button>
                                </div>
                                <div class="col mb-2">
                                    <button class="btn btn-outline-danger w3-hover-shadow btn-rating w-100 mx-2" 
                                        id=${orderDetail.orderDetailId} data=${orderDetail.productId}>Đánh giá ngay</button>
                                </div>
                            </div>
                        </div>
                        <div class="col align-self-center d-flex justify-content-end">
                            <a class="mx-4 mt-2 pt-1">Tổng số tiền: </a>
                            <h3 class="text-danger">${convertMoney(orderDetail.count * orderDetail.price)}</h3>
                        </div>
                    </div>
                </div>
            `);
            }
            else {
                vListProduct.append(`
                <div class="product-order shadow my-3 border">
                    <div class="row border-bottom mx-2">
                        <div class="col my-2 img-product">
                            <img src=${orderDetail.image} alt="" class="img-thumbnail" width="80%">
                        </div>
                        <div class="col-7">
                            <h4>${orderDetail.productName}</h4>
                            <span>Ngày mua: ${formatDate(orderDetail.orderDate)}</span><br>
                            <span>x${orderDetail.count}</span>
                        </div>
                        <div class="col align-self-center d-flex justify-content-end">
                            <h5>${convertMoney(orderDetail.price)}</h5>
                        </div>
                    </div>
                    <div class="row mx-2 mt-2">
                        <div class="col">
                            <div class="row">
                                <div class="col mb-2">
                                    <button class="btn btn-outline-success w3-hover-shadow btn-repurchase w-100"
                                        id=${orderDetail.productId}>Mua lại</button>
                                </div>
                                <div class="col mb-2">
                                    <button class="btn btn-outline-danger w3-hover-shadow btn-show-rating w-100 mx-2"
                                        id=${orderDetail.orderDetailId} data=${orderDetail.productId}>Xem đánh giá</button>
                                </div>
                            </div>
                        </div>
                        <div class="col align-self-center d-flex justify-content-end">
                            <a class="mx-4 mt-2 pt-1">Tổng số tiền: </a>
                            <h3 class="text-danger">${convertMoney(orderDetail.count * orderDetail.price)}</h3>
                        </div>
                    </div>
                </div>
            `);
            }
        });
    }
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// goi Api lấy thông tin đánh giá sản phẩm
function callApiCheckRatingReviewOrderdetail(paramOrderDetailId) {
    var vCheck = true;
    $.ajax({
        url: gURL_RATING + `/orderdetail/${paramOrderDetailId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            vCheck = true;
        },
        error: function (error) {
            vCheck = false;
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
    return vCheck;
}

function callApiGetRatingReviewOrderdetail(paramOrderDetailId) {
    $.ajax({
        url: gURL_RATING + `/orderdetail/${paramOrderDetailId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            showRatingProduct(response);
        },
        error: function (error) {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị đánh giá lên modal
function showRatingProduct(paramRatingReview) {
    $("#btn-edit-review").attr("data", paramRatingReview.id);
    var vRating = paramRatingReview.rating;
    var vShowRating = $("#show-stars");
    var vShowReview = $("#edit-message-product");
    if (paramRatingReview.review) {
        vShowReview.val(paramRatingReview.review);
    }
    else {
        vShowReview.attr("placeholder", "Chưa có nhận xét sản phẩm");
    }
    switch (vRating) {
        case 1:
            vShowRating.find("li").first().addClass('selected');
            break;
        case 2:
            vShowRating.find("li").first().addClass('selected');
            vShowRating.find("li").eq(1).addClass('selected');
            break;
        case 3:
            vShowRating.find("li").first().addClass('selected');
            vShowRating.find("li").eq(1).addClass('selected');
            vShowRating.find("li").eq(2).addClass('selected');
            break;
        case 4:
            vShowRating.find("li").first().addClass('selected');
            vShowRating.find("li").eq(1).addClass('selected');
            vShowRating.find("li").eq(2).addClass('selected');
            vShowRating.find("li").eq(3).addClass('selected');
            break;
        case 5:
            vShowRating.find("li").addClass('selected');
            break;
    }
}

// goi APi lấy thông tin sản phẩm
function callApiGetProductById(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            showProductToModalRating(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị thông sản phẩm lên modal rating
function showProductToModalRating(paramResponProduct) {
    $(".product-detail").empty();
    $(".product-detail").append(`
        <img src=${paramResponProduct.productImgs[0].url} alt="" width="10%">
        <b class="ms-2">${paramResponProduct.productName}</b>
    `);
}

// gọi Api tạo đánh giá sản phẩm
function callApiCreateRatingAndReview(paramRatingAndReview) {
    $.ajax({
        url: gURL_RATING + `/create/${gOrderDetailId}`,
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", getCookie("token"));
        },
        data: JSON.stringify(paramRatingAndReview),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cảm ơn bạn đã gửi đánh giá", 3000);
            restFormRatingReview();
            $("#modal-review-product").modal("hide");
            getCustomerIdUrl();
        },
        error: function (errors) {
            console.log(errors.responseText)
        }
    });
}

//  update rating review
function callApiUpdateRatingAndReview(paramRatingAndReview, paramRatingReviewId) {
    $.ajax({
        url: gURL_RATING + `/update/${paramRatingReviewId}`,
        type: "PUT",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", getCookie("token"));
        },
        data: JSON.stringify(paramRatingAndReview),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showAlert("success", "Cảm ơn bạn đã gửi đánh giá", 3000);
            restFormShowRatingReview();
            $("#modal-show-review-product").modal("hide");
            getCustomerIdUrl();
        },
        error: function (errors) {
            console.log(errors.responseText)
        }
    });
}

// định dạng ngày
function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD");
    return date;
}

// thu thập thông tin rating review
function getDataRatingAndReview(paramRatingReview) {
    paramRatingReview.rating = gRating;
    if ($("#create-message-product").val() != "") {
        paramRatingReview.review = $("#create-message-product").val().trim();
    }
    if ($("#edit-message-product").val() != "") {
        paramRatingReview.review = $("#edit-message-product").val().trim();
    }
}

// clean form rating àn review
function restFormRatingReview() {
    gOrderDetailId = "";
    gRating = "";
    $('#stars li').removeClass('selected');
    $(".review-product").hide(300);
    $("#create-message-product").val("");
}

// clean form show rating review
function restFormShowRatingReview() {
    gOrderDetailId = "";
    gRating = "";
    $('#show-stars li').removeClass('selected');
    $("#edit-message-product").val("");
    $(".review-product").hide(300);
}

// click rating review
function clickRatingReview(select) {
    /* 1. Visualizing things on Hover - See next part for action on click */
    $(select).find('li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });


    /* 2. Action to perform on click */
    $(select).find('li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (let i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (let i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($(select).find('li.selected').last().data('value'), 10);
        switch (ratingValue) {
            case 1:
                $("#create-message-product").attr("placeholder", "Hãy chia sẻ vì sao sản phẩm này không tốt nhé");
                break;
            case 2:
                $("#create-message-product").attr("placeholder", "Hãy chia sẻ vì sao bạn không thích sản phẩm này nhé");
                break;
            case 3:
                $("#create-message-product").attr("placeholder", "Hãy chia sẻ vì sao bạn chưa thực sự thích sản phẩm này nhé");
                break;
            case 4:
                $("#create-message-product").attr("placeholder", "Hãy chia sẻ vì sao bạn thích sản phẩm này nhé");
                break;
            case 5:
                $("#create-message-product").attr("placeholder", "Hãy chia sẻ những điều bạn thấy sản phẩm này rất tốt nhé");
                break;

        }
        gRating = parseInt($(select).find('li.selected').last().data('value'), 10);
        $(".review-product").show(300);
    });

}

function showAlert(status, message, timer) {
    Swal.fire({
        icon: status,
        html: `<p class="text-black">${message}`,
        showConfirmButton: false,
        timer: timer
    });
}

