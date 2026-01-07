/*
 * Application logic for the Charlotte landing page. This script implements
 * internationalisation (i18n) between German and English, restores the
 * selected language from localStorage, and updates the UI without reloading
 * the page. It also wires up the contact form to build a mailto link
 * containing the user's entries and prevents invalid submissions. Finally,
 * the script handles closing modals with the Escape key and updates the
 * copyright year in the footer.
 */

(() => {
  'use strict';

  /**
   * Translation dictionary. Each key corresponds to a data-i18n value in
   * the HTML. When adding new keys to the markup, ensure both languages
   * include translations here.
   */
  const translations = {
    de: {
      'a11y.skip': 'Zum Inhalt springen',
      'nav.cta': 'Anfragen',
      'hero.eyebrow': 'Für DACH-Solo-Consultants, Coaches & Kreative',
      'hero.title': 'KI-Draft rein. Menschliche Landingpage-Copy raus.',
      'hero.subtitle': 'Ich verfeinere AI-Entwürfe zu klaren, markenkonformen Texten: ohne Fluff, mit Struktur und starker CTA. Lieferung in 48–72 Stunden.',
      'hero.ctaPrimary': 'Kostenlose 3 Text-Verbesserungen',
      'hero.ctaSecondary': 'Pakete ansehen',
      'hero.badge1': 'Klar & konvertierend',
      'hero.badge2': 'Brand Voice (DE/EN)',
      'hero.badge3': '48–72h Delivery',
      'hero.cardTitle': 'Schneller Einstieg',
      'hero.cardText': 'Preis ab \u20AC249 (mit AI-Draft) oder ab \u20AC349 (from scratch) — je nach Umfang.',
      'hero.cardBullet1': 'Starke Headlines & Nutzenargumentation',
      'hero.cardBullet2': 'Saubere Struktur (sektioniert)',
      'hero.cardBullet3': 'CTA-Logik & Tonalität passend zur Marke',
      'hero.cardCta': 'Unverbindlich anfragen',

      'what.title': 'Was ich mache',
      'what.subtitle': 'Aus Drafts werden Texte, die nach Mensch klingen — und nach deinem Business aussehen.',
      'what.card1.title': 'AI-Entwürfe humanisieren',
      'what.card1.b1': 'Glätte raus, Persönlichkeit rein',
      'what.card1.b2': 'Kürzer, klarer, präziser',
      'what.card1.b3': 'Natürliches Deutsch (DACH-tauglich)',
      'what.card2.title': 'Struktur & Conversion',
      'what.card2.b1': 'Headline → Nutzen → Beweis → CTA',
      'what.card2.b2': 'Abschnitte, die scannbar sind',
      'what.card2.b3': 'Ein roter Faden, der verkauft',
      'what.card3.title': 'Brand-Alignment',
      'what.card3.b1': 'Ton & Haltung: seriös, warm oder kantig',
      'what.card3.b2': 'Einheitliche Begriffe & Versprechen',
      'what.card3.b3': 'Optional: DE/EN Varianten',

      'offer.title': 'Package B — Landingpage Copy',
      'offer.subtitle': 'Für eine Seite, die schnell verstanden wird — und klar sagt, was als Nächstes passieren soll.',
      'offer.deliverablesTitle': 'Lieferumfang',
      'offer.deliverable1': '1 komplette Landingpage-Copy (strukturierte Sections)',
      'offer.deliverable2': '2–3 Headline-Varianten + Subheadline',
      'offer.deliverable3': 'Nutzen-Blöcke, Einwände, Social Proof-Platzhalter',
      'offer.deliverable4': 'CTA-Texte + Button-Microcopy',
      'offer.deliverable5': 'Kurz-SEO: Title/Meta-Description-Vorschlag',
      'offer.detailsTitle': 'Details',
      'offer.timeLabel': 'Lieferzeit',
      'offer.timeValue': '48–72 Stunden',
      'offer.priceLabel': 'Preis',
      'offer.priceValue': 'ab \u20AC249 (mit AI-Draft) / ab \u20AC349 (from scratch)',
      'offer.formatLabel': 'Format',
      'offer.formatValue': 'Google Doc / Markdown / Plain Text',
      'offer.note': 'Du bekommst Text, der sich lesen lässt — und der dich nicht nach Copy-Generator aussehen lässt.',
      'offer.cta': 'Verfügbarkeit anfragen',

      'samples.title': 'Beispiele',
      'samples.subtitle': 'Platzhalter-Samples: So sieht “Before → After” typischerweise aus.',
      'samples.card1.title': 'Sample 1 — Klarheit & Fokus',
      'samples.before': 'Before',
      'samples.card1.beforeText': '“Ich helfe dir dabei, deine Online-Präsenz zu verbessern und deine Ziele zu erreichen.”',
      'samples.after': 'After',
      'samples.card1.afterText': '“Ich schreibe Landingpages für Solo-Consultants, die in 10 Sekunden verstanden werden — und Anfragen auslösen.”',
      'samples.card1.b1': 'Vage Aussagen entfernt',
      'samples.card1.b2': 'Zielgruppe konkretisiert',
      'samples.card1.b3': 'Messbarer Nutzen (10 Sekunden) ergänzt',
      'samples.card1.b4': 'Stärkeres Verb + aktiver Ton',
      'samples.card1.b5': 'CTA-Logik angedeutet (Anfragen)',
      'samples.card2.title': 'Sample 2 — Struktur & CTA',
      'samples.card2.beforeText': '“Meine Dienstleistungen umfassen Strategie, Beratung und Umsetzung. Lass uns sprechen.”',
      'samples.card2.afterText': '“Du bekommst eine klare Seitenstruktur + Copy, die dein Angebot auf den Punkt bringt. Ergebnis: mehr passende Leads. Nächster Schritt: 15-Min-Check.”',
      'samples.card2.b1': 'Leistung in Ergebnis übersetzt',
      'samples.card2.b2': 'Konkrete Deliverables genannt',
      'samples.card2.b3': 'Nutzen priorisiert statt Buzzwords',
      'samples.card2.b4': 'Satzlängen variiert für Rhythmus',
      'samples.card2.b5': 'CTA als klarer nächster Schritt',

      'process.title': 'Ablauf',
      'process.subtitle': 'Schlank, fokussiert, ohne Agentur-Overhead.',
      'process.step1.title': 'Kurz-Briefing',
      'process.step1.text': 'Du schickst Draft/Notizen, Zielgruppe, Angebot, Tonalität und ggf. Beispiele.',
      'process.step2.title': 'Rewrite & Struktur',
      'process.step2.text': 'Ich baue eine klare Seitenlogik und schreibe die Copy so, dass sie nach dir klingt.',
      'process.step3.title': 'Lieferung',
      'process.step3.text': 'Du bekommst den finalen Text in 48–72h — plus 1 kurze Korrekturrunde.',

      'faq.title': 'FAQ',
      'faq.subtitle': 'Die häufigsten Fragen — kurz beantwortet.',
      'faq.q1': 'Kannst du auch komplett ohne AI-Draft starten?',
      'faq.a1': 'Ja. “From scratch” startet ab \u20AC349 — du bekommst trotzdem eine klare Struktur und Copy, die nach Mensch klingt.',
      'faq.q2': 'Wie stellst du sicher, dass es nach meiner Marke klingt?',
      'faq.a2': 'Ich arbeite mit kurzen Brand-Signalen (Wörter, No-Gos, Beispiele, Ton). Dann rewrite ich konsequent auf diese Leitplanken.',
      'faq.q3': 'Was brauchst du von mir, um loszulegen?',
      'faq.a3': 'Website/Angebot, Zielgruppe, gewünschte CTA, plus ggf. Draft/Notizen. Mehr muss es nicht sein.',

      'contact.title': 'Kontakt',
      'contact.subtitle': 'Schreib mir kurz, worum es geht — ich antworte mit nächstem Schritt und grober Einschätzung.',
      'contact.form.name': 'Name',
      'contact.form.namePh': 'Dein Name',
      'contact.form.nameHint': 'Pflichtfeld',
      'contact.form.email': 'E-Mail',
      'contact.form.emailPh': 'name@domain.com',
      'contact.form.emailHint': 'Pflichtfeld',
      'contact.form.website': 'Website URL',
      'contact.form.websitePh': 'https://…',
      'contact.form.websiteHint': 'Optional',
      'contact.form.message': 'Nachricht',
      'contact.form.messagePh': 'Kurz: Angebot, Ziel, Deadline, ob AI-Draft vorhanden ist.',
      'contact.form.messageHint': 'Pflichtfeld',
      'contact.form.submit': 'Mail öffnen',
      'contact.form.note': 'Kein Backend: Beim Absenden öffnet sich dein E-Mail-Programm mit vorausgefüllter Nachricht.',
      'contact.side.title': 'Schnelle Orientierung',
      'contact.side.b1': 'Lieferung: 48–72h',
      'contact.side.b2': 'Preis: ab \u20AC249 / ab \u20AC349',
      'contact.side.b3': 'Fokus: klare Struktur + klare CTA',
      'contact.side.small': 'E-Mail-Ziel: <span class="mono">hello@example.com</span> (Platzhalter)',
      'contact.error': 'Bitte fülle alle Pflichtfelder aus.',
      'contact.email.subject': 'Anfrage: Landingpage Copy',

      'footer.copy': '©',
      'footer.impressum': 'Impressum',
      'footer.privacy': 'Datenschutz',

      'modal.impressum.title': 'Impressum',
      'modal.impressum.body': '<p><strong>Platzhalter-Text</strong></p><p>Angaben gemäß § 5 TMG (Beispiel): Name, Anschrift, Kontakt.</p><p>Bitte ersetze diesen Text durch dein echtes Impressum.</p>',
      'modal.privacy.title': 'Datenschutz',
      'modal.privacy.body': '<p><strong>Platzhalter-Text</strong></p><p>Diese Seite nutzt kein Tracking. Beim Kontaktformular wird eine E-Mail über dein Mail-Programm erstellt (mailto:).</p><p>Bitte ersetze diesen Text durch deine echte Datenschutzerklärung.</p>',
      'modal.close': 'Schließen'
    },
    en: {
      'a11y.skip': 'Skip to content',
      'nav.cta': 'Inquire',
      'hero.eyebrow': 'For DACH solo consultants, coaches & creatives',
      'hero.title': 'AI draft in. Human landing page copy out.',
      'hero.subtitle': 'I refine AI drafts into clear, brand‑aligned copy: fluff‑free, structured and with a strong CTA. Delivered in 48–72 hours.',
      'hero.ctaPrimary': '3 free text improvements',
      'hero.ctaSecondary': 'View packages',
      'hero.badge1': 'Clear & converting',
      'hero.badge2': 'Brand voice (DE/EN)',
      'hero.badge3': '48–72h delivery',
      'hero.cardTitle': 'Quick start',
      'hero.cardText': 'Price from €249 (with AI draft) or from €349 (from scratch) — depending on scope.',
      'hero.cardBullet1': 'Strong headlines & value proposition',
      'hero.cardBullet2': 'Clean structure (sectioned)',
      'hero.cardBullet3': 'CTA logic & tone matching your brand',
      'hero.cardCta': 'Request without obligation',

      'what.title': 'What I do',
      'what.subtitle': 'Turning drafts into copy that sounds human — and looks like your business.',
      'what.card1.title': 'Humanize AI drafts',
      'what.card1.b1': 'Remove smoothing, add personality',
      'what.card1.b2': 'Shorter, clearer, more precise',
      'what.card1.b3': 'Natural German (DACH‑friendly)',
      'what.card2.title': 'Structure & conversion',
      'what.card2.b1': 'Headline → value → proof → CTA',
      'what.card2.b2': 'Sections that can be scanned',
      'what.card2.b3': 'A narrative thread that sells',
      'what.card3.title': 'Brand alignment',
      'what.card3.b1': 'Tone & attitude: serious, warm or edgy',
      'what.card3.b2': 'Consistent terminology & promises',
      'what.card3.b3': 'Optional: DE/EN versions',

      'offer.title': 'Package B — Landing page copy',
      'offer.subtitle': 'For a page that’s quickly understood — and clearly states what happens next.',
      'offer.deliverablesTitle': 'Deliverables',
      'offer.deliverable1': '1 complete landing page copy (structured sections)',
      'offer.deliverable2': '2–3 headline variants + subheadline',
      'offer.deliverable3': 'Benefit blocks, objections, social proof placeholders',
      'offer.deliverable4': 'CTA texts + button microcopy',
      'offer.deliverable5': 'Quick SEO: title/meta description suggestion',
      'offer.detailsTitle': 'Details',
      'offer.timeLabel': 'Delivery time',
      'offer.timeValue': '48–72 hours',
      'offer.priceLabel': 'Price',
      'offer.priceValue': 'from €249 (with AI draft) / from €349 (from scratch)',
      'offer.formatLabel': 'Format',
      'offer.formatValue': 'Google Doc / Markdown / Plain Text',
      'offer.note': 'You get copy that reads well — and doesn’t make you look like a copy generator.',
      'offer.cta': 'Check availability',

      'samples.title': 'Samples',
      'samples.subtitle': 'Placeholder samples: This is typically what “Before → After” looks like.',
      'samples.card1.title': 'Sample 1 — Clarity & focus',
      'samples.before': 'Before',
      'samples.card1.beforeText': '“I help you improve your online presence and achieve your goals.”',
      'samples.after': 'After',
      'samples.card1.afterText': '“I write landing pages for solo consultants that are understood in 10 seconds — and trigger inquiries.”',
      'samples.card1.b1': 'Removed vague statements',
      'samples.card1.b2': 'Specified the audience',
      'samples.card1.b3': 'Added measurable benefit (10 seconds)',
      'samples.card1.b4': 'Stronger verb + active tone',
      'samples.card1.b5': 'Hinted at CTA logic (inquiries)',
      'samples.card2.title': 'Sample 2 — Structure & CTA',
      'samples.card2.beforeText': '“My services include strategy, consulting and implementation. Let’s talk.”',
      'samples.card2.afterText': '“You get a clear page structure + copy that gets your offer across. Result: more qualified leads. Next step: 15-minute check.”',
      'samples.card2.b1': 'Translated service into outcome',
      'samples.card2.b2': 'Named concrete deliverables',
      'samples.card2.b3': 'Prioritized benefits instead of buzzwords',
      'samples.card2.b4': 'Varied sentence length for rhythm',
      'samples.card2.b5': 'CTA as a clear next step',

      'process.title': 'Process',
      'process.subtitle': 'Lean, focused, without agency overhead.',
      'process.step1.title': 'Short briefing',
      'process.step1.text': 'You send draft/notes, target group, offer, tone and examples if available.',
      'process.step2.title': 'Rewrite & structure',
      'process.step2.text': 'I build a clear page logic and write the copy so that it sounds like you.',
      'process.step3.title': 'Delivery',
      'process.step3.text': 'You receive the final copy in 48–72h — plus one brief revision round.',

      'faq.title': 'FAQ',
      'faq.subtitle': 'The most frequently asked questions — briefly answered.',
      'faq.q1': 'Can you also start completely without an AI draft?',
      'faq.a1': 'Yes. “From scratch” starts from €349 — you still get a clear structure and copy that sounds human.',
      'faq.q2': 'How do you ensure it sounds like my brand?',
      'faq.a2': 'I work with short brand signals (words, no-gos, examples, tone). Then I rewrite consistently within these guardrails.',
      'faq.q3': 'What do you need from me to get started?',
      'faq.a3': 'Website/offer, target audience, desired CTA, plus draft/notes if available. That’s all.',

      'contact.title': 'Contact',
      'contact.subtitle': 'Write me briefly about what it’s about — I’ll reply with the next step and a rough estimate.',
      'contact.form.name': 'Name',
      'contact.form.namePh': 'Your name',
      'contact.form.nameHint': 'Required',
      'contact.form.email': 'Email',
      'contact.form.emailPh': 'name@domain.com',
      'contact.form.emailHint': 'Required',
      'contact.form.website': 'Website URL',
      'contact.form.websitePh': 'https://…',
      'contact.form.websiteHint': 'Optional',
      'contact.form.message': 'Message',
      'contact.form.messagePh': 'Briefly: offer, goal, deadline, whether AI draft is available.',
      'contact.form.messageHint': 'Required',
      'contact.form.submit': 'Open mail',
      'contact.form.note': 'No backend: When submitting, your mail program opens with a prefilled message.',
      'contact.side.title': 'Quick orientation',
      'contact.side.b1': 'Delivery: 48–72h',
      'contact.side.b2': 'Price: from €249 / from €349',
      'contact.side.b3': 'Focus: clear structure + clear CTA',
      'contact.side.small': 'Email target: <span class="mono">hello@example.com</span> (placeholder)',
      'contact.error': 'Please fill all required fields.',
      'contact.email.subject': 'Request: Landing page copy',

      'footer.copy': '©',
      'footer.impressum': 'Imprint',
      'footer.privacy': 'Privacy policy',

      'modal.impressum.title': 'Imprint',
      'modal.impressum.body': '<p><strong>Placeholder text</strong></p><p>Information according to § 5 TMG (example): name, address, contact.</p><p>Please replace this text with your real legal notice.</p>',
      'modal.privacy.title': 'Privacy',
      'modal.privacy.body': '<p><strong>Placeholder text</strong></p><p>This page uses no tracking. The contact form creates an email via your mail program (mailto:).</p><p>Please replace this text with your real privacy policy.</p>',
      'modal.close': 'Close'
    }
  };

  /**
   * Apply translations to the page based on the current language.
   * @param {string} lang Language code ("de" or "en").
   */
  function applyTranslations(lang) {
    // update text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = translations[lang] && translations[lang][key];
      if (value) el.textContent = value;
    });
    // update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = translations[lang] && translations[lang][key];
      if (value) el.setAttribute('placeholder', value);
    });
    // update HTML content (for modals)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const value = translations[lang] && translations[lang][key];
      if (value) el.innerHTML = value;
    });
  }

  /**
   * Set the active language and persist it to localStorage.
   * @param {string} lang Language code to set.
   */
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    // update aria-pressed on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    applyTranslations(lang);
  }

  // Determine initial language
  let currentLang = localStorage.getItem('lang') || 'de';

  // Wait for DOM content to ensure all elements exist
  window.addEventListener('DOMContentLoaded', () => {
    // Bind language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang && lang !== currentLang) setLanguage(lang);
      });
    });

    // Apply translations on load
    setLanguage(currentLang);

    // Update year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form handler
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        if (!name || !email || !message) {
          alert(translations[currentLang]['contact.error']);
          return;
        }
        const website = form.website.value.trim();
        const subject = encodeURIComponent(translations[currentLang]['contact.email.subject'] || 'Anfrage');
        const lines = [];
        lines.push(`${translations[currentLang]['contact.form.name'] || 'Name'}: ${name}`);
        lines.push(`${translations[currentLang]['contact.form.email'] || 'E-Mail'}: ${email}`);
        if (website) lines.push(`${translations[currentLang]['contact.form.website'] || 'Website'}: ${website}`);
        lines.push(`${translations[currentLang]['contact.form.message'] || 'Nachricht'}:`);
        lines.push(message);
        // join with newlines; encodeURIComponent will escape them appropriately
        const body = encodeURIComponent(lines.join('\n'));
        const mailto = `mailto:hello@example.com?subject=${subject}&body=${body}`;
        // Open mail client
        window.location.href = mailto;
      });
    }

    // Close modals on escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const hash = window.location.hash;
        if (hash && hash !== '#top' && hash !== '') {
          window.location.hash = '#top';
        }
      }
    });
  });
})();
