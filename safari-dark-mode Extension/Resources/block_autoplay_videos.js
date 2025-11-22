//
//  block_autoplay_videos.js
//  safari-dark-mode
//
//  Created by Patrick Negus on 11/4/25.
//

//function blockAutoplay() {
//    const videos = document.querySelectorAll('video');
//    videos.forEach(video => {
//        if (!video.paused) {
//            video.pause();
//        }
//        if (video.hasAttribute('autoplay')) {
//            video.removeAttribute('autoplay');
//        }
//    });
//}

//function observeForNewVideos() {
//    const observer = new MutationObserver(() => {
//        blockAutoplay();
//    });
//    observer.observe(document.documentElement, { childList: true, subtree: true });
//}

//setTimeout(() => {
//    blockAutoplay();
////    observeForNewVideos();
//}, 1000);

//{
//    "matches": ["<all_urls>"],
//    "css": ["preload.css"],
//    "js": ["block_autoplay_videos.js"],
//    "run_at": "document_end",
//    "all_frames": true
//}
