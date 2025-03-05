import "./styles/normalize.css";
import "./styles/font.css";
import "./styles/global.css";
import "./styles/variable.css";
import "./styles/theme.css";
import "./styles/index.css";
import Swiper from "swiper";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const coworkersSlider = new Swiper(".coworkers-slider", {
  modules: [Navigation],
  slidesPerView: 3,
  spaceBetween: 100,
  loop: true,
  speed: 1000,
  navigation: {
    nextEl: ".coworkers .swiper-button-next",
    prevEl: ".coworkers .swiper-button-prev",
  },
});

const storySlider = new Swiper(".story-slider", {
  modules: [Autoplay],
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

storySlider.on("slideChange", function () {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("active"));
  document
    .querySelectorAll(`.dot[data-slide="${storySlider.realIndex}"]`)
    .forEach((dot) => dot.classList.add("active"));
});

document.querySelectorAll(".custom-pagination .dot").forEach((dot) => {
  dot.addEventListener("click", function () {
    const slideIndex = Number(this.dataset.slide);

    if (!isNaN(slideIndex)) {
      console.log("Slide Index:", slideIndex);
      storySlider.slideTo(slideIndex);
    } else {
      console.error("Некорректный индекс слайда");
    }
  });
});

// Загружаем API YouTube
(function loadYouTubeAPI() {
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// Переменная для YouTube плеера
let player;

// Делаем функцию глобальной, чтобы YouTube API мог её вызвать
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("videoFrame", {
    events: {
      onReady: onPlayerReady,
    },
  });
};

// Добавляем событие только после готовности плеера
function onPlayerReady() {
  const playButton = document.querySelector(".button__block");
  const svgUse = document.querySelector(".svg__play use");
  const svgElement = document.querySelector(".svg__play");

  if (playButton && svgUse) {
    playButton.addEventListener("click", function () {
      if (player) {
        const playerState = player.getPlayerState(); // Получаем текущее состояние плеера

        if (playerState === YT.PlayerState.PLAYING) {
          player.pauseVideo();
          svgElement.setAttribute("viewBox", "0 0 48 48");
          svgUse.setAttribute("href", "../images/svg/play.svg#play");
        } else {
          player.playVideo();
          svgElement.setAttribute("viewBox", "0 0 64 64");
          svgUse.setAttribute("href", "../images/svg/pause.svg#pause");
        }
      } else {
        console.error("Плеер не инициализирован!");
      }
    });
  } else {
    console.error("Кнопка не найдена!");
  }
}
