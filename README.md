# George's Bloom & Broom — website

Static website for GitHub Pages, with an interactive garden, a lawnmower scrollbar and an email enquiry form.

## File structure

- `index.html` — semantic HTML, the main page and enquiry form
- `styles.css` — organised responsive styling
- `script.js` — accessible navigation, garden interactions and mower scrollbar
- `assets/` — illustrations, logo, gallery and before/after example assets

## Form: enquiries to George

The form in `index.html` posts directly to **FormSubmit**:

    action="https://formsubmit.co/matticusblack@gmail.com"

This is an external form-delivery service. It is *not* a server hosted by GitHub.

**Important: activate delivery before sharing the website.**

1. Publish the site on GitHub Pages (see below).
2. Submit the form once using test details (do not use real customer information).
3. George should check `matticusblack@gmail.com` for a FormSubmit activation email, including Spam/Junk.
4. George must open the activation message and approve the form.
5. Submit another test enquiry from the published site and verify that it arrives.

Before activation, submissions may not be delivered to his inbox. We have not
sent or tested an actual email to George from this packaged site.

**Privacy:** Visitors' names, emails, optional phone/postcode, and messages
are submitted to the third-party FormSubmit service. Include a suitable privacy
notice and obtain George's approval before publishing the form for customers.

FormSubmit references:
- https://formsubmit.co/
- https://formsubmit.co/documentation
- https://formsubmit.co/help

## GitHub Pages

1. Extract the ZIP; upload the *contents* (not the parent folder or the ZIP) to the root of `bolgsven/georges-bloom-and-broom`.
2. Replace the old `index.html`, add the new `styles.css`, `script.js` and `assets/` folder.
3. In Settings > Pages, publish the `main` branch from `/(root)`.
4. Open `https://bolgsven.github.io/georges-bloom-and-broom/` and test navigation, interactive features and the form.

The previous Jellivale website's old `css/` directory is not needed once the new layout has been verified.

## Before going live

- Confirm George's approved services and service area.
- Replace illustrative before/after examples with real project photos where appropriate.
- Confirm the privacy notice and activation of the email form.
- Do not publish fictional testimonials or claim illustrative samples are completed work.
