const codeToInject = `
(function() {
    if (window.__autoplayBlocked) return;
    window.__autoplayBlocked = true;

    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function() {
        const isUserInteraction = window.event && (
                    window.event.type === 'click' || 
                    window.event.type === 'keydown' ||
                    window.event.type === 'mousedown' ||
                    window.event.type === 'touchstart'
                );

        if (isUserInteraction) {
            return originalPlay.apply(this, arguments);
        } else {
            console.warn('ShadowDOM Autoplay blocked by Safari Extension');
            
            return Promise.reject(new DOMException('The play() request was interrupted by an extension.', 'NotAllowedError'));
        }
    };
})();
`;

const script = document.createElement('script');
script.textContent = codeToInject;

const existingScriptWithNonce = document.querySelector('script[nonce]');
if (existingScriptWithNonce) {
    script.setAttribute('nonce', existingScriptWithNonce.nonce || existingScriptWithNonce.getAttribute('nonce'));
}

(document.head || document.documentElement).appendChild(script);

script.remove();
