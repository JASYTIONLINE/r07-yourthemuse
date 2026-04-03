/**
 * Shared top and bottom navigation for all pages.
 *
 * On <html>:
 *   - data-site-section: "root" (index.html) or "contents" (pages under contents/)
 *   - data-site-page: "home" | "about" | "catalog" | "order" for aria-current on that item;
 *     any other value (e.g. a new page) still gets the same footer and nav; only current-page highlighting skips unknown ids.
 */
(function () {
  var CONTACT_MAILTO =
    'mailto:jasytionline@gmail.com?subject=' +
    encodeURIComponent('Support Requested: This Is Your Song.') +
    '&body=' +
    encodeURIComponent(
      'Hello,\n\nThank you for contacting This Is Your Song. Please explain in detail what you are looking for and how I can help you. For example, you might describe a custom song idea, ask questions about the process or pricing, or share any other request.\n\nIf you would like me to call you back, please include your phone number in your message below.\n\nPreferred method of contact (please type one):\n- Phone call\n- Email\n\n'
    );

  function paths(section) {
    if (section === 'root') {
      return {
        home: 'index.html#top',
        about: 'contents/about.html#top',
        catalog: 'contents/catalog.html#top',
        order: 'contents/order.html#top',
      };
    }
    return {
      home: '../index.html',
      about: 'about.html#top',
      catalog: 'catalog.html#top',
      order: 'order.html#top',
    };
  }

  function currentAttr(page, key) {
    return page === key ? ' aria-current="page"' : '';
  }

  function renderTopNav(page, section) {
    var p = paths(section);
    return (
      '<a href="' +
      p.home +
      '"' +
      currentAttr(page, 'home') +
      '>Home</a><a href="' +
      p.about +
      '"' +
      currentAttr(page, 'about') +
      '>About</a><a href="' +
      p.catalog +
      '"' +
      currentAttr(page, 'catalog') +
      '>Catalog</a><a href="' +
      p.order +
      '"' +
      currentAttr(page, 'order') +
      '>Order now</a>'
    );
  }

  function renderFooter(page, section) {
    var p = paths(section);
    var orderFormHref =
      section === 'contents' ? 'order.html#sample-order' : 'contents/order.html#sample-order';

    return (
      '<a href="' +
      p.home +
      '"' +
      currentAttr(page, 'home') +
      '>Home</a><a href="' +
      p.about +
      '"' +
      currentAttr(page, 'about') +
      '>About</a><a href="' +
      p.catalog +
      '"' +
      currentAttr(page, 'catalog') +
      '>Catalog</a><a href="' +
      CONTACT_MAILTO +
      '">Contact</a><a href="' +
      orderFormHref +
      '"' +
      currentAttr(page, 'order') +
      '>Order now</a><a href="#top">Back to top</a>'
    );
  }

  function init() {
    var root = document.documentElement;
    var page = root.dataset.sitePage;
    var section = root.dataset.siteSection;
    if (!page || !section) return;

    var navInner = document.getElementById('site-nav-inner');
    var footerInner = document.getElementById('site-footer-inner');
    if (navInner) navInner.innerHTML = renderTopNav(page, section);
    if (footerInner) footerInner.innerHTML = renderFooter(page, section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
