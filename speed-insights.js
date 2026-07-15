// Vercel Speed Insights initialization
// This script initializes Speed Insights for static sites
(function() {
  'use strict';
  
  // Speed Insights queue initialization
  if (!window.si) {
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }
  
  // Load the Speed Insights script from Vercel's CDN
  // This will be automatically configured when Speed Insights is enabled in the Vercel dashboard
  var script = document.createElement('script');
  script.src = '/_vercel/speed-insights/script.js';
  script.defer = true;
  
  // Add error handling
  script.onerror = function() {
    console.warn('Speed Insights: Script failed to load. Make sure Speed Insights is enabled in your Vercel project settings.');
  };
  
  document.head.appendChild(script);
})();
