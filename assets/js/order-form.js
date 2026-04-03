(function () {
  const form = document.getElementById("orderForm");
  const confirmation = document.getElementById("confirmation");
  if (!form || !confirmation) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    confirmation.hidden = false;
    form.reset();
  });
})();
