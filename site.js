(function () {
  const video = document.querySelector("[data-background-video]");

  if (!video) return;

  const shouldLoadVideo =
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
    !navigator.connection?.saveData;

  if (!shouldLoadVideo) return;

  const loadVideo = () => {
    video.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
    });

    video.load();
    video.play().catch(() => {});
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadVideo, { timeout: 1800 });
  } else {
    window.addEventListener("load", loadVideo, { once: true });
  }
})();
