const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

const date = document.getElementById("date");
const year = new Date().getFullYear();

function copyright() {
	if (date) {
		date.textContent = year;
	}
}

function menuToggle() {
	if (open) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				const isActive = body.classList.toggle("menu_active");
				if (isActive) {
					open.setAttribute("aria-expanded", "true");
				} else {
					open.setAttribute("aria-expanded", "false");
				}
			});
		});
	}
}

const searchButtons = document.querySelectorAll(".button_search");
const search = document.querySelector(".open_search");

function searchToggle() {
	if (search) {
		searchButtons.forEach((btn) => {
			btn.addEventListener("click", () => {
				const isSearch = body.classList.toggle("search_active");
				if (isSearch) {
					search.setAttribute("aria-expanded", "true");
				} else {
					search.setAttribute("aria-expanded", "false");
				}
			});
		});
	}
}

function escapeToggle() {
	if (open || search) {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && (body.classList.contains("menu_active") || body.classList.contains("search_active"))) {
				body.classList.remove("menu_active");
				body.classList.remove("search_active");
				open.setAttribute("aria-expanded", "false");
				search.setAttribute("aria-expanded", "false");
			}
		});
	}
}

const onScroll = document.querySelector(".on_scroll");
function onPageScroll() {
	const observer = new IntersectionObserver(
		([entry]) => {
			body.classList.toggle("scrolled", !entry.isIntersecting);
		},
		{ rootMargin: "35px 0px 0px 0px" }
	);
	observer.observe(onScroll);
}

function initSliders() {
	const sliderWraps = document.querySelectorAll(".slider_wrap");

	sliderWraps.forEach((wrap) => {
		const slider = wrap.querySelector(".slider");
		if (!slider) return;

		const slides = Array.from(slider.querySelectorAll(".slide"));

		const prevBtn = wrap.querySelector(".previous");
		const nextBtn = wrap.querySelector(".next");

		let current = slides.findIndex((s) => s.classList.contains("active"));
		if (current === -1) current = 0;

		function goTo(index) {
			if (!slides.length) return;
			slides.forEach((s, i) => s.classList.toggle("active", i === index));
		}

		if (prevBtn) {
			prevBtn.addEventListener("click", () => {
				current = (current - 1 + slides.length) % slides.length;
				goTo(current);
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", () => {
				current = (current + 1) % slides.length;
				goTo(current);
			});
		}

		// Keyboard support: left/right arrows when focus is inside the slider wrap
		wrap.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") {
				if (prevBtn) prevBtn.click();
			} else if (e.key === "ArrowRight") {
				if (nextBtn) nextBtn.click();
			}
		});

		// Initialize
		goTo(current);
	});
}

function initMediaPlayers() {
	const mediaCards = document.querySelectorAll(".card.media");

	mediaCards.forEach((card) => {
		const figure = card.querySelector(".figure");
		if (!figure) return;

		const video = figure.querySelector("video");
		const poster = figure.querySelector("img");
		const playBtn = figure.querySelector(".play_button");
		const stopBtn = figure.querySelector(".stop_button");

		if (!video || !playBtn) return;

		// Ensure video is hidden until played (poster visible)
		video.style.display = "none";

		function showVideo() {
			poster && (poster.style.display = "none");
			video.style.display = "";
			video.setAttribute("aria-hidden", "false");
		}

		function showPoster() {
			video.pause();
			video.currentTime = 0;
			video.style.display = "none";
			video.setAttribute("aria-hidden", "true");
			poster && (poster.style.display = "");
		}

		playBtn.addEventListener("click", () => {
			if (video.paused) {
				showVideo();
				video.play();
				playBtn.setAttribute("aria-pressed", "true");
				playBtn.setAttribute("aria-label", "Pause video");
				if (stopBtn) stopBtn.hidden = false;
			} else {
				video.pause();
				playBtn.setAttribute("aria-pressed", "false");
				playBtn.setAttribute("aria-label", "Play video");
			}
		});

		if (stopBtn) {
			stopBtn.addEventListener("click", () => {
				showPoster();
				playBtn.setAttribute("aria-pressed", "false");
				playBtn.setAttribute("aria-label", "Play video");
				stopBtn.hidden = true;
			});
		}

		// When the video ends naturally, revert to poster
		video.addEventListener("ended", () => {
			showPoster();
			playBtn.setAttribute("aria-pressed", "false");
			playBtn.setAttribute("aria-label", "Play video");
			if (stopBtn) stopBtn.hidden = true;
		});

		// Pause video if user navigates away from page/tab
		document.addEventListener("visibilitychange", () => {
			if (document.hidden && !video.paused) {
				video.pause();
				playBtn.setAttribute("aria-pressed", "false");
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	copyright();
	menuToggle();
	searchToggle();
	escapeToggle();
	onPageScroll();
	initSliders();
	initMediaPlayers();
});
