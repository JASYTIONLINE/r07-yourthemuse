/*
 * Student reading notes: This script queries the live DOM with getElementById, then addEventListener registers a
 * handler on the form's submit event. preventDefault stops the browser's default form submission (which would reload
 * or navigate). Setting confirmation.hidden to false changes a boolean attribute on a paragraph element so it
 * participates in layout again; form.reset() mutates input values in place. No elements are created or destroyed.
 */
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
