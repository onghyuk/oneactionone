import { supabase } from "./supabase.js";

const PAGE_PATH = location.pathname;     // 페이지별 스레드 분리 키
const NICK_MIN = 2;
const NICK_MAX = 20;
const MAX_LEN = 500;

const root = document.getElementById("comments");
if (!root) throw new Error("#comments element not found.");

root.innerHTML = `
  <div class="comments-wrap">
    <h3>Comments</h3>

    <div class="comments-form">
      <input id="c_nick" placeholder="닉네임" minlength="${NICK_MIN}" maxlength="${NICK_MAX}" required />
      <textarea id="c_content" placeholder="댓글을 입력하세요" maxlength="${MAX_LEN}" required></textarea>
      <div class="comments-meta">
        <span id="c_count">0 / ${MAX_LEN}</span>
        <button id="c_submit" type="button">등록</button>
      </div>
      <div id="c_msg" class="comments-msg" aria-live="polite"></div>
    </div>

    <ul id="c_list" class="comments-list"></ul>
  </div>
`;

const nickEl = document.getElementById("c_nick");
const contentEl = document.getElementById("c_content");
const countEl = document.getElementById("c_count");
const msgEl = document.getElementById("c_msg");
const listEl = document.getElementById("c_list");
const btnEl = document.getElementById("c_submit");

function setMsg(text) {
  msgEl.textContent = text || "";
}

contentEl.addEventListener("input", () => {
  countEl.textContent = `${contentEl.value.length} / ${MAX_LEN}`;
});

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

async function loadComments() {
  setMsg("불러오는 중…");
  const { data, error } = await supabase
    .from("comments")
    .select("id, page_path, nickname, content, created_at")
    .eq("page_path", PAGE_PATH)
    .order("created_at", { ascending: true });

  if (error) {
    setMsg("댓글을 불러오지 못했습니다.");
    console.error(error);
    return;
  }

  listEl.innerHTML = "";
  if (!data || data.length === 0) {
    setMsg("첫 댓글을 남겨보세요.");
    return;
  }
  setMsg("");

  for (const c of data) {
    const li = document.createElement("li");
    const date = new Date(c.created_at).toLocaleString();
    li.innerHTML = `
      <div class="comment">
        <div class="comment-head">
          <strong>${escapeHtml(c.nickname)}</strong>
          <span class="comment-date">${escapeHtml(date)}</span>
        </div>
        <div class="comment-body">${escapeHtml(c.content)}</div>
      </div>
    `;
    listEl.appendChild(li);
  }
}

async function submitComment() {
  const nickname = nickEl.value.trim();
  const content = contentEl.value.trim();

  if (nickname.length < NICK_MIN) return setMsg(`닉네임은 최소 ${NICK_MIN}자 이상 입력해주세요.`);
  if (content.length === 0) return setMsg("댓글 내용을 입력해주세요.");

  btnEl.disabled = true;
  setMsg("등록 중…");

  const { error } = await supabase.from("comments").insert({
    page_path: PAGE_PATH,
    nickname,
    content
  });

  btnEl.disabled = false;

  if (error) {
    setMsg("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    console.error(error);
    return;
  }

  // 폼 초기화
  contentEl.value = "";
  countEl.textContent = `0 / ${MAX_LEN}`;
  setMsg("");

  await loadComments();
}

btnEl.addEventListener("click", submitComment);
loadComments();
