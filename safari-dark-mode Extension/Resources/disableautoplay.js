const codeToInject = `
(function() {
    if (window.__autoplayBlocked) return;
    window.__autoplayBlocked = true;

    let lastInteractionTime = 0;
    const ALLOWED_DELAY_MS = 500; 

    const interactionEvents = [
        'click'
    ];

    const recordInteraction = (e) => {
        if (e.isTrusted) {
            lastInteractionTime = Date.now();
        }
    };

    interactionEvents.forEach(eventType => {
        window.addEventListener(eventType, recordInteraction, { capture: true, passive: true });
    });


    const originalPlay = HTMLMediaElement.prototype.play;

    HTMLMediaElement.prototype.play = function() {
        const now = Date.now();
        const timeSinceInteraction = now - lastInteractionTime;
        if (timeSinceInteraction <= ALLOWED_DELAY_MS) {
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
