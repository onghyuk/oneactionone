const PASSWORD = "0126"; // 변경

function showError(on){
  const el = document.getElementById("pwError");
  if(!el) return;
  el.style.display = on ? "block" : "none";
}

window.unlock = function(){
  const input = document.getElementById("pw");
  const blur  = document.getElementById("blurContent");
  const overlay = document.getElementById("pwOverlay");

  if(!input || !blur || !overlay) return;

  if(input.value === PASSWORD){
    blur.classList.remove("locked");
    overlay.style.display = "none";
    showError(false);
  }else{
    showError(true);
    input.select();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 시작 시 blur 잠금 보장
  const blur  = document.getElementById("blurContent");
  if(blur) blur.classList.add("locked");

  // 엔터키로 unlock
  const input = document.getElementById("pw");
  if(input){
    input.addEventListener("keydown", (e) => {
      if(e.key === "Enter") window.unlock();
    });
    input.focus();
  }
});
