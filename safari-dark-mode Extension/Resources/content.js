//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isColorLight() {
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance > 0.2;
}

function isAlreadyThemed() {
    const rootElem = document.documentElement;
    const darkThemeKeywords = ['dark', 'night', 'dim', 'theme-dark'];
      const classNames = rootElem.className.toLowerCase();
      if (darkThemeKeywords.some(keyword => classNames.includes(keyword))) {
        return true;
      }
      const themeAttribute = (
        rootElem.getAttribute('data-theme') ||
        rootElem.getAttribute('data-bs-theme') ||
        rootElem.getAttribute('data-color-mode') ||
        ''
      ).toLowerCase();
      
      if (darkThemeKeywords.some(keyword => themeAttribute.includes(keyword))) {
        return true;
      }

      try {
        const colorScheme = window.getComputedStyle(rootElem).colorScheme;
        if (colorScheme.includes('dark')) {
          return true;
        }
      } catch (e) {
        return false;
      }
}

/* preload a black overlay */
document.documentElement.classList.add('sdm_dark_mode_preload');

/* add listener on DOM load */
window.addEventListener('DOMContentLoaded', (event) => {
    if (isColorLight()) {
        document.documentElement.classList.add('sdm_dark_mode');
    }
    /* cleanup preload overlay */
    document.documentElement.classList.remove('sdm_dark_mode_preload');
});
