"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_PRODUCT = "http://localhost:8080/products";
const gURL_IMG = "http://localhost:8080/images";
const gURL_RATING = "http://localhost:8080/rating/review";
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    onPageLoading();

    $("body").on("click", ".btn-detail-product", function () {
        onBtnDetailProduct(this);
    });

    $("body").on("click", ".btn-review", function () {
        onBtnReviewProduct();
    });

    $("body").on("click", ".btn-other-product", function () {
        onBtnOtherProduct();
    });
});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    loadProductDetail();
}

// hàm xử lý khi ấn nút chi tiết
function onBtnDetailProduct(paramButtom) {
    var vProductId = $(paramButtom).attr("id")
    var vUrlProductDetail = "product-detail.html"
    window.location.href = vUrlProductDetail + `?id=${vProductId}`;
}

// xử lý click nút other product
function onBtnOtherProduct() {
    addClickBtnOtherProduct();
    loadProductDetail();
    scrollToElement("#product-similar");
}

// xử lý click nút review product
function onBtnReviewProduct() {
    addClickBtnReviewProduct();
    $("#rating-review").show(500);
    scrollToElement("#rating-review");
}
/*** REGION 4 - Common funtions - Vùng khais báo hàm dùng chung trong toàn bộ chương trình*/
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// hàm lấy thông tin id trên đường dẫn
function loadProductDetail() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vProductId = vUrlParams.get('id');
    callApiGetDataProduct(vProductId);
}

