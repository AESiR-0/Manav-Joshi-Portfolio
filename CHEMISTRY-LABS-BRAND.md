# Chemistry Labs — design system

Use this for anything made for Chemistry Labs: pages, one-pagers, decks, posts.
Source of truth: the chemistrylabs.in site CSS. Its last copy in this repo is `chemistrylab/assets/index-*.css` in git history before commit `96da93c`.
If something here conflicts with a newer instruction from Manav, Manav wins. Update this file when that happens.

---

## 1. Logo

**Always use the logo file. Never type the logo out in a font.** It's a fixed piece of artwork.

The text reads `chemistry` on the first line and `labs.` on the second.

### Valid versions (the only three)

| Version | Text | Dot | File |
|---|---|---|---|
| Green | `#29741D` | Green, same as the text | `assets/logos/chemistry-labs.png` |
| White | White | White, same as the text | `assets/logos/chemistry-labs-white.png` |
| White + red dot | White | Red `#FF2D55` | `assets/logos/chemistry-labs-white-red.png` |

- The dot is always the same colour as the text, except in the white + red dot version.
- **No other versions.** No yellow dot. No other dot colours. No recolouring beyond the table.
- The white + red dot version goes with Venture Catalyst, whose accent is red.

`assets/logos/chemistry-lab.png` is the same file as `chemistry-labs.png`.
`chemistrylab/images/logo.png` reads "chemistry lab." (old, singular). Don't use it.

---

## 2. Colour

### Base (every page)

| Token | Value | Use |
|---|---|---|
| `--desk` | `#172a12` | Background. The brand is dark green. |
| `--paper` / `--ink-1` | `#fdf8f0` | Main text, headlines |
| `--ink-2` | `rgba(253,248,240,.86)` | Body copy, leads |
| `--ink-3` | `rgba(253,248,240,.56)` | Labels, secondary text |
| `--ink-4` | `rgba(253,248,240,.34)` | Faint text, quiet icons |
| `--line` | `rgba(253,248,240,.14)` | Hairlines |
| `--line-2` | `rgba(253,248,240,.24)` | Stronger lines, pill borders |
| Surface | `rgba(253,248,240,.06)` | Cards and boxes on the desk |

Text is always paper at different see-through levels. Don't introduce new greys.

### One accent per program

| Program | Accent |
|---|---|
| Chemistry Labs (home) | `#3F732B` (text version `#79BD59`) |
| Venture Catalyst | `#FF2D55` |
| Sunday Morning Build Club | `#F5EE23` |
| Calendar | `#38BDF8` |
| Practicals / Sleepovers | `#A78BFA` |

- Use only that program's accent on its pages. Use it sparingly:
  - full stops at the end of headings
  - one highlighted phrase
  - the short line in front of labels
  - one key shape
- Body text and icons stay in paper ink.

---

### Rule: one theme per piece, never pink and green together (Manav, Nov 2026)

For printed or shared collateral (PDFs, one-pagers), pick one of these and stick to it:
- **Light green (default for print):**
  - background: very light grey `#F3F4F1`
  - cards: white
  - text: near-black `#121612`
  - accent: logo green `#29741D`
  - logo: the green version
- **Light pink:**
  - background: white
  - text: black
  - accent: pink `#FF2D55`
  - no logo version suits this yet, because the only red-dot logo is white text

The dark desk theme above is the website's.

Venture Catalyst one-pager v8 uses the light green theme.

## 3. Type

**Helvetica Now Display.** Files are in `chemistrylab/fonts/`: Regular, Medium, Bold, Black.

| Element | Weight | Details |
|---|---|---|
| Headlines, titles | **Bold 700** | Tracking about -0.024em, tight line-height (1.1–1.18) |
| Body, leads | Regular 400 | `--ink-2`, measure about 44–60ch |
| Chips, buttons, small names | Medium 500 | |
| Labels | Bold 700 | 0.16em tracking, uppercase, `--ink-3` |
| Black 900 | Avoid | |

