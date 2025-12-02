//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function isAlreadyDarkTheme() {
    const elementsToCheck = [document.documentElement, document.body].filter(Boolean);
    const darkClasses = ['dark', 'dark-mode', 'theme-dark', 'night'];
    const darkAttributes = ['data-theme', 'data-mode', 'data-color-mode'];

    for (const el of elementsToCheck) {
        const style = window.getComputedStyle(el);
        if (style.colorScheme === 'dark') return true;
        if (darkClasses.some(cls => el.classList.contains(cls))) {
            return true;
        }
        for (const attr of darkAttributes) {
            if (el.getAttribute(attr) === 'dark') {
                return true;
            }
        }
    }
    return false;
}

function getFirstVisibleH2() {
    const allH2s = document.querySelectorAll('h2');
    for (const h2 of allH2s) {
        if (h2.offsetParent === null) continue;
        const style = window.getComputedStyle(h2);
        if (style.visibility === 'hidden' || style.opacity === '0') continue;
        return h2;
    }
    
    return null;
}

function isH2Dark() {
    const titleElement = getFirstVisibleH2();
    if (!titleElement) return true;
    const style = window.getComputedStyle(titleElement);
    const color = style.color;
    const rgb = color.match(/\d+/g);
    if (!rgb) {
        return true;
    }
    const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
    return luminance < 0.5;
}

function isTextDarkOG() {
    const rootComputedStyles = window.getComputedStyle(document.documentElement);
    const rgb = rootComputedStyles.getPropertyValue("color").match(/\d+/g);
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
}, 500);
