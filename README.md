STUDENT INFORMATION

| Detail             | INFORMATION     |
| ------------------ | --------------- |
| **Student Name**   | Sean Mironga    |
| **Student Number** | ST10245558      |
| **Group**          | 1               |
| **Module**         | Web Development |
| **Module Code**    | WEDE5020        |
| **Project**        | POE PART 1,2,3  |
| **Year**           | 2026            |

# WEBSITE OVERVIEW

## 1. Organisation Overview
BrightSpark Electrical Services (Pty) Ltd was founded in 2014 in Johannesburg. The company is an ECB-registered electrical contractor with eight Certificate of Compliance (CoC)-accredited electricians.

BrightSpark provides residential, commercial, and light-industrial electrical services.

**Mission**
To deliver safe, reliable, and code-compliant electrical work that customers can trust.

**Vision**
To become Gauteng's most trusted electrical services brand.

**Target Audience**
- Homeowners.
- Landlords.
- Property managers.
- Small-to-medium businesses.
- Customers requiring electrical installations, repairs, and compliance certificates.

## 2. Website Goals and Objectives
The proposed website will support BrightSpark's business growth by:

- Increasing website traffic.
- Generating qualified leads through an online quote-request form.
- Showcasing safety and compliance credentials.
- Improving visibility in Google search results.
- Providing customers with convenient contact and booking options.
- Establishing a professional and trustworthy online presence.

**Key Performance Indicators**

| KPI | Target |
| --- | --- |
| Monthly unique visitors | To be monitored and increased over time |
| Quote-form submissions | 20 per month |
| Visitor-to-enquiry conversion rate | 5% |
| Page load time | Under 3 seconds |

## 3. Current Website Analysis
BrightSpark currently relies solely on a Facebook Business page and does not have a dedicated website.

**Strengths**
- Strong local reputation.
- Established through word-of-mouth referrals.
- Operating since 2014.
- Employs CoC-accredited electricians.
- Provides services across multiple market segments.

**Priority Weaknesses**
- No online quote-request functionality.
- No online booking facility.
- Limited Google search visibility.
- No dedicated platform for displaying services and credentials.
- Facebook-only presence may not provide an optimised mobile customer journey.
- No centralised gallery, testimonials, or compliance information.

## 4. Proposed Website Features
The website will include the following primary pages and features:

**Core Pages**
- Homepage — Overview of BrightSpark's services, trust indicators, and primary calls to action.
- About Us — Company background, mission, vision, and qualifications.
- Services — Detailed descriptions of residential, commercial, and light-industrial services.
- Gallery — Images of completed projects and electrical installations.
- Testimonials — Customer reviews and feedback.
- Contact — Contact details, location map, WhatsApp integration, and enquiry options.

**Online Quote-Request Form**
The form allows visitors to:
- Submit their contact information.
- Describe the required electrical work.
- Request a quotation.
- Upload photographs of the relevant electrical installation or fault.
- Provide preferred contact details and availability.

**Contact and Emergency Functionality**
The contact page includes:
- Embedded map.
- Click-to-call telephone link.
- WhatsApp contact button.
- Contact form.
- 24/7 emergency-service banner.
- Clear calls to action for urgent electrical assistance.

## 5. Design and User Experience
The website uses a mobile-first design approach to ensure that it works effectively on smartphones, tablets, laptops, and desktop computers.

**Colour Scheme**

| Colour | Hex Code | Intended Use |
| --- | --- | --- |
| Deep Navy Blue | #0B2545 | Headers, navigation, footer, and trust-focused elements |
| Spark Amber | #F5A623 | Buttons, highlights, alerts, and calls to action |
| White | #FFFFFF | Main backgrounds and content areas |
| Light Grey | #f5f6f8 | Supporting backgrounds and section separation |

The colour palette is intended to communicate trust, professionalism, safety, and energy.

**Typography**
- Headings: Montserrat Bold.
- Body text: Open Sans.

**Layout and Navigation**
- Mobile-first, single-column layout.
- Sticky navigation bar.
- Clear and repeated call-to-action buttons.
- Accessible form controls.
- Easy-to-read service information.
- Prominent emergency contact information.
- Optimised layouts for fast loading and simple navigation.

**Wireframes**
Low-fidelity wireframes were developed for the Homepage, Services page, and Contact page to confirm the information structure and user journey before development began.

## 6. Technical Requirements

**Domain**
brightsparkelectrical.co.za

**Technology Stack**
- HTML5.
- CSS3.
- JavaScript.
- WordPress.
- Bootstrap.

**Hosting and Security**
- Local SSL-secured hosting.
- HTTPS encryption.
- Secure handling of quote-request submissions.
- Protection of uploaded customer photographs.
- Regular software and plugin updates.

**Analytics**
Google Analytics is integrated to track:
- Website visitors.
- Traffic sources.
- Most-viewed pages.
- Quote-form submissions.
- Visitor-to-enquiry conversion rate.
- Device and location information.
- Page-load performance.

## 7. Timeline and Milestones

| Phase | Milestone | Estimated Weeks |
| --- | --- | --- |
| Phase 1 | Planning, requirements gathering, wireframes, and design direction | Weeks 1–2 |
| Phase 2 | WordPress development, page creation, and responsive implementation | Weeks 3–4 |
| Phase 3 | Quote-request form, photo upload, WhatsApp, map, and analytics integration | Weeks 5–8 |
| Phase 4 | Testing, client review, revisions, deployment, and launch | Weeks 9–11 |

