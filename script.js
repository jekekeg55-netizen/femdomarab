function playVideo(videoPath, title) {
    const player = document.getElementById("videoPlayer");
    const videoTitle = document.getElementById("videoTitle");

    player.src = videoPath;
    videoTitle.textContent = title;

    player.play();

    document.getElementById("playerSection").scrollIntoView({
        behavior: "smooth"
    });
}


// البحث
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();
    const cards = document.querySelectorAll(".video-card");

    cards.forEach(function (card) {

        const title = card.dataset.title.toLowerCase();

        if (title.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
});