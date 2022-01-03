
(function ($) {
    "use strict";
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    const gURL_USER = "http://localhost:8080/users";
    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */

    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
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

    var input = $('.validate-input .input100');

    // submit form
    $('.validate-form').on('submit', function (event) {
        var vCheck = true;
        var vUser = {
            username: "",
            password: "",
            customerFirstname: "",
            customerLastname: "",
            phoneNumber: "",
            roles: [2]
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
            callApiCreateUser(vUser);
        }
        event.preventDefault();
    });

    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

    //thu thập data trên form
    function getDataUser(paramUser) {
        paramUser.customerFirstname = $('#inp-firstname').val().trim();
        paramUser.customerLastname = $('#inp-lastname').val().trim();
        paramUser.username = $('#inp-username').val().trim();
        paramUser.phoneNumber = $('#inp-phone').val().trim();
        paramUser.password = $("#inp-password").val().trim();
    }

    // gọi Api tạo user
    function callApiCreateUser(paramUser) {
        $.ajax({
            url: gURL_USER + `/register`,
            type: "POST",
            data: JSON.stringify(paramUser),
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $(".alert").show();
                resetFormRegister();
            },
            error: function (errors) {
                if (errors.status === 400) {
                    showAlert("error", errors.responseText, 3000);
                }
                else {
                    showAlert("error", errors.responseText, 3000);
                }
            }
        });
    }

    // kiểm tra data trên input đã được nhập chưa
    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    // validate form
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

    // hiển thị thông báo lỗi 
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    // ẩn thông báo lỗi
    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    // reset form
    function resetFormRegister() {
        $('#inp-firstname').val("");
        $('#inp-lastname').val("");
        $('#inp-username').val("");
        $('#inp-phone').val("");
        $("#inp-password").val("");
    }


})(jQuery);