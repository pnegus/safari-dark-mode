//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isColorLight(colorString) {
    const rgb = colorString.match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance > 0.2;
}

document.documentElement.classList.add('sdm_dark_mode_preload');

window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
    if (isColorLight(backgroundColor)) {
        document.documentElement.classList.add('sdm_dark_mode');
    }
    document.documentElement.classList.remove('sdm_dark_mode_preload');
});
