// src/scripts/accessibility.js
document.addEventListener("DOMContentLoaded", () => {
  // wait-for helper
  const waitFor = (selector, cb) => {
    const el = document.querySelector(selector);
    if (el) return cb(el);
    setTimeout(() => waitFor(selector, cb), 50);
  };

  // once the icon is injected...
  waitFor("#accessibility-toggle", (icon) => {
    const menu = document.getElementById("accessibility-menu");
    const contrast = document.getElementById("toggle-contrast");
    const text = document.getElementById("toggle-text");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeVal = document.getElementById("volume-value"); // visibl val

    icon.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    contrast.addEventListener("change", e => {
      document.body.classList.toggle("high-contrast", e.target.checked);
    });

    text.addEventListener("change", e => {
      document.body.classList.toggle("large-text", e.target.checked);
    });

    volumeSlider.addEventListener("input", e => {
      const vol = parseFloat(e.target.value);
      // sets each sfx obj .volume property
      if (window.sfxList) {
        window.sfxList.forEach(a => {a.volume = vol;});
      }
      updateVolumeDisplay(vol);
    });

    function updateVolumeDisplay(vol) {
      volumeVal.textContent = `${Math.round(vol * 100)}%`;
    }
  });
});
