//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isAlreadyDarkTheme() {
    const rootComputedStyles = window.getComputedStyle(document.documentElement);
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

function isH2Dark() {
    const titleElement = document.querySelector('h2');
    if (!titleElement) return true;
    const style = window.getComputedStyle(titleElement);
    const color = style.color;
    const rgb = color.match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance < 0.35;
}

function isTextDarkOG() {
    const rootComputedStyles = window.getComputedStyle(document.documentElement);
    rgb = rootComputedStyles.getPropertyValue("color").match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance < 0.3;
}

function isBodyBackgroundDark() {
    const bodyComputedStyles = window.getComputedStyle(document.body);
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

setTimeout(() => {
    if (isTextDarkOG() && !isBodyBackgroundDark() && isH2Dark())
        {
            document.documentElement.classList.add('sdm_filter');
        }
    document.documentElement.classList.remove('sdm_preload');
}, 50);


//do one more check for slow loading sites
setTimeout(() => {
    if (isAlreadyDarkTheme())
    {
        document.documentElement.classList.remove('sdm_filter');
    }
}, 1000);
