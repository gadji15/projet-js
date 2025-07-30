// --- Loader global ---
function showLoader() {
    $("#global-loader").fadeIn(100);
}
function hideLoader() {
    $("#global-loader").fadeOut(200);
}

// --- Toast Notification ---
function showToast(message, type) {
    var $toast = $("#toast");
    $toast.stop(true, true); // stop animation
    $toast.removeClass("success error info");
    if (type === "success") $toast.css("background", "linear-gradient(90deg, #27ae60 70%, #3498db 100%)");
    else if (type === "error") $toast.css("background", "linear-gradient(90deg, #e74c3c 70%, #c0392b 100%)");
    else $toast.css("background", "linear-gradient(90deg, #3498db 70%, #232c3d 100%)");
    $toast.text(message).fadeIn(180).delay(1700).fadeOut(700);
}