const resultsList = document.getElementById('results-list');
const historyList = document.getElementById('history-list');
const spinButton = document.getElementById('spin-button');
const numberCountInput = document.getElementById('number-count');
const usedNumbersCount = document.getElementById('used-numbers-count');

let usedNumbers = new Set();
let spinCount = 0; // Biến đếm số lần quay

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spinWheel(numberCount) {
    const results = [];
    while (results.length < numberCount) {
        const num = getRandomNumber(1, 1910);
        if (!usedNumbers.has(num)) {
            results.push(num);
            usedNumbers.add(num);
        }
    }
    return results;
}

function showNumbersSequentially(results) {
    resultsList.innerHTML = ''; // Xóa kết quả cũ
    results.forEach((num, index) => {
        setTimeout(() => {
            const listItem = document.createElement('li');
            listItem.textContent = num;
            listItem.classList.add('fade-in'); // Thêm hiệu ứng
            resultsList.appendChild(listItem);
        }, index * 500); // Mỗi số xuất hiện cách nhau 500ms
    });
}

function showHistory(results) {
    spinCount++; // Tăng biến đếm số lần quay
    const historyItem = document.createElement('li');
    historyItem.textContent = `Lần quay ${spinCount}: ${results.join(', ')}`;
    historyList.appendChild(historyItem);
}

function updateUsedNumbersCount() {
    usedNumbersCount.textContent = usedNumbers.size; // Cập nhật số lượng số đã quay
}

spinButton.addEventListener('click', () => {
    const numberCount = parseInt(numberCountInput.value, 10); // Lấy số lượng số từ người dùng
    if (usedNumbers.size + numberCount > 1910) {
        alert("Không còn đủ số để quay!");
        return;
    }

    spinButton.disabled = true; // Vô hiệu hóa nút khi đang quay
    resultsList.innerHTML = '<li>Đang quay...</li>'; // Hiển thị trạng thái quay tạm thời

    setTimeout(() => {
        const results = spinWheel(numberCount);

        // Hiển thị số theo thứ tự từ trên xuống
        showNumbersSequentially(results);

        // Ghi vào lịch sử sau khi tất cả số đã quay xong
        setTimeout(() => {
            showHistory(results);
            updateUsedNumbersCount(); // Cập nhật số lượng số đã quay
            spinButton.disabled = false; // Bật lại nút
        }, results.length * 500);
    }, 1000); // Giả lập thời gian quay
});

document.addEventListener('DOMContentLoaded', () => {
    const lotteryMusic = document.getElementById('lottery-music');

    // Kiểm tra nếu nhạc không tự động phát
    const playMusic = () => {
        lotteryMusic.play().catch((error) => {
            console.log("Trình duyệt chặn phát nhạc tự động. Người dùng cần tương tác.");
        });
    };

    // Thử phát nhạc ngay khi trang tải
    playMusic();

    // Lắng nghe sự kiện click trên trang để phát nhạc nếu cần
    document.addEventListener('click', playMusic, { once: true });
});
