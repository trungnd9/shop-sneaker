/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
"use strict";
// const gURL_RATING = "http://localhost:8080/rating/review";

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
// hiển thị đánh giá và nhận xét sản phẩm
loadRatingAndReview();

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// khai báo hiển thị đánh giá và nhận xét sản phẩm
function loadRatingAndReview() {
    const vUrlParams = new URLSearchParams(window.location.search);
    const vProductId = vUrlParams.get('id');
    callApiGetListRating(vProductId);
}


/*** REGION 4 - Common funtions - Vùng khais báo hàm dùng chung trong toàn bộ chương trình*/
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
        $("#show-review").empty();
        var vSum = 0
        for (var i = 0; i < paramResponRating.length; i++) {
            vSum += parseInt(paramResponRating[i].rating, 10);
            $("#show-review").append(`
                <div class="row">
                    <div class="col-sm-12">
                        <hr />
                        <div class="review-block">
                            <div class="row">
                                <div class="col-2 user-rating">
                                    <img src=${paramResponRating[i].ordersDetail.userPhoto}
                                        class="rounded-circle" style="width: 32px; height: 32px">
                                    <div class="review-block-name d-inline"><a href="#">${paramResponRating[i].ordersDetail.userName}</a></div>
                                    <div class="review-block-date">${formatDate(paramResponRating[i].updatedAt)}</div>
                                </div>
                                <div class="col">
                                    <div class="review-block-rate ${paramResponRating[i].rating}-star" id = "${paramResponRating[i].rating}-star">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div class="review-block-description">${paramResponRating[i].review}</div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            `);
        }
        $("#average-rating").html((vSum / paramResponRating.length).toFixed(1));
        $("#total-rating").html(paramResponRating.length);
        var vStar = $(".rating");
        var vAverage = (vSum / paramResponRating.length);
        if (vAverage == 1) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage == 2) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage == 3) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage == 4) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage == 5) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
            `);
        }
        if (vAverage >= 1.1 && vAverage <= 1.9) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-alt text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage >= 2.1 && vAverage <= 2.9) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-alt text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage >= 3.1 && vAverage <= 3.9) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-alt text-warning"></i>
                <i class="far fa-star"></i>
            `);
        }
        if (vAverage >= 4.1 && vAverage <= 4.9) {
            vStar.empty();
            vStar.append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star-half-alt text-warning"></i>
            `);
        }
        var vOneStar = ((countElement(1, paramResponRating) / paramResponRating.length) * 100).toString() + `%`;
        var vTowStar = ((countElement(2, paramResponRating) / paramResponRating.length) * 100).toString() + `%`;
        var vThreeStar = ((countElement(3, paramResponRating) / paramResponRating.length) * 100).toString() + `%`;
        var vFourStar = ((countElement(4, paramResponRating) / paramResponRating.length) * 100).toString() + `%`;
        var vFiveStar = ((countElement(5, paramResponRating) / paramResponRating.length) * 100).toString() + `%`;
        $("#one-star").css("width", vOneStar);
        $("#two-star").css("width", vTowStar);
        $("#three-star").css("width", vThreeStar);
        $("#four-star").css("width", vFourStar);
        $("#five-star").css("width", vFiveStar);

        if ($(".1-star").attr("id") == "1-star") {
            $(".1-star").empty();
            $(".1-star").append(`
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if ($(".2-star").attr("id") == "2-star") {
            $(".2-star").empty();
            $(".2-star").append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if ($(".3-star").attr("id") == "3-star") {
            $(".3-star").empty();
            $(".3-star").append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            `);
        }
        if ($(".4-star").attr("id") == "4-star") {
            $(".4-star").empty();
            $(".4-star").append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="far fa-star"></i>
            `);
        }
        if ($(".5-star").attr("id") == "5-star") {
            $(".5-star").empty();
            $(".5-star").append(`
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
            `);
        }
    }
    else {
        $("#show-rating").css("display", "none");
        $("#show-review").empty();
        $("#show-review").append(`
            <div> Chưa có đánh giá
        `)
    }

}

// Đếm sơ lượng rating
function countElement(item, array) {
    var count = 0;
    $.each(array, function (i, v) { if (v.rating == item) count++; });
    return count;
}

// định dạng ngày
function formatDate(paramDate) {
    var date = moment(paramDate).format("YYYY-MM-DD  HH:mm");
    return date;
}


