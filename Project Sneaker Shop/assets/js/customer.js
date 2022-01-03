"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gURL_USER = "http://localhost:8080/users";
var gProductNumber = [];
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    $(window).on('load', function (event) {
        $('body').removeClass('loading');
        $('.loading').delay(500).fadeOut('fast');
    });
    // onPageLoading();
    $("body").dblclick(function () {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });

    $(".customer-register").on("click", function () {
        window.location.href = "login.html";
    });

    $("body").on("click", ".btn-buy", function () {
        onBtnBuyProduct(this);
    });

    $("body").on("click", ".btn-add-cart", function () {
        onBtnAddCart(this);
    });

    $("body").on("click", ".btn-close", function () {
        resetFormModal();
    });

    $("body").on("click", "#btn-close", function () {
        resetFormModal();
    });

    $("body").on("click", ".btn-logout", function () {
        onBtnLogoutUser(this);
    });

    $("body").on("click", ".btn-user-orderDetail", function () {
        onBtnShowOrderList(this.id);
    });

    createModalCustomer();

    showNumberCart();

    hideNarBarOnScroll();

    checkCookie();

});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

//hàm xử lý mua hàng
function onBtnBuyProduct(paramButtom) {
    var vProduct = {
        id: "",
        size: "",
        quantity: ""
    }
    var vProductId = $(paramButtom).attr("id");
    vProduct.id = callApiDetailProduct(vProductId);
    getProductItem(vProduct);
    if (vProduct.size == "") {
        showAlert("error", "Bạn hãy chọn size giày trước khi đặt hàng !");
    } else {
        saveProductToLocal(vProduct);
    }
}

// ham xu ly khi nut add cart duoc an
function onBtnAddCart(paramButtom) {
    var vProduct = {
        id: "",
        size: "",
        quantity: ""
    }
    var vProductId = $(paramButtom).attr("id");
    vProduct.id = callApiDetailProduct(vProductId);
    getProductItem(vProduct);
    if (vProduct.size == "") {
        showAlert("error", "Bạn hãy chọn size giày trước khi đặt hàng !");
    } else {
        addProductToCart(vProduct);
    }
}

// đăng xuất tài khoản
function onBtnLogoutUser() {
    deleteCookie("token");
    window.location.href = "login.html";
}

