//
//  content.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 8/20/25.
//

function hasDarkAttribute() {
    const elements = [document.documentElement, document.body];
    for (let el of elements) {
        if (!el) continue;
        if (typeof el.className === 'string' && el.className.toLowerCase().includes('dark')) {
            return true;
        }
        for (let attr of el.attributes) {
            if (attr.value.toLowerCase().includes('dark')) {
                return true;
            }
            if (attr.name.toLowerCase().includes('dark')) {
                return true;
            }
        }
    }
    return false;
}

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
    if (!hasDarkAttribute() && isTextDark())
    {
        document.documentElement.classList.add('sdm_filter');
    }
    document.documentElement.classList.remove('sdm_preload');
}, 50);

//do one more check for slow loading sites
setTimeout(() => {
    if (hasDarkAttribute())
    {
        document.documentElement.classList.remove('sdm_filter');
    }
}, 1000);
