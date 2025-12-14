/**
 * Cubik Builder - Mobile Detection Module
 * @module mobile
 * @description Detects mobile devices and shows video placeholder
 * @version 1.1
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
    video.src = 'Video/Plug.mp4';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = true; // Show controls for manual play
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.style.cssText = 'max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;';

    container.appendChild(video);
    document.body.appendChild(container);

    // Try autoplay
    function tryPlay() {
      video.muted = true;
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(function() {
          // Autoplay worked, hide controls
          video.controls = false;
        }).catch(function() {
          // Autoplay blocked, keep controls visible
          video.controls = true;
        });
      }
    }

    // Try to play immediately
    tryPlay();

    // Also try on touch
    container.addEventListener('touchstart', function() {
      tryPlay();
    }, { once: true });

    // And on click
    container.addEventListener('click', function() {
      tryPlay();
    }, { once: true });
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
