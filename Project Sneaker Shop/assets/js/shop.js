"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_PRODUCT = "http://localhost:8080/products";
const gURL_PRODUCT_LINE = "http://localhost:8080/product-lines";
const gURL_RATING = "http://localhost:8080/rating/review";
var vPagObj = $('#pagination').twbsPagination({
    totalPages: callApiGetTotalPage(),
    visiblePages: 2
});

var nonLinearSlider = document.getElementById('price-range');

noUiSlider.create(nonLinearSlider, {
    connect: true,
    behaviour: 'tap',
    start: [1000000, 3000000],
    range: {
        'min': [500000],
        'max': [10000000]
    },
    format: {
        to: function (value) {
            return convertMoney(value);
        },
        from: function (value) {
            return Number(value.replace(',-', ''));
        }
    }
});
var nodes = [
    document.getElementById('lower-value'),
    document.getElementById('upper-value')
];

nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
    nodes[handle].innerHTML = values[handle];
});
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {

    onPageLoading();

    $("body").on("click", ".btn-buy-product", function () {
        onBtnBuyProduct(this);
    });

    $("body").on("click", ".btn-detail", function () {
        onBtnDetailProduct(this);
    });

    $("body").on("click", ".btn-modal-buy", function () {
        onBtnBuyModal(this);
    });

    $("body").on("click", ".btn-modal-add-cart", function () {
        onBtnAddCartModal(this);
    });

    $("body").on("click", "#btn-filter-price", function () {
        handleValuePrice();
    });

    $("body").on("change", ".select-brand", function () {
        callApiFilterProductByBrand(this.id);
    });

    $("body").on("change", ".select-product-line", function () {
        callApiFilterProductByProductLineId(this.id, $(this).attr("data"));
    });

    $("body").on("change", "#select-filter-product", function () {
        sortProductList($(this).val());
    });

    $("body").on("click", ".btn-show-all-product", function () {
        window.location.href = "shop.html";
    });


});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    onBtnFilterBrand();
    callApiGetProductVendor();
    callApiGetProductLine();
    callApiGetProductByPage(0, 6);

    vPagObj.on('page', (event, page) => {
        var body = $("html, body");
        callApiGetProductByPage(page - 1, 6);
        body.stop().animate({ scrollTop: 0 }, 200, 'swing');
    });
}

function handleValuePrice() {
    $(".select-brand").prop('checked', false);
    $(".select-product-line").prop('checked', false);
    var vPriceObj = {
        lower: 0,
        upper: 0
    }
    var vPrice = nonLinearSlider.noUiSlider.get();
    vPriceObj.lower = (vPrice[0].replace(/[^0-9\.]+/g, "").replace(/\./g, ''));
    vPriceObj.upper = (vPrice[1].replace(/[^0-9\.]+/g, "").replace(/\./g, ''));
    callApiFilterProductByPrice(vPriceObj);
}

function onBtnBuyProduct(paramButtom) {
    var vProductId = $(paramButtom).parents("ul").attr("id");
    // console.log(vProductId);
    callApiGetDataProduct(vProductId);
}

function onBtnDetailProduct(paramButtom) {
    var vProductId = $(paramButtom).parents("ul").attr("id");
    var vUrlProductDetail = "product-detail.html"
    window.location.href = vUrlProductDetail + `?id=${vProductId}`;
}

// hàm hiển thị thông tin tất cả sản phẩm khi click nut All
function onBtnLoadAllProduct() {
    callApiGetProductByPage(0, 6);
}
// ham loc san pham theo nhan hieu
function onBtnFilterBrand() {
    var vProductBrand = [];
    $("body").on('change', '.brand', function () {
        if (this.checked) {
            vProductBrand.push(this.value);
        }
        else {
            vProductBrand.remove(this.value);
        }
        console.log(vProductBrand);
    });
}

// ham xu ly khi an mua hang tren modal
function onBtnBuyModal(paramButtom) {
    var vProduct = {
        id: "",
        size: "",
        quantity: ""
    }
    var vProductId = $(paramButtom).attr("id");
    vProduct.id = callApiDetailProduct(vProductId);
    getProductItem(vProduct);
    if (vProduct.size == "") {
        showAlert("error", "Bạn hãy chọn size giày trước khi đặt hàng !", 3000);
    } else {
        saveModalProductToLocal(vProduct);
    }
}