The estimated project duration is approximately 11 weeks.

## 8. Estimated Budget

| Item | Estimated Cost |
| --- | --- |
| Domain registration | R200 |
| Hosting | R1,800 |
| Website design and development | R18,000 |
| Content and photography | R4,000 |
| Initial SEO setup | R3,500 |
| Maintenance | R750 per month |
| **Estimated first-year total** | **R27,500–R30,000** |

The final cost may vary depending on the amount of content, photography requirements, form complexity, hosting package, and additional functionality requested.

## 9. Expected Benefits
The website is expected to help BrightSpark Electrical Services:
- Reach customers who search for electrical services online.
- Generate more qualified quote requests.
- Present a professional and credible brand image.
- Highlight ECB registration and CoC-accredited electricians.
- Improve customer access through mobile, telephone, and WhatsApp contact options.
- Build trust through testimonials, project images, and compliance information.
- Measure marketing performance using analytics data.
- Reduce reliance on a Facebook-only online presence.

## 10. Project Assumptions
This proposal assumes that:
- BrightSpark will provide accurate company, service, contact, and compliance information.
- BrightSpark will supply or approve photographs, testimonials, and written content.
- The domain name is available for registration.
- Hosting will be configured using a suitable local provider.
- The client will review and approve wireframes and website content within the agreed timeline.
- Ongoing maintenance will be billed at the estimated monthly rate.

## 11. Part 2 — Build Summary
Part 2 moved the project from planning into a working static prototype. The following pages were built: `index.html`, `about.html`, `services.html`, `enquiry.html`, and `contact.html`, sharing a single stylesheet, `style.css`.

**Styling**
All pages share `style.css`, built around CSS custom properties defined in `:root`:
- `--navy: #0B2545` — primary brand colour (headers, footer, hero).
- `--amber: #F5A623` — accent colour (buttons, banner, highlights).
- `--grey: #f5f6f8` — card backgrounds.

Layout uses flexbox for the nav and form, with a sticky header and a responsive `.page-image` banner on each interior page.

**Key features implemented**
- Custom SVG logo (lightning bolt in a navy circle) used consistently in the header across all pages.
- Sticky navigation bar with amber hover states.
- 24/7 emergency callout banner displayed on every page.
- Hero image banners on each page.
- Enquiry form (`enquiry.html`) with name, phone, email, service-type dropdown, comments, and optional photo upload.
- Contact page with WhatsApp number, embedded Google Map, and location details.
- Code comments added throughout the HTML and CSS files to document structure and key styling decisions (see Changelog).

**Known limitations / carried forward to Part 3**
- The enquiry form has no `action`/`method` configured yet — form submission handling is planned for a later phase.
- Images are currently hotlinked from Unsplash for prototyping purposes and will be replaced with licensed or client-supplied photography before launch.
- Gallery and Testimonials pages listed in the original feature plan are not yet built.

## Changelog

### [Part 2] — 2026
**Added**
- Built out the site as static HTML/CSS pages: `index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`, and `style.css`.
- Added code comments throughout all HTML and CSS files to explain page structure, sections, and styling decisions.
- Added this Changelog section to the README.
- Updated the References list below with additional sources used during the build.
- Added Section 11 (Part 2 — Build Summary) documenting what was implemented against the original Part 1 proposal.

**Fixed (addressing Part 1 feedback)**
- *"No comments added to code"* — resolved by commenting all HTML and CSS files.
- *"No commits made"* — resolved by committing changes to the repository with descriptive commit messages going forward.
- *"No README document provided"* — resolved; this README now documents the project in full and is kept up to date each part.
- *"No changelog provided"* — resolved by adding this Changelog section.

Desktop view
<img width="1901" height="985" alt="Screenshot 2026-09-18 143543" src="https://github.com/user-attachments/assets/dc7f639c-dda1-4cc7-869e-aa0243150ef0" />

Mobile View

<img width="478" height="913" alt="Screenshot 2026-09-18 144010" src="https://github.com/user-attachments/assets/20b4a70a-876b-47c9-9086-abdd3ee3e085" />

## References

[#references](#references)

Bootstrap Team. (2026). *Bootstrap Documentation: Breakpoints and responsive design*. Bootstrap. [Bootstrap Documentation](https://getbootstrap.com/docs/)

Department of Employment and Labour. (2009). *Electrical Installation Regulations, 2009*. Republic of South Africa. [Electrical Installation Regulations PDF](https://www.labour.gov.za/)

Department of Employment and Labour. (2025). *Employment and Labour on electrical installation laws and Certificate of Compliance (CoC) requirements*. South African Government. [South African Government CoC notice](https://www.gov.za/)

Google. (2026). *Google Analytics for websites*. Google for Developers. [Google Analytics for websites](https://developers.google.com/analytics)

Google Search Central. (2026). *Understanding Core Web Vitals and Google Search results*. Google for Developers. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

Google Search Central. (2026). *Understanding page experience in Google Search results*. Google for Developers. [Page Experience](https://developers.google.com/search/docs/appearance/page-experience)

Mozilla Developer Network. (2026). *CSS Custom Properties (variables)*. MDN Web Docs. [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

W3C Web Accessibility Initiative. (2026). *Web Content Accessibility Guidelines (WCAG) overview*. W3C. [WCAG Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)

WordPress.org. (2026). *Features*. WordPress.org. [WordPress Features](https://wordpress.org/about/features/)

# POE-PART-1

[#poe-part-1](#poe-part-1)
