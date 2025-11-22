//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isTextDark() {
    const titleElement = document.querySelector('h1') ||
                             document.querySelector('h2') ||
                             document.body;
    if (!titleElement) return false;
    const style = window.getComputedStyle(titleElement);
    const color = style.color;
    const rgb = color.match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance < 0.35;
}

setTimeout(() => {
    if (isTextDark())
    {
        document.documentElement.classList.add('sdm_dark_mode');
    }

    /* defined in preload.css and loaded by preload.js */
    document.documentElement.classList.remove('sdm_dark_mode_preload');
}, 75);
