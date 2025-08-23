//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isTextDark(rootComputedStyles) {
    rgb = rootComputedStyles.getPropertyValue("color").match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance < 0.3;
}

function isBodyBackgroundDark(bodyComputedStyles) {
    rgb = bodyComputedStyles.getPropertyValue("background-color").match(/\d+/g);
    if (!rgb) {
        return false;
    }
    if (rgb.length === 3) {
        const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
        return luminance < 0.3
    }
    return false;
}

function isAlreadyDarkTheme(rootComputedStyles) {
    try {
        const colorScheme = rootComputedStyles.getPropertyValue('color-scheme');
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
    const bodyComputedStyles = window.getComputedStyle(document.body);
    const rootComputedStyles = window.getComputedStyle(document.documentElement);
    console.log(!isAlreadyDarkTheme(rootComputedStyles));
    console.log(isTextDark(rootComputedStyles));
    console.log(!isBodyBackgroundDark(bodyComputedStyles));
    if (!isAlreadyDarkTheme(rootComputedStyles) && isTextDark(rootComputedStyles) && !isBodyBackgroundDark(bodyComputedStyles))
    {
        console.log('activating dark mode')
        document.documentElement.classList.add('sdm_dark_mode');
    }

    /* defined in preload.css and loaded by preload.js */
    document.documentElement.classList.remove('sdm_dark_mode_preload');
}, 100);