// hiển thi các đơn hàng của khách hàng
function onBtnShowOrderList(paramCustomerId) {
    var vCustomerId = paramCustomerId;
    var vUrlListOrder = "listOrder.html"
    window.location.href = vUrlListOrder + `?customerId=${vCustomerId}`;
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//hàm hiển thị số lượng đơn hàng
function showNumberCart(paramNUmberProduct) {
    if (localStorage.product === undefined || JSON.parse(localStorage.product).length === 0) {
        $(".product-number").empty();
        $(".product-number").append(`
        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1 shopping-cart"></i>
        <span class="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-pill text-white"></span>
    `)
    }
    else {
        $(".product-number").empty();
        $(".product-number").append(`
        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1 shopping-cart"></i>
        <span class="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-pill text-white">${JSON.parse(localStorage.product).length}</span>
    `)
    }
}
// hàm render ra giao diện modal
function createModalCustomer() {
    $("body").append(`
        <div class="modal fade" id="modal-customer" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form action="voucher" id="form-customer">  
                        <div class="modal-header w3-blue">
                            <h5 class="modal-title" id="exampleModalLongTitle">Chi tiết đơn hàng</h5>
                            <a type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            </a>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <a for="" class="requiredDate">Ngày nhận hàng</a>
                                    <input class="form-control" type="date" name="requiredDate" id="inp-required-date">
                                </div>
                                <div class="col-sm-12 mt-2">
                                    <a for="">Lời nhắn</a>
                                    <textarea name="" id="inp-message" cols="30" rows="10" class="form-control" style = "height: 100px;">

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn-close">Đóng</button>
                            <button type="submit" class="btn btn-success" id="btn-save" onclick="onBtnCreateOrder()">Gửi đơn</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);
}
// hàm thu thập thông tin product
function getProductItem(paramProduct) {
    paramProduct.size = $("#product-size").val();
    paramProduct.quantity = $("#product-quanity").val();
}
// ham xu ky khi click nut mua hang
function saveProductToLocal(paramProduct) {
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
function addProductToCart(paramProduct) {
    // console.log(paramProduct.id.id);
    if (localStorage.product === undefined || JSON.parse(localStorage.product).length === 0) {
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000);
        flyAddToCart();
    }
    else {
        gProductNumber = JSON.parse(localStorage.product);
        $.each(gProductNumber, function (i, el) {
            if (el.id.id == paramProduct.id.id) {
                gProductNumber.splice(i, 1, paramProduct);
                localStorage.setItem('product', JSON.stringify(gProductNumber));
                showNumberCart();
                flyAddToCart();
                showAlert("success", "Bạn đã thêm vào giỏ hàng !", 3000); throw 'exit';
            }
        });
        gProductNumber.push(paramProduct);
        localStorage.setItem('product', JSON.stringify(gProductNumber));
        showNumberCart();
        flyAddToCart();
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
// hàm reset form
function resetFormModal() {
    $("#inp-required-date").val("");
    $('#modal-customer').modal('hide');
}

// show/ hide narBar
function hideNarBarOnScroll() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("narBar").style.top = "0px";
        } else {
            document.getElementById("narBar").style.top = "-120px";
        }
        prevScrollpos = currentScrollPos;
    }
}

// animate fly cart
function flyAddToCart() {
    let imgtodrag = $("#product-img");
    let cart = $(".shopping-cart");
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '.5',
                'position': 'absolute',
                'height': '500px',
                'width': '500px',
                'z-index': '9999'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 65,
                'height': 65
            }, 1000, 'easeInOutExpo');

        setTimeout(function () {
            cart.effect("size", {
                times: 2
            }, 50);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }
}

// check cookie
function checkCookie() {
    let user = getCookie("token");
    if (user == "") {
        showUserLogout();
    } else {
        showUserLogin();
    }
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

// hiển thị giao diện chưa đăng nhập
function showUserLogout() {
    $(".avatar-logout").show(500);
    $(".avatar-login").hide(500);
    $(".nav-user-detail").empty();
    $(".nav-user-detail").append(`
        <a href="register.html" style="color: white !important">Đăng ký</a>/<a href="login.html" style="color: white !important">Đăng nhập</a>
    `);
}

// hiển thị giao diện đã đăng nhập
function showUserLogin() {
    var vToken = getCookie("token");
    var vUserDtail = parseJwtUser(vToken);
    callApiGetDataUser(vUserDtail.user.userId);
}

// lấy thông tin user theo Id
function callApiGetDataUser(paramUserId) {
    $.ajax({
        url: gURL_USER + `/${paramUserId}`,
        method: "get",
        success: function (responseUser) {
            $(".avatar-logout").hide(500);
            $(".avatar-login").show(500);
            $(".avatar-login").attr("src", responseUser.photos);
            $(".nav-user-detail").empty();
            $(".nav-user-detail").css("margin-top", "33px")
            $(".nav-user-detail").append(`
                <div class="w3-container my-2">
                    <img src=${responseUser.photos} alt="Avatar" class="w3-left w3-circle"style="width: 32px; height: 32px">
                    <label class="mt-1 px-2" style="cursor: pointer;"><a class ="ms-2" href = "userDetail.html?userId=${responseUser.id}" style="color: white !important">${responseUser.username}</a></label>
                </div>
                <div class= "border-top border-primary mt-0"></div>
                <ul class="w3-ul">  
                    <li class="w3-hover-text-blue btn-user-orderDetail" id = ${responseUser.customer.id} style="cursor: pointer;">Đơn hàng của tôi</li>
                    <li class="w3-hover-text-red btn-logout" style="cursor: pointer;">Đăng xuất</li>
                </ul>
            `);
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
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

// xoá cookie đăng xuất
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

