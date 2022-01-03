
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })

    deleteCookie("token");
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function (event) {
        event.preventDefault();
        var vCheck = true;
        var vUser = {
            username: "",
            password: ""
        }
        getDataUser(vUser);
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                vCheck = false;
            }
        }
        if (vCheck) {
            event.preventDefault();
            callApiLogin(vUser);
        }
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'name' || $(input).attr('name') == 'name') {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    // thu thap thông tin login
    function getDataUser(paramUser) {
        paramUser.username = $("#inp-username").val().trim();
        paramUser.password = $("#inp-password").val().trim();
    }

    //  goi Api lấy thong tin đăng nhập
    function callApiLogin(paramUser) {
        $.ajax({
            url: gURL_USER + `/login`,
            type: "POST",
            data: JSON.stringify(paramUser),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                handleResponToken(response)
            },
            error: function (errors) {
                showAlert("error", errors.responseText, 3000);  
            }
        });
    }

    // xử lý token respon trả về
    function handleResponToken(paramResponToken) {
        setCookie("token", "Token " + paramResponToken, 1);
        var vToken = parseJwt(paramResponToken);
        var vAuthoritses = vToken.user.authorities;
        if (vAuthoritses.length == 0) {
            window.location.href = "index.html";
        }
        vAuthoritses.forEach(role => {
            if (role == "ROLE_CUSTOMER") {
                window.location.href = "index.html";
            } else if (role == "ROLE_ADMIN" || role == "ROLE_EMPLOYEE") {
                window.location.href = "Admin/customers.html";
            }
        });
    }

    // lưu cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // xử lý lấy thông tin token
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // hiển thị thông báo
    function showAlert(status, message, timer) {
        Swal.fire({
            icon: status,
            html: `<p class="text-black">${message}`,
            showConfirmButton: false,
            timer: timer
        })
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

})(jQuery);