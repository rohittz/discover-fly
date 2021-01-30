// this variable will be used to detect the total(>0) value needed for confirmation
var totalForConfirmation;

// functionality of + and -
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

// read a value / innerText or value as parameter /
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

// to update the subtotal
function updateSubtotal() {
    var currentFirstCount = readvalue("first-count", true);
    var currentEconomyCount = readvalue("economy-count", true);
    var updatedSubtotal = currentFirstCount * 150 + currentEconomyCount * 100;
    document.getElementById("subtotal").innerText = updatedSubtotal;
    return updatedSubtotal;
}

// to update VAT considering subtotal
function updateVat(updatedSubtotal) {
    var updatedVat = updatedSubtotal * 0.1;
    document.getElementById("vat").innerText = updatedVat;
    return updatedVat;
}

// to update Total considering subtotal and VAT
function updateTotal(updatedSubtotal, updatedVat) {
    var updatedTotal = updatedSubtotal + updatedVat;
    document.getElementById("total").innerText = updatedTotal;
    return updatedTotal;
}

// to check date ( if technically possible :) )
function checkDate() {
    var departureDate = document.getElementById("departure").value;
    var returnDate = document.getElementById("return").value;
    if(departureDate == '' || returnDate == ''){
        return 0;
    }
    departureDate = departureDate.split('-');
    returnDate = returnDate.split('-');
    for (var i = 0; i < 3; i++) {
        returnDate[i] = parseInt(returnDate[i]);
        departureDate[i] = parseInt(departureDate[i]);
    }
    console.log(returnDate[2]);
    // year
    if (returnDate[0] < departureDate[0]) {
        return 0;
    }
    else if (returnDate[0] == departureDate[0]) {
        // month
        if (returnDate[1] < departureDate[1]) {
            return 0;
        }
        else if (returnDate[1] == departureDate[1]) {
            // day
            if (returnDate[2] < departureDate[2])
                return 0;
            else
                return 1;
        }
        else
            return 1;
    }
    else {
        return 1;
    }
}

// to show confirmation after a successful booking
function showConfirmation() {
    var mainForm = document.getElementById("mainForm");
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
    var isvalid = checkDate();
    // Don't wait for correcting date! show confirmation
    if (isvalid == 0)
        alert("Invalid date! Press OK to see confirmation !");
    if (totalForConfirmation > 0)
        showConfirmation();
    else
        alert("Please add at least one ticket!")
});