const videos = [
  {
    id: 1,
    title: "فيديو مترجم 1",
    description: "وصف الفيديو الأول.",
    player: "https://player.mediadelivery.net/play/728993/22bfdfca-9d32-417b-82a3-3579f028532e"
  },

  {
    id: 2,
    title: "فيديو مترجم 2",
    description: "وصف الفيديو الثاني.",
    player: "https://player.mediadelivery.net/play/728993/9e7744d7-1ffd-42fb-ad71-d7d7eb2480f7"
  },

  {
    id: 3,
    title: "فيديو مترجم 3",
    description: "وصف الفيديو الثالث.",
    player: "https://player.mediadelivery.net/play/728993/a803a574-e935-48a9-b650-b5332cf68502"
  }
];


/* =========================
   إنشاء صورة تلقائية للكارت
========================= */

function createThumbnail(video) {
  return `
    <div class="thumbnail generated-thumbnail">
      <div class="thumbnail-content">
        <span class="thumbnail-brand">هيمنة العرب</span>
        <span class="thumbnail-play">▶</span>
        <strong>${video.title}</strong>
      </div>
    </div>
  `;
}


/* =========================
   عرض الفيديوهات
========================= */

function renderVideos(list, container) {
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <p class="no-results">
        لا توجد فيديوهات مطابقة للبحث.
      </p>
    `;
    return;
  }

  list.forEach(video => {
    const card = document.createElement("article");

    card.className = "video-card";

    card.innerHTML = `
      ${createThumbnail(video)}

      <div class="video-info">
        <h3>${escapeHTML(video.title)}</h3>
        <p>${escapeHTML(video.description)}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href =
        "./watch.html?id=" +
        encodeURIComponent(video.id);
    });

    container.appendChild(card);
  });
}


/* =========================
   حماية النصوص
========================= */

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================
   الصفحة الرئيسية
========================= */

const videosGrid =
  document.getElementById("videosGrid");

if (videosGrid) {
  renderVideos(videos, videosGrid);

  const videoCount =
    document.getElementById("videoCount");

  if (videoCount) {
    videoCount.textContent =
      `${videos.length} فيديو`;
  }
}


/* =========================
   البحث
========================= */

const searchInput =
  document.getElementById("searchInput");

if (searchInput && videosGrid) {
  searchInput.addEventListener("input", function () {

    const query =
      this.value
        .toLowerCase()
        .trim();

    const results =
      videos.filter(video =>
        video.title
          .toLowerCase()
          .includes(query)
      );

    renderVideos(
      results,
      videosGrid
    );

    const videoCount =
      document.getElementById("videoCount");

    if (videoCount) {
      videoCount.textContent =
        `${results.length} فيديو`;
    }
  });
}


/* =========================
   صفحة المشاهدة
========================= */

const player =
  document.getElementById("player");

if (player) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const id =
    Number(params.get("id"));

  const video =
    videos.find(
      item => item.id === id
    );

  if (!video) {

    window.location.href =
      "./index.html";

  } else {

    document.title =
      `${video.title} | هيمنة العرب`;

    const title =
      document.getElementById(
        "videoTitle"
      );

    if (title) {
      title.textContent =
        video.title;
    }

    const description =
      document.getElementById(
        "videoDescription"
      );

    if (description) {
      description.textContent =
        video.description;
    }

    if (
      video.player &&
      video.player.startsWith("http")
    ) {
      player.src = video.player;
    }

    renderRelatedVideos(video.id);
  }
}


/* =========================
   الفيديوهات المقترحة
========================= */

function renderRelatedVideos(currentId) {

  const container =
    document.getElementById(
      "relatedVideos"
    );

  if (!container) return;

  container.innerHTML = "";

  const related =
    videos.filter(
      video =>
        video.id !== currentId
    );

  related.forEach(video => {

    const item =
      document.createElement("div");

    item.className =
      "related-card";

    item.innerHTML = `
      ${createThumbnail(video)}

      <div class="related-title">
        ${escapeHTML(video.title)}
      </div>
    `;

    item.addEventListener("click", () => {

      window.location.href =
        "./watch.html?id=" +
        encodeURIComponent(video.id);

    });

    container.appendChild(item);
  });
}


/* =========================
   زر الإعجاب
========================= */

const likeButton =
  document.getElementById(
    "likeButton"
  );

if (likeButton) {

  likeButton.addEventListener(
    "click",
    function () {

      if (
        this.classList.contains("liked")
      ) {
        return;
      }

      const count =
        document.getElementById(
          "likeCount"
        );

      if (count) {
        count.textContent =
          Number(count.textContent || 0) + 1;
      }

      this.classList.add("liked");
    }
  );
}
