# Give book navigation and author controls accessible names and touch targets

Target repository is `jupyter-book/myst-theme`.

## Reproduction

Open a book-theme site with search, an author popover, email and ORCID links,
numbered figures, and previous/next navigation. In Chromium, use a 412 CSS px
viewport and inspect the accessibility tree or run Lighthouse Accessibility.
The example book exhibits the shared failures across all 57 routes in a
Lighthouse 13.6 mobile crawl. [Example book](https://orbital-mechanics.space/)

## Observed behavior

- `SearchPlaceholderButton` hides its visible “Search” text at small widths
  and the icon-only button has no accessible name.
- `HomeLink` can render an image without an `alt` attribute when no logo
  label is supplied. Both logo variants should have a useful default when
  the site has a title.
- The inline email and ORCID links have overlapping target neighborhoods
  with clickable areas of about 16 × 19 CSS px.
- The author trigger is named “Author Details” while displaying the author's
  name. Figure links are named “Link to this figure” while displaying the
  figure number. Previous/next names can diverge from the visible labels,
  including chapter titles containing math.

## Expected behavior

Expose a name for the mobile search button and a meaningful name for the
home link. Give the author icon links a 24 × 24 CSS px target or equivalent
spacing. Derive accessible names for text-bearing controls from their
rendered labels so speech input can select them by the text on screen.

An automated regression fixture should check mobile and desktop accessible
names for both logo variants, search, author controls, a numbered figure,
and a previous or next link whose title contains math. It should also
exercise keyboard opening, closing, and focus return for the dialogs.
