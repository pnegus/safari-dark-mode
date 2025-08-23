//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isTextDark() {
    const computedStyles = window.getComputedStyle(document.body)
//    .color.match(/\d+/g);
//    console.log(computedStyles);
    rgb = computedStyles.getPropertyValue("color").match(/\d+/g);
    console.log(rgb);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    console.log(luminance)
    return luminance < 0.2;
}

function isAlreadyDarkTheme() {
    try {
        const rootComputedStyles = window.getComputedStyle(document.documentElement);
        const colorScheme = window.getComputedStyle(document.documentElement).getPropertyValue('color-scheme');
        if (colorScheme.includes('dark')) {
            return true;
        }
    }
    catch (e) {
        return false;
    }
    return false;
}

setTimeout(() => {
    if (!isAlreadyDarkTheme() && isTextDark()) {
        console.log('activating dark mode')
        document.documentElement.classList.add('sdm_dark_mode');
    }

    /* defined in preload.css and loaded by preload.js */
    document.documentElement.classList.remove('sdm_dark_mode_preload');
}, 100);
