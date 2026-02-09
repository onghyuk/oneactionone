window.unlock = function() {
    const correct = "1234";   // 원하는 비밀번호
    const input = document.getElementById("pw").value;
    const blur  = document.getElementById("blurContent");
    const box   = document.getElementById("pwBox");

    if(input === correct){
        blur.classList.remove("locked");
        box.style.display = "none";   // 입력창 숨기기
    } else {
        alert("Wrong password");
    }
}