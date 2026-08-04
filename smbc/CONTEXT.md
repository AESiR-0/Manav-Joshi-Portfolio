# SMBC — go-live context, 2026-08-04

Read this **with** `brief.md` (copy intent), `masterplan.md` (design) and
`journey.md` (funnel). Those stay authoritative for what they cover. This file
carries what changed after they were written, the ecosystem SMBC now sits inside,
and the research the page should be built against.

Where this file and an older doc disagree, **this file wins** — the stale lines
are listed at the bottom.

---

## 1. Where SMBC sits now

The hierarchy inverted on 3 August. `brief.md` still describes SMBC as "the front
door of a club that has a residency behind it." It's the other way round.

> **Sunday** is the brand.
> **The residency** is the institution.
> **The Build Club** is an event the residency holds, open to the city, every
> Sunday morning.

Why it flipped, in one line: it's harder to start a residency as a build club than
to be a residency that holds a build club. Every reference program built the deep
product first — YC's batch predates Startup School by twelve years; Network School
is a residency that runs talks; the Foundery's bootcamp lives inside the 90-day
build. The one that went light-first with a huge free top of funnel, buildspace,
shut down.

Rulings: `~/Documents/SecondBrain/pairs/2026-08-03 sunday brand architecture.md`.

### What that means for the page shipping today

**Almost nothing, deliberately.** The residency is unlaunched, unnamed publicly,
and unsold. The 29 July sequencing ruling stands: during the club weeks the
residency is **visible but unopened** — mentioned, never sold.

So today's page:

- stays titled **Sunday Morning Build Club**. Do not put the new brand on it.
- carries **one** footer line acknowledging a deeper rung exists, with no name, no
  price, no link, no application. `brief.md` §8 already asks for exactly this.
- keeps every other section as briefed.

When the residency launches, that footer line becomes the bridge and the page gets
re-parented. Not today.

### One risk to know while naming things on this page

"Sunday + activity noun" is an established diminutive in English — a *Sunday
painter* is a hobbyist, a *Sunday driver* is unskilled, *Sunday league* is amateur
football. "Sunday Morning Build Club" is the most exposed name in the system: it
parses natively as the amateur version of a build club.

Not a reason to rename today. It **is** a reason the page's copy must work harder
than usual to signal seriousness — the eight-seat cap, the no-mundane-work rule and
the standard all do that job. Don't add anything cute that leans into leisure.

---

## 2. What the research says to do on this page

From `~/Documents/SecondBrain/frameworks/selective-program-sites.md` — teardown of
Y Combinator, Network School, The Foundery and The Residency. Only the parts that
change a decision here.

**Refuse the category in the first screen.** All four do it before describing
themselves. The Foundery runs a hero ticker reading `NOT AN ACCELERATOR · NOT AN
INCUBATOR`. SMBC's version already exists in the format — no mundane work, not a
café, not coworking, not networking — and it currently lives too far down the page.
The skeptical-cold reader in `brief.md` needs it killed above the fold.

**Sell the gate, not the syllabus.** Across four sites, total copy on what you
actually do each week is about four sentences; whole pages go to how hard it is to
get in. Already ruled here — eight invites, held at four points. Keep it. Do not
add a curriculum.

**Cost of entry is conserved.** The more a program gives, the more it charges at
the door. ₹449 is small, so **the form is the filter, not the fee** — which is
already Manav's own ruling from 25 July. This is why the two form questions must
stay demanding and must not be softened for conversion.

**The form is content, and every instruction in it is a values statement.** The
Residency's application opens with: *"please don't include links except where we
specifically ask. part of what we're evaluating is how well you can explain your
work without leaning on external references."* Network School prints *"Longer stays
are prioritized"* under the duration field. Both state the criterion at the moment
of answering.

**The live form has drifted from the ruled gate.** Checked 2026-08-04:

| Live in `index.html` | Ruled 2026-07-29 |
|---|---|
| What are you building? | what's your next sprint |
| **Your best work** (`instagram.com/…`) | — proof-of-shipping was explicitly **cut** |
| Why do you want to be in this room? | — |
| *(absent)* | **what can you offer the room** |

"Your best work" reinstates the proof-of-shipping filter that was deliberately
removed, asks for a link where the applicant should be explaining themselves, and
with an Instagram placeholder biases toward people with a public feed. It is the
most self-disqualifying field on the page, against `brief.md`'s own warning that
the biggest blocker here is manufactured by our own copy. **Cut it and ask what
they can offer instead.**

Then one block above the fields, stating the standard by demonstrating it:

> Be specific. "Something in fintech" tells us nothing. "Pricing page live by the
> 20th, stuck on what to charge" tells us everything.
>
> You don't need traction. You need to know what you're working on next.

Two lines because they do two jobs: raise the standard, then remove the fear the
first line creates. Keep both existing placeholders — "Don't use AI. Just tell us
what it is and where you're stuck" is the sharpest line on the page and is the same
mechanic Network School uses in the only free-text box on its application.

Guardrail: the copy must be about **their answer**, never about our selection.
"Be specific" is right. "We read these for specificity" is our-process, which
`brief.md` bans as self-admiration.

This is the highest-leverage change on the page. Everything else moves how many
apply; this moves what they write, and with eight seats and more applicants than
seats, the answers are the entire output of the form. It also pre-writes the week —
the same sentence gets someone in, gets sent Saturday night as the attendance lock,
and gets declared in the opening circle.

**Named individuals are the atomic unit of proof. Never a logo wall.** The Foundery
prints all thirty cohort names. The Residency profiles residents by first name in a
single run-on sentence. Not one of the four uses logos. The proof section should
carry first names and what moved for them — and per the 31 July ruling the claim is
*durability* ("the thing you'd been avoiding finally started"), never *novelty*
("look what got built in three hours").