// ham add product vao cart 
function onBtnAddCartModal(paramButtom) {
    var vProduct = {
        id: "",
        size: "",
        quantity: ""
    }
    var vProductId = $(paramButtom).attr("id");
    vProduct.id = callApiDetailProduct(vProductId);
    getProductItem(vProduct);
    if (vProduct.size == "") {
        showAlert("error", "Bạn hãy chọn size giày trước khi đặt hàng !", 3000);
    } else {
        addModalProductToCart(vProduct);
    }
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

//hàm gọi Api lấy data prodcut hien thi trang 2
function callApiGetProductByPage(paramPage, paramSize) {
    $.ajax({
        url: gURL_PRODUCT + `/page?page=${paramPage}&size=${paramSize}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            handleResponAllProduct(response.content);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

//hàm gọi Api lấy data prodcut hien thi trang 2
function callApiGetTotalPage() {
    var vTotalPage = 0;
    $.ajax({
        url: gURL_PRODUCT + `/page?`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            vTotalPage = response.totalPages;
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
    return vTotalPage;
}

// hiển thị data all sản phẩm lên giao diện
function handleResponAllProduct(paramResponProduct) {
    $("#div-card-product").empty();
    $("#div-card-product").append(`
        <div class="row">
            <div class="col-md-6">
                
            </div>
            <div class="col-md-6 pb-4">
                <div class="d-flex">
                    <select class="form-control mt-3" id="select-filter-product">
                        <option value = "1">Giá (Thấp - Cao)</option>
                        <option value = "2">Giá (Cao - Thấp)</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row" id = "card-list-product">
    `)
    $(paramResponProduct).each(function (bI, product) {
        $("#card-list-product").append(`
            <div class="col-md-4 mb-3 w3-animate-bottom">
                <div class="product-grid rounded-3 card h-100">
                    <div class="product-image border-bottom">
                        <a class="image">
                            <img class="img-1" src=${product.productImgs[0].url}>
                        </a>
                        <ul class="product-links" id=${product.id}>
                            <li><a><i class="fas fa-lg fa-shopping-cart text-danger btn-buy-product" style="cursor: pointer;"></i></a></li><br>
                            <li><a><i class="fa fa-lg fa-eye text-success btn-detail" style="cursor: pointer;"></i></a></li>
                        </ul>
                    </div>
                    <div class="product-content">
                        <div class="price text-danger">${convertMoney(product.buyPrice)}</div>
                        <h3 class="title"><a href="#">${product.productName}</a></h3>
                        <ul class="rating" id="${product.id}-product">
                            <li class="far fa-star"></li>
                            <li class="far fa-star"></li>
                            <li class="far fa-star"></li>
                            <li class="far fa-star"></li>
                            <li class="far fa-star"></li>
                        </ul>
                    </div>
                </div>
            </div>
        `);
        callApiGetListRatingProduct(product.id);


    });
}

// gọi Api lấy danh sách rating sản phẩm
function callApiGetListRatingProduct(paramProductId) {
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
                    <i class="far fa-star text-warning"></i>
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

// hàm gọi APi lấy thông tin tất cả thương hiệu của sản phẩm
function callApiGetProductVendor() {
    $.ajax({
        url: gURL_PRODUCT + `/countVendor`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            showProductVendor(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hàm hiển thị thương hiệu sản phẩm (dùng lọc sản phẩm)
function showProductVendor(paramProductVendor) {
    $("#select-brand").empty();
    $(paramProductVendor).each((bI, brand) => {
        $("#select-brand").append(`
        <li class="filter-list"><input class="pixel-radio select-brand" type="radio" name="brand" id=${brand}><label for="apple">${brand}</label></li>
    `)
    });
}

// goi Api lấy data productLine
function callApiGetProductLine() {
    $.ajax({
        url: gURL_PRODUCT_LINE,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            showProductLine(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hiển thị productLine
function showProductLine(paramProductLine) {
    $("#select-product-line").empty();
    $(paramProductLine).each((bI, productLine) => {
        $("#select-product-line").append(`
        <li class="filter-list"><input class="pixel-radio select-product-line" type="radio" name="productLine" data="${productLine.productLine}" id=${productLine.id}><label for="men">${productLine.productLine}</label></li>
    `)
    });
}

// hàm gọi Api lấy thông tin chi tiết sản phẩm 
function callApiGetDataProduct(paramProductId) {
    $.ajax({
        url: gURL_PRODUCT + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            handleRespon(response);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại", 3000);
        }
    });
}

// hiển thị thông tin chi tiết lên modal
function handleRespon(paramResponProduct) {
    var vDivSlideProduct = $("#div-slide-product");
    vDivSlideProduct.empty();
    var vCard = `
    <div class="card mb-3" id = "product-img">
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
                    <img class="card-img img-fluid" src=${paramResponProduct.productImgs[6].url} alt="Product Image 6">
                </a>
            </div>
        </div>
    </div> `);

    var vCarDetail = $("#card-detail");
    vCarDetail.empty();
    vCarDetail.append(`
        <h1 class="h2">${paramResponProduct.productName}</h1>
        <p class="h3 py-2 text-danger">${convertMoney(paramResponProduct.buyPrice)}</p>
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
                <p><strong><a class= "text-danger">${paramResponProduct.quantityInStock}</a></strong> sản phẩm</p>
            </li>
        </ul>

        <form action="" method="GET" id="form-detail">
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
                        <li class="list-inline-item"><span class="btn btn-success my-1 btn-size w3-hover-orange w3-hover-shadow">40</span></li>
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
                <div class="col d-grid ">
                    <button type="button" class="btn btn-success btn-lg btn-modal-buy w3-hover-orange w3-hover-shadow" name="submit" value="buy" id ="${paramResponProduct.id}">Mua ngay</button>
                </div>
                <div class="col d-grid">
                    <button type="button" class="btn btn-success btn-lg btn-modal-add-cart w3-hover-orange w3-hover-shadow" name="submit" value="addtocard" id ="${paramResponProduct.id}">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </form>
    `)
    // check tồn kho
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
    // show modal
    $("#modal-detail-product").modal("show");

    // click button minus
    $('body').on("click", "#btn-minus", function () {
        var val = $("#var-value").html();
        val = (val == '1') ? val : val - 1;
        $("#var-value").html(val);
        $("#product-quanity").val(val);
        return false;
    });
    // click button plus
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

// hàm goi Api lọc sản phẩm theo thương hiệu
function callApiFilterProductByBrand(paramProductVendor) {
    showFilterName(paramProductVendor);
    $(".select-product-line").prop('checked', false);
    $.ajax({
        url: gURL_PRODUCT + `/brand/${paramProductVendor}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            $('#pagination').twbsPagination('destroy');
            handleResponAllProduct(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// lọc theo product line
function callApiFilterProductByProductLineId(paramProductLineId, paramProductLineName) {
    showFilterName(paramProductLineName);
    $(".select-brand").prop('checked', false);
    $.ajax({
        url: gURL_PRODUCT_LINE + `/products/${paramProductLineId}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            $('#pagination').twbsPagination('destroy');
            handleResponAllProduct(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hàm lọc theo giá
function callApiFilterProductByPrice(paramPriceObj) {
    showFilterName(`${convertMoney(parseInt(paramPriceObj.lower))} - ${convertMoney(parseInt(paramPriceObj.upper))}`)
    $(".select-brand").prop('checked', false);
    $(".select-product-line").prop('checked', false);
    $.ajax({
        url: gURL_PRODUCT + `/price/${paramPriceObj.lower}/${paramPriceObj.upper}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            $('#pagination').twbsPagination('destroy');
            handleResponAllProduct(response);
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// sắp xếp list product
function sortProductList(paramValue) {
    switch (paramValue) {
        case "1":
            callApiShowProductBypriceLowToHigh(0, 15);
        break;
        case "2":
            callApiShowProductBypriceHighToLow(0, 15);
        break;
        case "3":
            alert("3")
        break;
        
    }
}

// sắp xếp product theo giá từ thấp đến cao
function callApiShowProductBypriceLowToHigh(paramPage, paramSize) {
    $.ajax({
        url: gURL_PRODUCT + `/price/low?page=${paramPage}&size=${paramSize}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            $('#pagination').twbsPagination('destroy');
            $("#card-list-product").empty();
            $(response.content).each(function (bI, product) {
                $("#card-list-product").append(`
                    <div class="col-md-4 w3-animate-bottom">
                        <div class="product-grid border rounded-3 mb-3">
                            <div class="product-image border-bottom">
                                <a class="image">
                                    <img class="img-1" src=${product.productImgs[0].url}>
                                </a>
                                <ul class="product-links" id=${product.id}>
                                    <li><a><i class="fas fa-lg fa-shopping-cart text-danger btn-buy-product" style="cursor: pointer;"></i></a></li><br>
                                    <li><a><i class="fa fa-lg fa-eye text-success btn-detail" style="cursor: pointer;"></i></a></li>
                                </ul>
                            </div>
                            <div class="product-content">
                                <div class="price text-danger">${convertMoney(product.buyPrice)}</div>
                                <h3 class="title"><a href="#">${product.productName}</a></h3>
                                <ul class="rating" id="${product.id}-product">
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
                callApiGetListRatingProduct(product.id);
            });

        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// sắp xếp product theo giá từ cao đến thấp
function callApiShowProductBypriceHighToLow(paramPage, paramSize) {
    $.ajax({
        url: gURL_PRODUCT + `/price/high?page=${paramPage}&size=${paramSize}`,
        method: "get",
        dataType: "json",
        async: true,
        success: function (response) {
            $('#pagination').twbsPagination('destroy');
            $("#card-list-product").empty();
            $(response.content).each(function (bI, product) {
                $("#card-list-product").append(`
                    <div class="col-md-4 w3-animate-bottom">
                        <div class="product-grid border rounded-3 mb-3">
                            <div class="product-image border-bottom">
                                <a class="image">
                                    <img class="img-1" src=${product.productImgs[0].url}>
                                </a>
                                <ul class="product-links" id=${product.id}>
                                    <li><a><i class="fas fa-lg fa-shopping-cart text-danger btn-buy-product" style="cursor: pointer;"></i></a></li><br>
                                    <li><a><i class="fa fa-lg fa-eye text-success btn-detail" style="cursor: pointer;"></i></a></li>
                                </ul>
                            </div>
                            <div class="product-content">
                                <div class="price text-danger">${convertMoney(product.buyPrice)}</div>
                                <h3 class="title"><a href="#">${product.productName}</a></h3>
                                <ul class="rating" id="${product.id}-product">
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                    <li class="far fa-star"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
                callApiGetListRatingProduct(product.id);
            });
            $(window).scroll(function(event) {
                var pos_body = $('html,body').scrollTop();
                if(pos_body>1200){
                   $('.back-to-top').addClass('hien-ra');
                }
                else{
                   $('.back-to-top').removeClass('hien-ra');
                }
             });
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
}

// hàm thu thập thông tin product
function getProductItem(paramProduct) {
    paramProduct.size = $("#product-size").val();
    paramProduct.quantity = $("#product-quanity").val();
}

// ham xu ky khi click nut mua hang
function saveModalProductToLocal(paramProduct) {
    if (localStorage.product === undefined || JSON.parse(localStorage.product).length === 0) {
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
        window.location.href = "cart.html";
    }
    else {
        gProductNumber = JSON.parse(localStorage.product);
        $.each(gProductNumber, function (i, el) {
            if (el.id.id == paramProduct.id.id) {
                gProductNumber.splice(i, 1, paramProduct);
                localStorage.setItem('product', JSON.stringify(gProductNumber));
                showNumberCart();
                showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
                window.location.href = "cart.html"; throw 'exit';
            }
        });
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
        window.location.href = "cart.html";
    }
}

//ham xu ly add product vao gio hang
function addModalProductToCart(paramProduct) {
    // console.log(paramProduct.id.id);
    if (localStorage.product === undefined || JSON.parse(localStorage.product).length === 0) {
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        flyAddToCart();
        $("#modal-detail-product").modal("hide");
        showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
    }
    else {
        gProductNumber = JSON.parse(localStorage.product);
        $.each(gProductNumber, function (i, el) {
            if (el.id.id == paramProduct.id.id) {
                gProductNumber.splice(i, 1, paramProduct);
                localStorage.setItem('product', JSON.stringify(gProductNumber));
                showNumberCart();
                flyAddToCart();
                $("#modal-detail-product").modal("hide");
                showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000); throw 'exit';
            }
        });
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        flyAddToCart();
        $("#modal-detail-product").modal("hide");
        showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
    }
}

//ham goi Api lay thong tin product
function callApiDetailProduct(paramProductId) {
    var vProduct = "";
    $.ajax({
        url: gURL_PRODUCT + `/${paramProductId}`,
        method: "get",
        dataType: "json",
        async: false,
        success: function (response) {
            vProduct = response;
        },
        error: function () {
            // showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
    return vProduct;
}

function showAlert(status, message, timer) {
    Swal.fire({
        icon: status,
        html: `<p class="text-black">${message}`,
        showConfirmButton: false,
        timer: timer
    })
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

//hiển thị từ khoá tìm kiếm
function showFilterName(paramFilterName) {
    $("#filter-name").empty();
    $("#filter-name").append(`
        <span class="badge bg-success">${paramFilterName}<i class="fas fa-times ms-2 btn-show-all-product" style="cursor: pointer;"></i></span>
    `)
}