**Signature moves**
- **Headings end with a full stop in the accent colour**, e.g. "Venture Catalyst." with a red full stop. The site uses `<span class="dot">.</span>`.
- **Highlight one phrase in the accent colour** (the `.hi` class), e.g. "Rooms for your most *ambitious* experiments."
- **Labels have a short accent line in front:** 28px wide, 2px high (`.rule-lead`).
- Handwritten accent: Schoolbell, used rarely, e.g. the footer note "I approve of your stupid ideas."

---

## 4. Shapes & layout

- Radius: 14px for cards, pills fully round, 2px for small marks.
- "Rule-box": a 6px accent bar on top, rounded bottom corners, surface background. Use it for one feature box.
- Use hairlines (`--line`) to separate sections. No drop shadows.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Numbered rows (`01`, `02` …) with a thin left line.
- Photography: real Chemistry Labs rooms and people, with a dark green tint. Don't show in-person photos for something that happens online.

---

## 5. Tone

- **Inform, don't sell, but make them feel it.** No "please apply" pushes.
  - Convey the vibe: the reader should feel they get it, can't wait to join, and wish they'd found it sooner.
  - Lead with their problem, then the promise.
- Write as "we", warm and plain.
- Flow: their problem → our promise → how we do it → why it works → they're not alone → warm close.
- Leave out "apply now" pushes and scarcity talk.
- One idea per line. Concrete over abstract.
- Never invent proof, results or numbers.

---

## 6. Programs (facts to reuse)

**Venture Catalyst** — the Chemistry Labs accelerator. Accent `#FF2D55`.

*The core (say this, not logistics):*
- The promise: months of work, done in eight weeks.
- Day one: the founder sets one goal for the two months. We break it down and go after a piece of it every week.
- What makes it work:
  - a clear goal
  - a clear direction
  - mentors who've done it (practitioners only, people who've solved the problem in real life)
  - accountability (us, plus the other founders)
- Ambitious founders building together, every week. That's where things move.
- Mentorship covers marketing, finance, branding, tech, and whatever they're stuck on.

*What Chemistry Labs actually provides (answer "what do I get?" with this):*
- Day one: goal setting. One goal for the two months, broken into weekly targets.
- Group session at a fixed time every week, with the cohort.
- Expert sessions on specific problems, led by senior practitioners from internet-famous brands, listed companies and legacy businesses. Never name mentors: they're picked per problem, when it comes up.
- One-on-one time with Manav and selected mentors, when needed.
- After the accelerator, where Chemistry Labs holds equity: consulting fortnightly or monthly, more often when needed.
- Topics vary by company, e.g. financial modelling, go-to-market strategy, sales funnels, tech automation, community building, product–market fit.
- Founders often ask "what services or expertise do I get?" before signing over equity. Collateral must answer that plainly, not only sell the feeling.

*Audience:* founders at the idea or early stage. This includes people running a business for years whose revenue still isn't steady. Their problems:
- too many priorities
- deadlines that slip
- advice from people who've never done it
- revenue that comes and goes
- building alone

*One-pager story (front):* recognition ("how long have you been almost ready?") → promise → how it works (one goal, 8 weekly steps) → what gets you there → you're not alone → warm close ("This is officially where the good things start.").
*Back page:* "Here's exactly what we bring." Through-the-program timeline → who mentors you → what we work on → fee or equity (equity = we stay on) → "Ask us on WhatsApp."

*Facts:*
- 8 weeks, online, once a week.
- Cohort 01 is the first cohort, so there are no past results yet.
- Fee or equity, agreed after selection.
- Communication on WhatsApp.
- Don't put dates or "first week of the month" on collateral unless asked.

**Sunday Morning Build Club** — accent `#F5EE23`
- Every Sunday morning, in person.
- Cities: Ahmedabad, Surat, Jaipur, Mumbai (as of Oct 2026).

**Chemistry Labs** — "Rooms for your most ambitious experiments." An invite-only build club for founders, creators and the unusually ambitious.

Site: chemistrylabs.in
