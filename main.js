$(document).ready(function () {
  $(".items").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
  });
});

window.addEventListener("load", () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".home-section").classList.add("active");

  document.querySelector(".page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 600);
});
