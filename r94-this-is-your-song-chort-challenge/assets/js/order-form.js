(function () {
  const form = document.getElementById("orderForm");
  const confirmation = document.getElementById("confirmation");
  if (!form || !confirmation) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const orderData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      mood: form.mood.value,
      event: form.event.value,
      message: form.message.value,
      lyricsFile: form.lyricsFile?.files[0]?.name || "No file uploaded",
      referenceMp3: form.referenceMp3?.files[0]?.name || "No file uploaded",
    };

    console.log("Client order (demo log):", orderData);
    confirmation.hidden = false;
    form.reset();
  });
})();
