/* Clynia Reviews · filtro de reseñas (sin dependencias).
   Las reseñas viven en el HTML (bien para SEO y LLM); aquí solo
   se muestran u ocultan segun el chip activo. */
(function () {
  "use strict";

  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var reviews = Array.prototype.slice.call(document.querySelectorAll(".review"));
  var countEl = document.querySelector(".filters__count");
  if (!chips.length || !reviews.length) return;

  function matches(review, filter) {
    var stars = parseInt(review.getAttribute("data-stars"), 10);
    if (filter === "all") return true;
    if (filter === "critic") return stars <= 3;
    return String(stars) === filter;
  }

  function apply(filter) {
    var shown = 0;
    reviews.forEach(function (review) {
      var ok = matches(review, filter);
      review.hidden = !ok;
      if (ok) shown += 1;
    });
    if (countEl) {
      countEl.textContent = shown === 1
        ? "Mostrando 1 reseña"
        : "Mostrando " + shown + " reseñas";
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      apply(chip.getAttribute("data-filter"));
    });
  });
})();
