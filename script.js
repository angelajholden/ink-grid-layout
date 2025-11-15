const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

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

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	searchToggle();
	escapeToggle();
	onPageScroll();
});
