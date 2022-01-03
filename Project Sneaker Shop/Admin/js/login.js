// Region 1: Global variables
const gURL_USER = "http://localhost:8080/users";

// Region 2:  Event execute element
$(document).ready(function () {

    checkCookie();

    $("body").on("click", ".btn-logout", function () {
        onBtnLogoutUser();
    });

    $("body").on("click", ".btn-change-password", function () {
        onBtnChangePassword();
    });
});
// Region 3: Event handlers
// đăng xuất tài khoản
function onBtnLogoutUser() {
    deleteCookie("token");
    window.location.href = "/login.html";
}

// đổi mật khẩu
function onBtnChangePassword() {
    showAlert("error", "Xin lỗi! chức năng chưa hoạt động");
}
// Region 4: Common funtion
// show popup user
function loginUser() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
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

// hiển thị giao diện chưa đăng nhập
function showUserLogout() {
    Swal.fire({
        title: 'Bạn chưa đăng nhập?',
        text: "Trang quản lý cần phải đăng nhập!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/login.html";
        }
    });
    window.location.href = "/login.html";
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
            $("#user-image").attr("src", `/${responseUser.photos}`);
            $("#show-username").html(`${responseUser.employee.lastName} ${responseUser.employee.firstName}`);
            $("#Demo").empty();
            $("#Demo").append(`
                <div class="w3-container mt-2 w3-dark user-detail">
                    <img src="/${responseUser.photos}" alt="Avatar" class="w3-left w3-circle mt-1 mr-3"
                        style="width: 30px;height: 30px; cursor: pointer;">
                    <p class="pt-1 mt-1 px-2" style="cursor: pointer;"><a href="userDetail.html?userId=${responseUser.id}" class ="ms-3 w3-text-black w3-hover-text-green"id = ${responseUser.id}>${responseUser.username}</a></p>
                </div>
                <div class= "border border-primary mt-0"></div>
                <ul class="w3-ul mt-2 ">
                    <li class="w3-hover-text-blue btn-change-password" style="cursor: pointer;">Đổi mật khẩu</li>
                    <li class="w3-hover-text-red btn-logout" style="cursor: pointer;">Đăng xuất</li>
                </ul>
            `)
        },
        error: function () {
            showAlert("error", "Xin lỗi hệ thống quá tải, vui lòng thử lại");
        }
    });
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
}

// xoá cookie đăng xuất
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

