/**
 * Cubik Builder - Mobile Detection Module
 * @module mobile
 * @description Detects mobile devices and shows video placeholder
 * @version 1.0
 */
(function() {
  'use strict';

  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
  }

  /**
   * Show video placeholder and hide main content
   */
  function showMobilePlaceholder() {
    // Hide all body content
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.display = 'none';
    }

    // Create video container
    var container = document.createElement('div');
    container.id = 'mobileVideoContainer';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;';

    // Create video element
    var video = document.createElement('video');
    video.id = 'mobileVideo';
    video.src = 'Video/plug.mp4';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.style.cssText = 'max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;';

    container.appendChild(video);
    document.body.appendChild(container);

    // Try to play (handle autoplay restrictions)
    video.play().catch(function() {
      // If autoplay blocked, add click to play
      container.addEventListener('click', function() {
        video.play();
      }, { once: true });
    });
  }

  // Check on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (isMobile()) {
        showMobilePlaceholder();
      }
    });
  } else {
    if (isMobile()) {
      showMobilePlaceholder();
    }
  }

  // Export for external use
  window.CubikMobile = {
    isMobile: isMobile,
    showPlaceholder: showMobilePlaceholder
  };

})();
