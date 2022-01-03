"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_PRODUCT = "http://localhost:8080/products";
const gURL_CUSTOMER = "http://localhost:8080/customers"
const gURL_ORDER = "http://localhost:8080/orders";
const gURL_ORDER_DETAIL = "http://localhost:8080/order-details";
var gProductLocal = JSON.parse(localStorage.getItem('product'));

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
onPageLoading();

changeQuantityProductOrder();

$("body").on("click", ".btn-delete-product", function () {
    removeItem(this.id);
});

$("body").on("click", ".btn-buy-product-cart", function () {
    onBtnToShopProduct();
});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    loadDataProductBuy();
}

// hàm xử lý khi click nút thanh toán
function onBtnPayment() {
    if (gProductLocal == null || gProductLocal.length == 0) {
        showAlert("error", "Không có sản phẩm nào trong giỏ", 3000);
    }
    else {
        let vUser = getCookie("token");
        if (vUser == "" || vUser == null) {
            Swal.fire({
                title: 'Bạn chưa đăng nhập?',
                text: "Hãy đăng nhập ngay để đặt hàng!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            })
        }
        else {

            $("#modal-customer").modal("show");
        }
    }
}

// hàm xử lý khi tạo order
function onBtnCreateOrder() {
    validateFormCustomer();
}

// chuyển về trang shop
function onBtnToShopProduct() {
    window.location.href = "shop.html";
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//hàm validate dữ liệu form đặt hàng
function validateFormCustomer() {
    $('#form-customer').submit(function () {
        return false;
    });
    $("#form-customer").validate({
        rules: {
            requiredDate: {
                required: true
            }
        },
        messages: {
            requiredDate: {
                required: "Vui lòng nhập ngày nhận hàng"
            }
        },
        submitHandler: function () {
            handleDataForm();
        }
    });
}

// xử lý tạo order mới khi validate thành công
function handleDataForm() {
    let vUser = getCookie("token");
    var vOrder = {
        orderDate: "2021-11-11",
        requiredDate: "",
        shippedDate: "",
        status: "open",
        comments: "",
        orderDetails: []
    };
    var vUserDtail = parseJwtUser(vUser);

    getDataOrderUser(vOrder);
    console.log(vOrder);
    callApiCreateOrder(vUserDtail.user.userId, vOrder);
}
// thu thập thông tin khach hàng
function getDataOrderUser(paramOrder) {
    
    paramOrder.requiredDate = formatDate($("#inp-required-date").val());
    paramOrder.comments = $("#inp-message").val().trim();
    gProductLocal.forEach(product => {
        var vOrderDetail = {
            idProduct: "",
            quantityOrder: "",
            priceEach: ""
        };
        vOrderDetail.idProduct = product.id.id;
        vOrderDetail.quantityOrder = product.quantity;
        vOrderDetail.priceEach = product.id.buyPrice;
        paramOrder.orderDetails.push(vOrderDetail);
    });
}

// hàm goi Api tạo mới order
function callApiCreateOrder(paramUserId, paramOrder) {
    if (paramUserId !== "0") {
        $.ajax({
            url: gURL_ORDER + `/orderDetail/${paramUserId}`,
            type: "POST",
            data: JSON.stringify(paramOrder),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                showAlert("success", "Tạo đơn hàng thành công!", 3000);
                localStorage.clear();
                gProductLocal = null;
                showTotalPayment();
                showNumberCart();
                resetFormModalOrder();
                loadDataProductBuy();
            },
            error: function (errors) {
                // console.log(JSON.parse(errors.responseText).errors);
                if (errors.status === 400) {
                    showAlert("error", JSON.parse(errors.responseText).errors, 3000);
                }
                else {
                    showAlert("error", errors.responseText, 3000);
                    console.log(errors)
                }
            }
        });
    }
    else {
        showAlert("error", "Hãy thêm customer trước", 3000);
    }
}

// Convert number to money VND
function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
//load data san pham da add
function loadDataProductBuy() {
    if (gProductLocal === null || gProductLocal.length === 0) {
        $(".total-product").empty();
        $(".list-products").empty();
        $(".total-product").append(`
            <p class="p-0 mt-3">0 sản phẩm</p>
        `);
        $(".total-product-payment").html("0");
        showTotalPayment();
        showNumberCart();
    }
    else {
        $(".total-product").empty();
        $(".list-products").empty();
        $(".total-product").append(`
            <p class="p-0 mt-3">Có ${gProductLocal.length} sản phẩm</p>
        `);
        $(".total-product-payment").empty();
        $(gProductLocal).each((_bI, product) => {
            $(".list-products").append(`
                <div class="row border-bottom mx-2">
                    <div class="col my-2 img-product">
                        <img src=${product.id.productImgs[0].url} alt="" class="img-thumbnail img-product"
                            width="80%">
                    </div>
                    <div class="col-sm-4 align-self-center name-product">
                        <span class="name-product" for="">${product.id.productName}</span><br>
                        <span class="text-success">Màu sắc: ${product.id.productColor}</span> 
                        <p>Size: ${product.size}</p>  
                    </div>  
                    <div class="col align-self-center d-flex justify-content-center my-2 count-product">
                        <div class="col"> <input type="number" class="form-control product-number" style="display: none;" id="product-quantity-${product.id.id}" data=${product.id.id} value=${product.quantity}> 
                            <a href="#" id="btn-minus-${product.id.id}" class="btn-minus text-success">-</a>
                            <i href="#" class="border border-success m-2 py-1 px-2" id="value-quantity-product-${product.id.id}">${product.quantity}</i>
                            <a href="#" id="btn-plus-${product.id.id}" class="btn-plus text-success">+</a> 
                        </div>
                    </div>
                    <div class="col align-self-center d-flex justify-cont  ent-center my-2 price-product">
                        <a href="#" id="total-money-${product.id.id}">${convertMoney(product.id.buyPrice * product.quantity)}</a> 
                    </div>
                    <div class="col align-self-center d-flex justify-content-center my-2 delete-product">
                        <i class="fas fa-1x fa-trash-alt text-danger btn-delete-product" id="${product.id.id}" style="cursor: pointer;"></i>
                    </div>
                </div>
            `);
        });
        var vTotalChange = 0;
        for (let i = 0; i < gProductLocal.length; i++) {
            const vProductIndex = gProductLocal[i];
            vTotalChange += vProductIndex.quantity << 0;
            $(".total-product-payment").html(vTotalChange);
        }
        updateTotalMoney(gProductLocal); // update tiền
    }
}

// thay đổi sô lượng sản phẩm mua
function changeQuantityProductOrder() {
    if (gProductLocal !== null) {
        for (let i = 0; i < gProductLocal.length; i++) {
            const vProductIndex = gProductLocal[i];
            $('body').on("click", `#btn-minus-${vProductIndex.id.id}`, function () {
                var val = $(`#value-quantity-product-${vProductIndex.id.id}`).html();
                val = (val == '1') ? val : val - 1;
                $(`#value-quantity-product-${vProductIndex.id.id}`).html(val);
                $(`#product-quantity-${vProductIndex.id.id}`).val(val);
                $(`#total-money-${vProductIndex.id.id}`).html(convertMoney(parseInt(val) * vProductIndex.id.buyPrice));
                vProductIndex.quantity = val.toString();
                localStorage.product = JSON.stringify(gProductLocal);
                loadDataProductBuy();
            });
            $('body').on("click", `#btn-plus-${vProductIndex.id.id}`, function () {
                var val = $(`#value-quantity-product-${vProductIndex.id.id}`).html();
                val++;
                $(`#value-quantity-product-${vProductIndex.id.id}`).html(val);
                $(`#product-quantity-${vProductIndex.id.id}`).val(val);
                $(`#total-money-${vProductIndex.id.id}`).html(convertMoney(parseInt(val) * vProductIndex.id.buyPrice));
                if (val > vProductIndex.id.quantityInStock) {
                    showAlert("error", "Vượt quá số lượng tồn kho sản phẩm", 3000);
                    $(`#value-quantity-product-${vProductIndex.id.id}`).html(vProductIndex.id.quantityInStock);
                    vProductIndex.quantity = vProductIndex.id.quantityInStock;
                    localStorage.product = JSON.stringify(gProductLocal);
                    loadDataProductBuy();
                }
                else {
                    vProductIndex.quantity = val.toString();
                    localStorage.product = JSON.stringify(gProductLocal);
                    loadDataProductBuy();
                }
            });
        }
    }
}

function updateTotalMoney(arr) {
    // Tính tổng tiền cart
    let totalMoney = 0;
    if (arr != null) {
        for (let i = 0; i < arr.length; i++) {
            const p = arr[i];
            totalMoney += p.quantity * p.id.buyPrice;
        }
        $(".total-payment").empty();
        $(".total-payment").append(`
            <span>${convertMoney(totalMoney)}</span>
        `);
    }
}

// xoá product trong cart
function removeItem(id) {
    for (let i = 0; i < gProductLocal.length; i++) {
        if (gProductLocal[i].id.id == id) {
            gProductLocal.splice(i, 1);
            localStorage.product = JSON.stringify(gProductLocal);
        }
    }
    showNumberCart();
    loadDataProductBuy();
}

//hàm hiển thị số lượng đơn hàng
function showNumberCart() {
    if (localStorage.product === undefined || JSON.parse(localStorage.product).length === 0) {
        $(".product-number").empty();
        $(".product-number").append(`
        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span>
    `)
    }
    else {
        $(".product-number").empty();
        $(".product-number").append(`
        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
        <span class="position-absolute top-0 left-100 translate-middle badge badge-danger rounded-pill bg-light text-dark">${JSON.parse(localStorage.product).length}</span>
    `)
    }
}

function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD");
    return date;
}

function resetFormModalOrder() {
    $(".total-payment").empty();
    $(".total-payment").append(`
            <span>0 VNĐ</span>
        `);
    $("#inp-required-date").val("");
    $('#modal-customer').modal('hide');
}

function showTotalPayment() {

    $(".price").hide(500);
    $(".product-shop").show(500);
}

// lấy cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// xử lý lấy thông tin token
function parseJwtUser(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
