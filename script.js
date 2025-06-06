document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = document.getElementById("language-selector");
  const cvLink = document.getElementById("cv-link");

  // Définir les liens des CV par langue
  const cvLinks = {
    fr: "https://docs.google.com/document/d/1mJp965EWkc1H154GbDfad7YAcD_PbjCYdZ4I7N-jrQY/edit?tab=t.0",
    en: "https://docs.google.com/document/d/1REQQKUOEde9Au6sobVlRxLXPZxpFn1UdAPvtlh6YJ7Y/edit?tab=t.0",
  };

  // Vérifier si une langue est déjà sélectionnée dans localStorage
  const savedLanguage = localStorage.getItem("language") || "en";
  languageSelector.value = savedLanguage;
  updateLanguage(savedLanguage);

  // Écouter les changements de sélection
  languageSelector.addEventListener("change", function () {
    const selectedLanguage = this.value;
    localStorage.setItem("language", selectedLanguage);
    updateLanguage(selectedLanguage);
  });

  function updateLanguage(lang) {
    // Mettre à jour l'attribut lang de l'élément html
    document.documentElement.lang = lang;

    // Mettre à jour le lien du CV
    cvLink.href = cvLinks[lang];

    // Parcourir tous les éléments avec des attributs data-fr ou data-en
    document.querySelectorAll("[data-fr], [data-en]").forEach((element) => {
      if (element.dataset[lang]) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = element.dataset[lang];
        } else {
          element.textContent = element.dataset[lang];
        }
      }
    });
  }
});
