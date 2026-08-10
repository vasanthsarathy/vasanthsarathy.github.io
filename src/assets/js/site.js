/* Site behaviour: the § section index, scroll-spy, and entrance reveals.
   Everything here is enhancement — with JS off the page is fully readable and
   the index simply never appears. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     § index
     Sections come from explicit <section id> blocks, or — on blog posts,
     where the content is markdown — from the anchored <h2>s themselves.
     --------------------------------------------------------------------- */

  /* KaTeX renders each formula twice — once as MathML for screen readers,
     once as HTML — so a raw textContent read doubles up every equation in a
     heading. Drop the MathML copy before reading the label. */
  function labelText(el) {
    var clone = el.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll('.katex-mathml'), function (n) {
      n.parentNode.removeChild(n);
    });
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function collectSections(main) {
    var explicit = Array.prototype.slice.call(main.querySelectorAll(':scope > section[id]'));
    if (explicit.length) {
      return explicit.map(function (el) {
        var heading = el.querySelector('h2');
        return {
          el: el,
          id: el.id,
          numbered: true,
          label: el.getAttribute('data-index') || (heading ? labelText(heading) : el.id)
        };
      });
    }

    /* Prose pages (blog posts) index their own headings. Those often carry
       the author's numbering already, so the index doesn't add its own. */
    return Array.prototype.slice.call(main.querySelectorAll('h2[id]')).map(function (h) {
      return { el: h, id: h.id, numbered: false, label: labelText(h) };
    });
  }

  function buildIndex(nav, sections) {
    var numbered = nav.getAttribute('data-numbering') !== 'none' && sections[0].numbered;
    var list = document.createElement('ol');
    list.className = 'section-index-list';

    sections.forEach(function (section, i) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + section.id;

      if (numbered) {
        var num = document.createElement('span');
        num.className = 'si-num';
        num.textContent = '§' + i;
        link.appendChild(num);
      }

      var label = document.createElement('span');
      label.className = 'si-label';
      label.textContent = section.label.trim();
      link.appendChild(label);

      item.appendChild(link);
      list.appendChild(item);

      section.link = link;
      section.item = item;
    });

    nav.appendChild(list);
    nav.hidden = false;
  }

  /* Active section = the last one whose top has passed the reading line. */
  function spy(sections) {
    var readingLine = window.innerHeight * 0.3;
    var active = sections[0];

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= readingLine) {
        active = sections[i];
      }
    }

    sections.forEach(function (section) {
      var on = section === active;
      section.item.classList.toggle('is-active', on);
      if (on) {
        section.link.setAttribute('aria-current', 'true');
      } else {
        section.link.removeAttribute('aria-current');
      }
    });
  }

  function initIndex() {
    var nav = document.querySelector('.section-index');
    var main = document.getElementById('main');
    if (!nav || !main) return;

    var sections = collectSections(main);
    if (sections.length < 2) return;

    buildIndex(nav, sections);

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        spy(sections);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    spy(sections);
  }

  /* ---------------------------------------------------------------------
     Entrance reveals
     One reveal unit per section, unless the section holds a run of repeated
     items (cards, publications) — those stagger individually instead, so the
     rhythm of the list is what you notice rather than the block.
     --------------------------------------------------------------------- */

  var STAGGER_ITEMS = '.app-card, .gallery-item, .publication, .research-property, .pipeline li, .selected-work li, .recent-posts li, .post-list-item';

  function initReveals() {
    var main = document.getElementById('main');
    if (!main || reduceMotion) return;

    var targets = [];
    /* The hero is animated by CSS as a page-load sequence, so it is excluded. */
    var blocks = main.querySelectorAll(':scope > section, :scope > article');

    if (blocks.length) {
      Array.prototype.forEach.call(blocks, function (block) {
        var items = block.querySelectorAll(STAGGER_ITEMS);
        if (items.length > 1) {
          Array.prototype.forEach.call(items, function (item, i) {
            item.style.transitionDelay = Math.min(i, 8) * 45 + 'ms';
            targets.push(item);
          });
        } else {
          targets.push(block);
        }
      });
    }

    if (!targets.length) return;

    targets.forEach(function (el) { el.classList.add('reveal'); });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el) {
      /* Anything already above the viewport — a deep link, or a restored
         scroll position — has no reveal to play. Show it outright. */
      if (el.getBoundingClientRect().bottom < 0) {
        el.style.transitionDelay = '';
        el.classList.add('is-revealed');
        return;
      }
      observer.observe(el);
    });
  }

  function init() {
    initIndex();
    initReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
