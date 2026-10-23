/* The Flight Tech Labs — shared site script
   - Loads /apps.json once and renders any page that asks for it.
   - No frameworks, no build step. Works on Vercel as plain static files. */
(function () {
  'use strict';

  var DL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function chipsFor(app) {
    return [
      app.version ? 'v' + app.version : '',
      app.platform || '',
      app.size || ''
    ].filter(Boolean).map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('');
  }

  function featuresFor(app) {
    var f = app.features || [];
    return f.length ? '<ul class="features">' + f.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '';
  }

  function appCard(app) {
    var note = app.releaseNotes ? '<p class="app-note"><strong>Latest:</strong> ' + esc(app.releaseNotes) + '</p>' : '';
    return (
      '<article class="app">' +
        '<div class="app-top">' +
          '<div class="icon" aria-hidden="true">' + esc(app.monogram || app.name.slice(0, 2)) + '</div>' +
          '<div><h3>' + esc(app.name) + '</h3><p class="tagline">' + esc(app.tagline) + '</p></div>' +
        '</div>' +
        '<p class="desc">' + esc(app.description) + '</p>' +
        featuresFor(app) +
        '<div class="chips">' + chipsFor(app) + '</div>' +
        '<div class="app-foot">' +
          '<a class="btn btn-primary btn-block" href="' + esc(app.file) + '" download="' + esc(app.fileName || '') + '">' + DL_ICON + ' Download for Windows</a>' +
          '<a class="btn btn-ghost btn-sm btn-block" href="/apps/' + esc(app.slug || app.id) + '">View details</a>' +
          note +
        '</div>' +
      '</article>'
    );
  }

  // Fill a detail page from data-attributes.
  //   [data-bind="field"]      -> textContent = app[field]
  //   [data-href]              -> href = app.file, download = app.fileName
  //   [data-list="field"]      -> <li> items from app[field] array (hidden if empty)
  //   [data-screens]           -> screenshot grid from app.screenshots (placeholder if empty)
  function fillDetail(app, root) {
    root.querySelectorAll('[data-bind]').forEach(function (el) {
      var v = app[el.getAttribute('data-bind')];
      el.textContent = v == null || v === '' ? el.getAttribute('data-fallback') || '' : v;
    });
    root.querySelectorAll('[data-href]').forEach(function (el) {
      el.setAttribute('href', app.file);
      el.setAttribute('download', app.fileName || '');
    });
    root.querySelectorAll('[data-list]').forEach(function (el) {
      var items = app[el.getAttribute('data-list')] || [];
      el.innerHTML = items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('');
      el.hidden = !items.length;
    });
    root.querySelectorAll('[data-chips]').forEach(function (el) { el.innerHTML = chipsFor(app); });
    root.querySelectorAll('[data-screens]').forEach(function (el) {
      var shots = app.screenshots || [];
      el.innerHTML = shots.length
        ? shots.map(function (s) { return '<figure class="screen" style="margin:0"><img src="' + esc(s.src) + '" alt="' + esc(s.alt || app.name + ' screenshot') + '" loading="lazy"></figure>'; }).join('')
        : '<div class="screen">Screenshots coming soon</div>';
    });
    document.title = app.name + ' | The Flight Tech Labs';
  }

  function renderChangelog(apps, root) {
    var items = [];
    apps.forEach(function (app) {
      (app.changelog || []).forEach(function (r) { items.push({ app: app, r: r }); });
    });
    if (!items.length) { root.innerHTML = '<p class="state">No releases yet.</p>'; return; }
    root.innerHTML = items.map(function (x) {
      return (
        '<article class="release">' +
          '<div class="release-app">' + esc(x.app.name) + '</div>' +
          '<div class="release-head"><h3>Version ' + esc(x.r.version) + '</h3>' +
          (x.r.date ? '<span class="muted">' + esc(x.r.date) + '</span>' : '') + '</div>' +
          '<ul>' + (x.r.notes || []).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
        '</article>'
      );
    }).join('');
  }

  function siteCard(site) {
    var host = String(site.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    return (
      '<article class="app">' +
        '<div class="app-top">' +
          '<div class="icon" aria-hidden="true">' + esc(site.monogram || site.name.slice(0, 2)) + '</div>' +
          '<div><h3>' + esc(site.name) + '</h3><p class="tagline">' + esc(site.category || host) + '</p></div>' +
        '</div>' +
        '<p class="desc">' + esc(site.about) + '</p>' +
        '<div class="chips"><span class="chip">' + esc(host) + '</span></div>' +
        '<div class="app-foot">' +
          '<a class="btn btn-primary btn-block" href="' + esc(site.url) + '" target="_blank" rel="noopener">Visit site</a>' +
        '</div>' +
      '</article>'
    );
  }

  function initSites() {
    var root = document.querySelector('[data-sites]');
    if (!root) return;
    fetch('/sites.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (sites) {
        root.innerHTML = sites.length
          ? sites.map(siteCard).join('')
          : '<p class="state">No projects listed yet.</p>';
      })
      .catch(function () {
        root.innerHTML = '<p class="state">Could not load the project list. Refresh the page or try again later.</p>';
      });
  }

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  function initNav() {
    var btn = document.querySelector('.menu-toggle');
    var links = document.querySelector('.nav-links');
    if (btn && links) {
      btn.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    }
  }

  function initForms() {
    document.querySelectorAll('form[data-demo]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.querySelector('.hp') && form.querySelector('.hp input').value) return; // honeypot
        showToast('Thanks. Your message is noted. Connect a form backend to receive it.');
        form.reset();
      });
    });
  }

  function init() {
    var y = document.querySelectorAll('[data-year]');
    y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
    initNav();
    initForms();
    initSites();

    var grid = document.querySelector('[data-app-grid]');
    var detail = document.querySelector('[data-app-id]');
    var changelog = document.querySelector('[data-changelog]');
    var counts = document.querySelectorAll('[data-count]');
    var featured = document.querySelector('[data-featured]');
    if (!grid && !detail && !changelog && !counts.length && !featured) return;

    fetch('/apps.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (apps) {
        counts.forEach(function (el) { el.textContent = apps.length; });
        if (grid) {
          grid.innerHTML = apps.length
            ? apps.map(appCard).join('')
            : '<p class="state">No apps published yet. Check back soon.</p>';
        }
        if (featured) {
          featured.innerHTML = apps.slice(0, 3).map(appCard).join('');
        }
        if (detail) {
          var app = apps.filter(function (a) { return a.id === detail.getAttribute('data-app-id'); })[0];
          if (app) fillDetail(app, detail);
          else detail.innerHTML = '<p class="state">App not found. <a href="/apps">Back to all apps</a></p>';
        }
        if (changelog) renderChangelog(apps, changelog);
      })
      .catch(function () {
        var msg = '<p class="state">Could not load the app list. Refresh the page or try again later.</p>';
        if (grid) grid.innerHTML = msg;
        if (featured) featured.innerHTML = msg;
        if (detail) detail.innerHTML = msg;
        if (changelog) changelog.innerHTML = msg;
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
