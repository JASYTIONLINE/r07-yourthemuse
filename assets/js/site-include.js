/**
 * Shared top and bottom navigation for all pages.
 *
 * On <html>:
 *   - data-site-section: "root" (index.html) or "contents" (pages under contents/)
 *   - data-site-page: "home" | "more-info" | "catalog" | "order" for aria-current on that item;
 *     any other value (e.g. a new page) still gets the same footer and nav; only current-page highlighting skips unknown ids.

 * Student reading notes: document.documentElement is the <html> node; its dataset property reflects data-* attributes.
 * Assigning to element.innerHTML replaces all child nodes of #site-nav-inner, #site-footer-inner, and optionally
 * #site-call-to-action with newly parsed markup. Layout of those links is
 * entirely determined by CSS on .site-nav-inner and .site-footer-nav, not by this script.
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
        moreInfo: 'contents/more-info.html#top',
        catalog: 'contents/catalog.html#top',
        order: 'contents/order.html#top',
      };
    }
    return {
      home: '../index.html',
      moreInfo: 'more-info.html#top',
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
      p.moreInfo +
      '"' +
      currentAttr(page, 'more-info') +
      '>More Info</a><a href="' +
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

  function renderCallToAction(section) {
    var p = paths(section);
    var orderFormHref =
      section === 'contents' ? 'order.html#sample-order' : 'contents/order.html#sample-order';
    return (
      '<p class="text-center">When you\'re ready, browse my <a href="' +
      p.catalog +
      '">Sample Catalog</a> for ideas or, if you already know what you want, <a href="' +
      orderFormHref +
      '">Place Your Custom Order</a> and let me create a one-of-a-kind song that is truly yours. Have a question? No problem — just <a href="' +
      CONTACT_MAILTO +
      '">contact me</a> via email, and I\'ll answer any questions you have.</p>'
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
      p.moreInfo +
      '"' +
      currentAttr(page, 'more-info') +
      '>More Info</a><a href="' +
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
    var cta = document.getElementById('site-call-to-action');
    if (navInner) navInner.innerHTML = renderTopNav(page, section);
    if (footerInner) footerInner.innerHTML = renderFooter(page, section);
    if (cta) cta.innerHTML = renderCallToAction(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
