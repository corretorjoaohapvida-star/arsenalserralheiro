'use strict';
function updatePromotionDate() {
  const bar = document.getElementById('promotion-bar');
  if (!bar) return;
  const now = new Date();
  const timeZone = 'America/Sao_Paulo';
  const weekday = new Intl.DateTimeFormat('pt-BR', {weekday: 'long', timeZone}).format(now).replace('-feira', '');
  const date = new Intl.DateTimeFormat('pt-BR', {day: 'numeric', month: 'long', timeZone}).format(now);
  bar.textContent = `🔥 OFERTA DE HOJE (${weekday}, ${date}) 🔥`;
}
updatePromotionDate();
setInterval(updatePromotionDate, 60000);
// Keep anchor destinations below the sticky mobile banner, including safe areas.
const promotionBar = document.getElementById('promotion-bar');
const syncBannerHeight = () => document.documentElement.style.setProperty('--promo-height', `${promotionBar?.offsetHeight || 52}px`);
syncBannerHeight();
if ('ResizeObserver' in window && promotionBar) new ResizeObserver(syncBannerHeight).observe(promotionBar);
else window.addEventListener('resize', syncBannerHeight, {passive: true});
// Pause gallery animation while out of view or when the tab is hidden.
const tracks = Array.from(document.querySelectorAll('.marquee-track'));
const visibleTracks = new Set();
const syncAnimations = () => tracks.forEach(track => track.classList.toggle('is-paused', document.hidden || !visibleTracks.has(track)));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visibleTracks.add(entry.target) : visibleTracks.delete(entry.target));
    syncAnimations();
  });
  tracks.forEach(track => observer.observe(track));
  document.addEventListener('visibilitychange', syncAnimations);
  syncAnimations();
}
// Local preview never loads the Meta Pixel or sends PageView.
const localPreview = ['localhost', '127.0.0.1', '::1'].includes(location.hostname) || location.protocol === 'file:';
if (!localPreview) {
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1098661593061392');
  fbq('track', 'PageView');
}
