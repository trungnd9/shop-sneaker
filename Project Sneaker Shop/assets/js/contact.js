"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
onPageLoading();
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    validateForm();
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function validateForm() {
    $('#form-user-message').submit (() => {
        return false;
    });
    $("#form-user-message").validate({
        rules: {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
        },
        submitHandler: function() {
            handleDataForm();
        }
    });
}

function handleDataForm() {
    $("#alert-success").show();
}
