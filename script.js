const videos = [
  {
    id: 1,
    title: "فيديو مترجم 1",
    description: "وصف الفيديو الأول.",
    thumbnail: "PUT_THUMBNAIL_1_HERE",
    player: "PUT_PLAYER_1_HERE"
  },

  {
    id: 2,
    title: "فيديو مترجم 2",
    description: "وصف الفيديو الثاني.",
    thumbnail: "PUT_THUMBNAIL_2_HERE",
    player: "PUT_PLAYER_2_HERE"
  },

  {
    id: 3,
    title: "فيديو مترجم 3",
    description: "وصف الفيديو الثالث.",
    thumbnail: "PUT_THUMBNAIL_3_HERE",
    player: "PUT_PLAYER_3_HERE"
  }
];


/* =========================
   عرض الفيديوهات
========================= */

function renderVideos(list, container) {

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <p class="no-results">
        لا توجد فيديوهات.
      </p>
    `;
    return;
  }

  list.forEach(video => {

    const card = document.createElement("article");

    card.className = "video-card";

    card.innerHTML = `
      <div class="thumbnail">

        <img
          src="${video.thumbnail}"
          alt="${video.title}"
          loading="lazy"
          onerror="this.style.display='none'"
        >

        <div class="play-icon">
          ▶
        </div>

      </div>

      <div class="video-info">

        <h3>${video.title}</h3>

        <p>${video.description}</p>

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
   الصفحة الرئيسية
========================= */

const videosGrid =
  document.getElementById("videosGrid");

if (videosGrid) {

  renderVideos(
    videos,
    videosGrid
  );

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

  searchInput.addEventListener(
    "input",
    function () {

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
    }
  );
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

    player.src =
      video.player;

    renderRelatedVideos(
      video.id
    );
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
      <div class="related-thumb">

        <img
          src="${video.thumbnail}"
          alt="${video.title}"
          loading="lazy"
        >

      </div>

      <div class="related-title">
        ${video.title}
      </div>
    `;

    item.addEventListener(
      "click",
      () => {

        window.location.href =
          "./watch.html?id=" +
          encodeURIComponent(video.id);

      }
    );

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
        likeButton.classList.contains(
          "liked"
        )
      ) {
        return;
      }

      const count =
        document.getElementById(
          "likeCount"
        );

      if (count) {

        count.textContent =
          Number(
            count.textContent
          ) + 1;
      }

      likeButton.classList.add(
        "liked"
      );
    }
  );
}
