# Improve accessible names and touch targets in the Book Theme

## Problem

At narrow widths the Search button hides its text and can lose its accessible
name. A logo configured without a text label can render without alternative
text. When logo alt text is supplied, the home link name can still append
“Made with MyST.” Author email and ORCID icons have small touch targets. Some
visible labels also differ from the accessible names. For example, a button
showing an author's name is announced as “Author Details,” which makes the
visible name harder to use with voice control.

Observed with MyST 1.13.0 and Book Theme 2.0.0.
[MyST Theme source commit](https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9)

## Steps to reproduce

1. Create a two-page book with light and dark logos, an author with email and
   ORCID fields, and a numbered figure and table. Give one page a title with
   inline math.
2. At a 412 CSS pixel viewport, inspect the accessibility tree for Search,
   the home link, the author button, the figure and table permalinks, and the
   page footer links. Repeat the home link check with `site.options.logo_alt`
   set. Inspect the size and spacing of the inline author icon links.

## Expected behavior

Icon-only controls should have useful names. Controls with visible text
should include that text in their accessible names. Author links should have
at least 24 × 24 CSS pixel targets or sufficient spacing.

## Suggested resolution

Give the icon-only search button a “Search” name and use the site title as
fallback logo alt text for both logo variants. When the image names the home
link, omit the hidden “Made with MyST” fallback text. Use the rendered text
when naming author buttons, numbered figure and table links, and previous and
next links. Add padding or spacing around the email and ORCID links.

## Verification

- [ ] Check accessible names on mobile and desktop in both color modes,
  including a numbered figure and a page title containing math.
- [ ] Check author link size or spacing. Open and close Search and the author
  popover by keyboard and confirm focus returns to the trigger.
