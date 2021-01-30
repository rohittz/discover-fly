// updating subtotal, vat and total
var totalForConfirmation;
function increaseDecrease(inputBoxId, isincrease) {
    var inputBox = document.getElementById(inputBoxId);
    var currentVal = readvalue(inputBoxId, true);
    if (isincrease) {
        inputBox.value++;
    }
    else {
        if (currentVal > 0) {
            inputBox.value--;
        }
    }
    var updatedSubtotal = updateSubtotal();
    var updatedVat = updateVat(updatedSubtotal);
    var updatedTotal = updateTotal(updatedSubtotal, updatedVat);
    totalForConfirmation = updatedTotal;
}
function readvalue(id, isvalue) {
    var currentVal;
    if (isvalue) {
        currentVal = parseFloat(document.getElementById(id).value);
    }
    else {
        currentVal = parseFloat(document.getElementById(id).innerText);
    }
    return currentVal;
}
function updateSubtotal() {
    var currentFirstCount = readvalue("first-count", true);
    var currentEconomyCount = readvalue("economy-count", true);
    var updatedSubtotal = currentFirstCount * 150 + currentEconomyCount * 100;
    document.getElementById("subtotal").innerText = updatedSubtotal;
    return updatedSubtotal;
}
function updateVat(updatedSubtotal) {
    var updatedVat = updatedSubtotal * 0.1;
    document.getElementById("vat").innerText = updatedVat;
    return updatedVat;
}
function updateTotal(updatedSubtotal, updatedVat) {
    var updatedTotal = updatedSubtotal + updatedVat;
    document.getElementById("total").innerText = updatedTotal;
    return updatedTotal;
}
function showConfirmation() {
    var mainForm = document.getElementById("mainForm");
    // document.getElementById("booking-form").style.backgroundColor = "gray";
    var confirmation = document.getElementById("confirmation");
    mainForm.style.display = "none";
    confirmation.style.display = "flex";
}
document.getElementById("first-increase").addEventListener("click", function () {
    increaseDecrease("first-count", true);
});
document.getElementById("first-decrease").addEventListener("click", function () {
    increaseDecrease("first-count", false);
});
document.getElementById("economy-increase").addEventListener("click", function () {
    increaseDecrease("economy-count", true);
});
document.getElementById("economy-decrease").addEventListener("click", function () {
    increaseDecrease("economy-count", false);
});
document.getElementById("booknow").addEventListener("click", function (event) {
    if (totalForConfirmation > 0)
        showConfirmation();
    else
        alert("Please add at least one ticket!")
});