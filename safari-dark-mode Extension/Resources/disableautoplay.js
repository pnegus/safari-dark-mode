const codeToInject = `
(function() {
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
            return originalPlay.apply(this, arguments)
                .then(() => {
                    this.pause();
                    console.log('shadowdom autoplay blocked');
                })
                .catch(err => {
                });
        }
    };
})();
`;

const script = document.createElement('script');
script.textContent = codeToInject;

(document.head || document.documentElement).appendChild(script);

script.remove();
