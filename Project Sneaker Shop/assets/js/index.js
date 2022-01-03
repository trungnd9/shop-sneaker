"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_PRODUCT = "http://localhost:8080/products";
const gURL_RATING = "http://localhost:8080/rating/review";
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    onPageLoading();

});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

function onPageLoading() {
    loadDataToFeatured();
    loadDataProductNew();

    $("body").on("click", ".btn-detail-product", function () {
        onBtnDetailProduct(this);
    });
}

function onBtnDetailProduct(paramButtom) {
    var vProductId = $(paramButtom).attr("id")
    var vUrlProductDetail = "product-detail.html"
    window.location.href = vUrlProductDetail + `?id=${vProductId}`;
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

//hàm gọi APi lấy data product featured
function loadDataToFeatured() {
    $.ajax({
        url: gURL_PRODUCT + "/third",
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleResponIdProductFeatured(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

function handleResponIdProductFeatured(paramResponProductFeatured) {
    var vProductFeatured = [];
    // vProductFeatured.splice(0, vProductFeatured.length);
    $(paramResponProductFeatured).each(function (bI, data) {
        const map = new Map([['productId', data[0]], ['numberOrder', data[1]]]);
        const obj = Object.fromEntries(map);
        vProductFeatured.push(obj);
    });
    $(vProductFeatured).each(function (bI, product) {
        callApiGetDataProductById(product.productId);
    });
}

function callApiGetDataProductById(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT  + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleResponProductFeatured(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

//hàm đổ data data product featured lấy được vào giao diện
function handleResponProductFeatured(paramResponProductFeatured) {
    $(paramResponProductFeatured).each(function (bI, product) {
        var vBodyFeaturedProduct = `
        <div class="col-12 col-md-4 p-5 mt-3">
            <a href="product-detail.html?id=${product.id}"><img src="${product.productImgs[0].url}" class="rounded-circle img-fluid border w3-hover-shadow"></a>
            <h5 class="text-center mt-3 mb-3">${product.productName}</h5>
            <p class="text-center"><a class="btn btn-detail-product btn-order-hot" id = ${product.id}>Mua ngay</a></p>
        </div>
        `
        $("#body-featured").append(vBodyFeaturedProduct);
    });
}

//hàm gọi API lấy data product new
function loadDataProductNew() {
    $.ajax({
        url: gURL_PRODUCT + "/new",
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleResponProductNew(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

//hàm đổ data data product new lấy được vào giao diện
function handleResponProductNew(paramResponProductNew) {
    // console.log(paramResponProductNew)
    var vDivProductNew = $("#product-new");
    vDivProductNew.empty();
    vDivProductNew.append(`
        <div class="row text-center py-3 w3-animate-bottom">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Các sản phẩm mới</h1>
                <p>
                    Cập nhật những mẫu sneaker mới nhất..! <span class="badge bg-danger">NEW!!!</span>
                </p>
            </div>
        </div>
        <div class="row w3-animate-bottom" id = "card-product-new">
    `);
    $(paramResponProductNew).each(function(bI, productNew) {
        var vCardProductNew = $("#card-product-new");
        vCardProductNew.append(`
            <div class="col-12 col-md-3">
                <div class="product-grid card h-100">
                    <div class="product-image border-bottom">
                        <a href="product-detail.html?id=${productNew.id}" class="image">
                            <img class="pic-1" src=${productNew.productImgs[Math.floor(Math.random()*productNew.productImgs.length)].url}>
                            <img class="pic-2" src=${productNew.productImgs[Math.floor(Math.random()*productNew.productImgs.length)].url}>
                        </a>
                        <span class="product-hot-label">New</span>
                        <ul class="product-links">
                            <a href="#" data-tip="Add to Wishlist">${productNew.productVendor}</a>
                        </ul>
                    </div>
                    <div class="product-content">
                        <a class="add-to-cart" href="product-detail.html?id=${productNew.id}">
                            <i class="fas fa-eye"></i>Chi tiết
                        </a>
                        <h3 class="title"><a href="product-detail.html?id=${productNew.id}">${productNew.productName}</a></h3>
                        <ul class="rating" id="${productNew.id}-product">
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                        </ul>
                        <div class="price align-bottom">${convertMoney(productNew.buyPrice)}</div>
                    </div>
                </div>
            </div>
        `);
        callApiGetListRating(productNew.id);
    });
}

// gọi Api lấy danh sách rating sản phẩm
function callApiGetListRating(paramProductId) {
    $.ajax({
        url: gURL_RATING + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        success: function (responseRating) {
            showRatingProduct(responseRating);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị rating của sản phẩm
function showRatingProduct(paramResponRating) {
    if (paramResponRating[0] != null) {
        var vSum = 0
        for (var i = 0; i < paramResponRating.length; i++) {
            vSum += parseInt(paramResponRating[i].rating, 10);
            var vAvergerRating = vSum / paramResponRating.length;
            var vProductIdRating = $(`#${paramResponRating[i].ordersDetail.idProduct}-product`);
            if (vAvergerRating == 1) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating == 2) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating == 3) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating == 4) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating == 5) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                `);
            }
            if (vAvergerRating >= 1.1 && vAvergerRating <= 1.9) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star-half-alt text-warning"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating >= 2.1 && vAvergerRating <= 2.9) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star-half-alt text-warning"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating >= 3.1 && vAvergerRating <= 3.9) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star-half-alt text-warning"></i>
                    <i class="far fa-star"></i>
                `);
            }
            if (vAvergerRating >= 4.1 && vAvergerRating <= 4.9) {
                vProductIdRating.empty();
                vProductIdRating.append(`
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star-half-alt text-warning"></i>
                `);
            }

        }
    }

}
