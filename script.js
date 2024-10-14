// Hàm kiểm tra tính hợp lệ của số nhập vào
function validateInput(input) {
    const value = input.value.trim();
    const isValid = !isNaN(value) && value !== "";

    if (!isValid) {
        // Nếu không hợp lệ, thông báo lỗi
        updateNotification("Vui lòng nhập một số hợp lệ.");
        input.classList.add('border-red-500');
    } else {
        // Nếu hợp lệ, xóa thông báo lỗi
        updateNotification(""); // Không hiển thị thông báo
        input.classList.remove('border-red-500');
    }
}

function formatLargeNumber(num) {
    const positiveInfinity = "\u221E"; // ∞
    const negativeInfinity = "-\u221E"; // -∞
    let result = num;
    if (num === Infinity) {
        result = positiveInfinity;
    } else if (num === -Infinity) {
        result = negativeInfinity;
    }
    return result;

}
// Hàm cập nhật thông báo
function updateNotification(message) {
    document.getElementById('notification').innerText = message;
}

// Hàm cập nhật kết quả
function updateResult(result) {
    document.getElementById('result').innerText = result; // Cập nhật kết quả
}

// Hàm tính toán
function calculate() {
    const firstNumber = document.getElementById('firstNumber').value;
    const secondNumber = document.getElementById('secondNumber').value;

    // Lấy giá trị phép toán từ nút chọn
    const operation = document.querySelector('input[name="operation"]:checked')?.value;

    // Kiểm tra tính hợp lệ của các đầu vào
    if (!firstNumber || !secondNumber) {
        updateNotification("Vui lòng nhập cả hai số.");
        updateResult(""); // Xóa kết quả
        return;
    }

    // Chuyển đổi đầu vào thành số
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
        updateNotification("Vui lòng nhập số hợp lệ.");
        updateResult(""); // Xóa kết quả
        return;
    }

    if (!operation) {
        updateNotification("Vui lòng chọn phép toán.");
        updateResult(""); // Xóa kết quả
        return;
    }

    let result;
    const epsilon = 1e-10;
    // Thực hiện phép toán dựa trên lựa chọn
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (Math.abs(num2) < epsilon) {
                updateNotification("Không thể chia cho 0.");
                updateResult(""); // Xóa kết quả
                return; // Trả về ngay sau khi cập nhật thông báo
            }
            result = num1 / num2;
            break;
        default:
            updateNotification("Vui lòng chọn phép toán.");
            updateResult(""); // Xóa kết quả
            return;
    }

    // Hiển thị kết quả
    updateResult(`Kết quả: ${formatLargeNumber(result)}`); // Cập nhật kết quả
    updateNotification(""); // Xóa thông báo lỗi nếu có
}

// Thêm sự kiện cho nút Tính
document.getElementById('calculateBtn').addEventListener('click', calculate);

// Thêm sự kiện cho các ô nhập để kiểm tra tính hợp lệ
document.getElementById('firstNumber').addEventListener('blur', function () {
    validateInput(this);
});
document.getElementById('secondNumber').addEventListener('blur', function () {
    validateInput(this);
});