//hàm goi Api lấy thông tin chi tiết sản phẩm theo Id
function callApiGetDataProduct(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleRespon(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị lên giao diện chi tiết đơn hàng
function handleRespon(paramResponProduct) {
    callApiGetListRatingProduct(paramResponProduct.id);
    callApiDataProdcutByVendor(paramResponProduct.productVendor);
    var vDivSlideProduct = $("#div-slide-product");
    vDivSlideProduct.empty();
    var vCard = `
    <div class="card mb-3 w3-animate-bottom" id = "product-img">
        <img class="card-img img-fluid zoom" src= ${paramResponProduct.productImgs[0].url} alt="Card image cap" id="product-detail">
        <h1 class="show-product-Out-of-stock"></h1>
    </div>
    <div class="row" id = start-slide>`
    vDivSlideProduct.append(vCard);
    var vStartSlide = $("#start-slide");
    vStartSlide.append(`
    <div class="col-1 align-self-center">
        <a href="#multi-item-example" role="button" data-bs-slide="prev">
            <i class="text-dark fas fa-chevron-left"></i>
            <span class="sr-only">Previous</span>
        </a>
    </div>`)
        .append(`
            <div id="multi-item-example" class="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                <div class="carousel-inner product-links-wap" role="listbox" id = "carousel">`)
        .append(`
                <div class="col-1 align-self-center">
                    <a href="#multi-item-example" role="button" data-bs-slide="next">
                    <i class="text-dark fas fa-chevron-right"></i>
                    <span class="sr-only">Next</span>
                    </a>
                </div>`);
    var vCarousel = $("#carousel");
    vCarousel.append(`
    <div class="carousel-item active">
        <div class="row">
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 1">
                </a>
            </div>
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 2">
                </a>
            </div>
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 3">
                </a>
            </div>
        </div>
    </div>`)
        .append(`
    <div class="carousel-item">
        <div class="row">
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 4">
                </a>
            </div>
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 5">
                </a>
            </div>
            <div class="col-4">
                <a href="#">
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[Math.floor(Math.random()*paramResponProduct.productImgs.length)].url} alt="Product Image 6">
                </a>
            </div>
        </div>
    </div> `);

    var vCarDetail = $("#card-detail");
    vCarDetail.empty();
    vCarDetail.append(`
        <h1 class="h2">${paramResponProduct.productName}</h1>
        <p class="h3 py-2 text-danger">${convertMoney(paramResponProduct.buyPrice)}</p>
        <p class="py-2 product-rating" id="${paramResponProduct.id}-product">
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-secondary"></i>
            <span class="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
        </p>
        <ul class="list-inline">
            <li class="list-inline-item">
                <h6>Thương hiệu:</h6>
            </li>
            <li class="list-inline-item">
                <p class="text-muted"><strong>${paramResponProduct.productVendor}</strong></p>
            </li>
        </ul>

        <h6>Description:</h6>
        <p>${paramResponProduct.productDescription}</p>
        <ul class="list-inline">
            <li class="list-inline-item">
                <h6>Màu sắc :</h6>
            </li>
            <li class="list-inline-item">
                <p class="text-muted"><strong>${paramResponProduct.productColor}</strong></p>
            </li>
        </ul>

        <h6>Ưu đãi mua hàng:</h6>
        <ul class="list-unstyled pb-3">
            <li>- Free Ship COD toàn quốc</li>
            <li>- Giao hàng nhanh từ 3-4 ngày làm việc</li>
            <li>- Được kiểm tra hàng trước khi thanh toán</li>
            <li>- Bảo hành 6 tháng bằng Bill mua hàng</li>
        </ul>

        <ul class="list-inline">
            <li class="list-inline-item">
                <h6>Tồn kho :</h6>
            </li>
            <li class="list-inline-item">
                <p class="text-danger"><strong><a>${paramResponProduct.quantityInStock}</a></strong> sản phẩm</p>
            </li>
        </ul>
        
        <form action="" method="GET">
            <input type="hidden" name="product-title" value="Activewear">
            <div class="row">
                <div class="col-auto">
                    <ul class="list-inline pb-3">
                        <li class="list-inline-item">Size :
                            <input type="hidden" name="product-size" id="product-size" value="">
                        </li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">36</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">37</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">38</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">39</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">40</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">41</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">42</span></li>
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">43</span></li>
                    </ul>
                </div>
                <div class="col-auto">
                    <ul class="list-inline pb-3">
                        <li class="list-inline-item text-right">
                            Số lượng
                            <input type="hidden" name="product-quanity" id="product-quanity" value="1">
                        </li>
                        <li class="list-inline-item"><span class="btn btn-success" id="btn-minus">-</span></li>
                        <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">1</span></li>
                        <li class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
                    </ul>
                </div>
            </div>
            <div class="row pb-3 btn-product">
                <div class="col d-grid">
                    <button type="button" class="btn btn-danger btn-lg btn-buy w3-hover-blue w3-hover-shadow" name="submit" value="buy" id = "${paramResponProduct.id}">Mua ngay</button>
                </div>
                <div class="col d-grid">
                    <button type="button" class="btn btn-success btn-lg btn-add-cart w3-hover-orange w3-hover-shadow" name="submit" value="addtocard" id = "${paramResponProduct.id}">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </form>
    `)

    if (paramResponProduct.quantityInStock === 0) {
        $('.btn-product').empty();
        $('.btn-product').append(`
            <div class="col d-grid">
                <button type="button" class="btn btn-success btn-lg" name="submit" value="buy" id = "${paramResponProduct.id}" disabled>Sản phẩm hiện tại đã hết hàng</button>
            </div>
        `);
        $(".zoom").css("opacity", .5);
        $(".show-product-Out-of-stock").html("Hết hàng");
    }

    $('body').on("click", "#btn-minus", function () {
        var val = $("#var-value").html();
        val = (val == '1') ? val : val - 1;
        $("#var-value").html(val);
        $("#product-quanity").val(val);
        return false;
    });
    $('body').on("click", "#btn-plus", function () {
        var val = $("#var-value").html();
        val++;
        $("#var-value").html(val);
        $("#product-quanity").val(val);
        if (val > paramResponProduct.quantityInStock) {
            showAlert("error", "Vượt quá số lượng tồn kho sản phẩm", 3000);
            $("#var-value").html(paramResponProduct.quantityInStock);
            $("#product-quanity").val(paramResponProduct.quantityInStock);
        }
        return false;
    });


}

// gọi Api lấy danh sách rating sản phẩm
function callApiGetListRatingProduct(paramProductId) {
    $.ajax({
        url: gURL_RATING + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        success: function (responseRating) {
            showRatingProductDetail(responseRating);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị rating của sản phẩm
function showRatingProductDetail(paramResponRating) {
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
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
                    <span class="list-inline-item text-dark"><a>${(vSum / paramResponRating.length).toFixed(1)}</a> | <a>${paramResponRating.length}</a> Đánh giá</span>
                `);
            }

        }
    }
    else {
        $(".product-rating").empty();
        $(".product-rating").append(`
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <span class="list-inline-item text-dark"> | Chưa có đánh giá</span>
        `);
    }

}

// ham lay data product theo vendor
function callApiDataProdcutByVendor(paramProductVendor) {
    $.ajax({
        url: gURL_PRODUCT + `/vendor/${paramProductVendor}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleResponProductByVendor(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị data lên giao diện 
function handleResponProductByVendor(paramProductVendor) {
    // console.log(paramProductVendor)
    // $(paramProductVendor).each(function(bI, product) {
    var vDivProductSimilar = $("#product-similar");
    vDivProductSimilar.empty();
    vDivProductSimilar.append(`
        <div class="row text-center py-3 w3-animate-bottom">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Thương hiệu ${paramProductVendor[0].productVendor}</h1>
            </div>
        </div>
        <div class="row w3-animate-bottom" id = "card-product-similar">
    `);
    $(paramProductVendor).each(function (bI, productNew) {
        var vCardProductSimilar = $("#card-product-similar");
        vCardProductSimilar.append(`
            <div class="col-12 col-md-3 mb-4 product-vendor">
                <div class="product-grid card h-100">
                    <div class="product-image border-bottom">
                        <a href="product-detail.html?id=${productNew.id}" class="image">
                            <img class="pic-1" src=${productNew.productImgs[Math.floor(Math.random()*productNew.productImgs.length)].url}>
                            <img class="pic-2" src=${productNew.productImgs[Math.floor(Math.random()*productNew.productImgs.length)].url}>
                        </a>
                        <span class="product-hot-label">${productNew.productVendor}</span>
                        <ul class="product-links">
                            <li><a href="#" data-tip="Add to Wishlist">${productNew.quantityInStock}</a></li>
                        </ul>
                    </div>
                    <div class="product-content">
                        <a class="add-to-cart" href="product-detail.html?id=${productNew.id}">
                            <i class="fas fa-eye"></i>Chi tiết
                        </a>
                        <h3 class="title"><a href="product-detail.html?id=${productNew.id}">${productNew.productName}</a></h3>
                        <ul class="rating" id="${productNew.id}-product-vendor">
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                            <i class="far fa-star"></i>
                        </ul>
                        <div class="price">${convertMoney(productNew.buyPrice)}</div>
                    </div>
                </div>
            </div>
        `)
        callApiGetListRatingProductVendor(productNew.id);
    });
}

// gọi Api lấy danh sách rating sản phẩm
function callApiGetListRatingProductVendor(paramProductId) {
    $.ajax({
        url: gURL_RATING + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        success: function (responseRating) {
            showRatingProductVendor(responseRating);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị rating của sản phẩm
function showRatingProductVendor(paramResponRating) {
    if (paramResponRating[0] != null) {
        var vSum = 0
        for (var i = 0; i < paramResponRating.length; i++) {
            vSum += parseInt(paramResponRating[i].rating, 10);
            var vAvergerRating = vSum / paramResponRating.length;
            var vProductIdRating = $(`#${paramResponRating[i].ordersDetail.idProduct}-product-vendor`);
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

// add css button other product
function addClickBtnOtherProduct() {
    $(".btn-review").removeClass("btn-primary");
    $(".btn-review").addClass("btn-outline-primary");
    $(".btn-other-product").addClass("btn-primary");
    $(".btn-other-product").removeClass("btn-outline-primary");
}

// add css button review
function addClickBtnReviewProduct() {
    $(".btn-other-product").removeClass("btn-primary");
    $(".btn-other-product").addClass("btn-outline-primary");
    $(".btn-review").addClass("btn-primary");
    $(".btn-review").removeClass("btn-outline-primary");
}

function scrollToElement(paramElement) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(paramElement).offset().top
    }, 200);
}