**No pricing page; price surfaces at commitment.** Already the design here — ₹449
in the fact bar and again in the checkbox, never justified.

**The closing CTA restates the proof, not the offer.** The Residency ends on "apply
like over 10,000+ builders." SMBC's closing block should end on the room, not on
the price or the date.

**Design pattern, measured across all four:** off-white page background, never pure
`#FFFFFF` (they run `#F5F5EE`, `#F8F8F8`, `#F7F8F8`). Black or near-black primary
button. A book serif for the emotional lines, a neutral sans for the operational
ones. Zero gradients, zero glassmorphism. Pages run long — 8,000 to 22,000px — but
**copy volume is low**; the length comes from people and photographs, not
paragraphs. Which is the current gap: the proof section is typographic only because
no images exist yet (`brief.md`, Open §3).

---

## 3. Register map — which surface gets which voice

This is the thing that failed for six weeks. `rules/voice.md` is almost entirely
editorial and anti-slop, so the default output comes out correct and cold. The
split, from the 2 August ruling:

| Surface | Reader state | Register |
|---|---|---|
| `/smbc/` page | Stranger, being persuaded | **Public.** Plain, anti-slop, functional over clever. `brief.md` guardrails govern. |
| Post-application panel | Just gave you something | **Warm** |
| `/smbc/confirm/` (paid seat) | Already in | **Warm** |
| `/smbc/feedback/` | Was in the room | **Warm** — already shipped in Manav's own words, don't touch |
| WhatsApp invite / accept / pass | Named person | **Warm** |

**Warm has three principles**, not a list of tics: one person to one person with
the writer going first · give more than you ask · never spend the reader's status.
Full derivation in `rules/voice.md`; the shipped evidence is `rules/voice-samples.md`.

**Terse is not plain.** Aimed at someone who already said yes, terse reads as cold.

---

## 4. His own sentences — reuse verbatim, in the right place

From `rules/voice-samples.md` (never rewrite that file).

**Warm surfaces only:**
- "I'm excited to put you in the room of audacity and belief with 8 Founders, Creators, and Artists."
- "We'll work on your next ambitious project, and challenge it with other smart people in the room."
- "Come with an empty mind and your favourite diary. We'll figure the rest."
- "This is an oversubscribed event, but I have a lot of space for you in my heart."
- "Please complete the payment to **lock your seat**."
- "I'm on a mission to make the best accelerator there is."
- "Thank you for sharing your thoughts. You just helped us get closer to make the best accelerator out there ☀️"
- The ☀️ is his, and it recurs. Keep it.

**Careful — two of these are member-only.** "Other smart people in the room" and
"the room of audacity and belief" are warm-register lines. On the public page,
`brief.md` §Never explicitly bans flattering the reader, and "other smart people"
is flattery when aimed at a stranger. Same words, opposite effect, depending on
whether the reader has said yes yet.

**The act, in his own words** — he never says "build" in any invite. Twice,
identically: *"work on your next ambitious project."* That is the phrase the page
should echo, not "build."

**The enemy is misallocation, never laziness.** "I am not asking you to do your
mundane work on Sunday morning. I am asking you to work on your most ambitious
project. Something you don't get a chance to do in the chaos of the week."

---

## 5. Stale — fix or ignore these

- **`brief.md` line ~11**, "the front door of a club that has a residency behind
  it" → hierarchy inverted, see §1.
- **Any public door into the WhatsApp community** — the join button on the
  post-application panel, the second door for people who weren't free, the footer
  link, the join button on `/smbc/confirm/`, and the FAQ answer saying the
  announcements group is open. All killed on 2 August. The only invite in existence
  lives on `/smbc/feedback/`, which only people who were in the room reach. **A
  paid seat does not earn the link — a seat is not an attendance.** The public FAQ
  answers that question with a plain no.
- **The 10:00 / 10:30 / 12:00 / 12:40 timeline**, if it still exists in
  `index.html` → wrong since 31 July. Correct shape is roughly 10:00–12:15 for
  goals → challenges → narrowing → the room's offers → asks, then 12:15–1:00 as
  focused work and open floor.
- **No demo circle.** Any copy implying one is wrong.
- **Gratitude wall** is discovered in the room, never a page bullet.

---

## 6. Go-live checklist

1. `SMBC-GO-LIVE.md` at repo root — the Apps Script routing paste. Marked as the
   only remaining backend step, and it must redeploy on the **same** URL. Using
   "New deployment" breaks buildandbreak, Chemistry Lab and both SMBC pages at once.
2. `smbc/index.html` is modified and uncommitted; `smbc/confirm/`, `brief.md`,
   `masterplan.md`, `journey.md`, `messages.md`, `DESIGN.md` are all untracked.
   Commit them — the docs are as much the asset as the page.
3. Grep the built page for any surviving public community door before pushing.
4. Verify the confirm-page token flow end to end: accept → `/smbc/confirm/?k=…` →
   24-hour clock → "I've paid" → address appears → link dies on expiry.
5. Both pages are already live at `manavjoshi.com/smbc/` and `/smbc/feedback/`, so
   this is a replace, not a first deploy. Nothing about the URLs changes.

---

## 7. Still open — don't write around these

- Whether ₹449 holds or rises.
- Whether the 95% proof point can be attributed to this room — it happened at
  Build & Break, not SMBC. An honest gap beats a filled one.
- Photographs. The single biggest lever on this page, and the reason it currently
  reads shorter and thinner than any of the four references.
