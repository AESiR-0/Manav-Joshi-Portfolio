# Sunday Morning Build Club — page masterplan

A blueprint for the rebuild of `manavjoshi.com/sundays`. Not the current page.

---

## 1. Objective

One job: **turn an impatient stranger arriving from Instagram into a submitted
request, in under 60 seconds, without sounding like a checkout page.**

Secondary: be the single place all information lives, so the DM never has to
explain the event twice.

Success = volume of requests. Filtering is manual for now, so the page
optimises for applies, not for pre-qualification. The one exception is the
written project field (see §4) which self-selects out strollers.

---

## 2. Audience

**Who they are:** founders, creators, students, anyone building something on
the side that nobody around them takes seriously.

**Where they come from:** an Instagram story, post, or link in bio. Channel
varies week to week; what stays constant is that they arrive knowing the
**name** and a **one-line subhead**, and sometimes the date.

**What state they're in:** impatient, skimming, mildly suspicious. They have
questions and no patience for scrolling to find them. They have already seen
the hero image.

**Design consequence:** the page never re-explains what they already know. It
starts where the story left off.

---

## 3. The flow (this is the spine — everything else serves it)

Ordered on negotiation logic, not on feature logic. Empathy before offer,
objection before ask.

| # | Screen | Move | Content |
|---|---|---|---|
| 1 | **Hero** | Recognition | Full-bleed TV photo. Name is already inside the image, so type carries only what's new: `every sunday · 10 am · ahmedabad` + apply button. |
| 2 | **The mirror** | Tactical empathy | The "why", moved to the front. Names their situation before pitching anything. The *that's right* beat. |
| 3 | **The room** | Certainty | What + how, fused into one screen. Ten believers, then the `>>` chain. Uncertainty is the real objection, not price. |
| 4 | **The ask** | Accusation audit | State the hard parts first — ₹449, a Sunday morning, only ten get in — then the form directly beneath. |
| 5 | **Questions** | Control | Collapsed accordion. Present for the skeptic, invisible to everyone else. See §3b for what earns a slot. |

**Deleted from the current page:** the "who it's for" section (absorbed into a
form placeholder), the repeated event name in the hero, and the second CTA
block. Four sections become three screens.

**Scroll budget:** hero + three screens + collapsed FAQ. If a section can't
justify a thumb-flick, it doesn't ship.

---

## 3a. Scarcity, held throughout

**Ten invites a week is a permanent property of the format, not a deadline.**
That distinction is the whole thing. "Ten invites go out every week" states
how selective this is and stays admirable. "Only 2 spots left" is pressure and
begs. The cap never counts down, because it never runs out — it simply is what
the thing is.

The number appears as a standing fact at four points: the hero meta line, the
"what" line, the ask, and the not-picked answer. Repetition is the
positioning.

This is also why the not-picked answer can't sound casual. *"Come to the next
one you're free for"* reads as drop-in. **"Ten invites go out every week. If it
wasn't you this time, ask for the next one"** keeps the door open without
softening the bar.

---

## 3b. What earns a slot in Questions

**One filter: would they type this into a DM before applying?** If not, cut.

Real questions come from three places:

| Source | What it is |
|---|---|
| **The blocker** | The myth quietly disqualifying them. Almost always "am I enough for this." |
| **The unknown** | What actually happens. Uncertainty reads as risk, and risk kills the click. |
| **The logistics** | What they need in order to physically show up. |

Anything explaining our own design decisions back to us fails the filter.
"Why only ten" is us admiring our format; no one has ever wondered it.

**The blocker on this page is manufactured by our own copy.** "Most ambitious
work", "audacity", "believers" — that language sets a bar, and the person on
the fence reads it and decides they don't clear it. Undoing the fear the
headline creates is the primary job of this section, not answering trivia.

The set:

1. My project isn't that ambitious. Should I still apply? *(blocker — ours)*
2. I'm not building an app. Does this count? *(blocker — "build" reads as software)*
3. What actually happens? *(unknown — also kills the networking-mixer suspicion)*
4. How long, and where? *(logistics)*
5. I applied. Then what? *(logistics)*

Cut and why: *why only ten* (self-admiration), *is this networking* (answered
by describing the format), *what do I bring* (folds into logistics), *why the
fee* (explaining a price implies it needs defending).

---

## 4. Core functionality

**Request form** — name, WhatsApp number, what they do, and the project
they're stuck with.

The written project field stays despite the friction. It is the only
mechanism separating people who'll build from people who'll stroll, and
someone unwilling to spend 30 seconds on it is the exact person to filter.
Everything else is one tap.

**Auto-rolling date** — every date on the page computes to the upcoming
Sunday. The page never needs a weekly edit. This is the single most valuable
piece of automation here: a recurring event with a manual date is a weekly
chore that eventually gets forgotten.

**Submission capture** — writes to a Google Sheet. One row per request.

**Confirmation state** — replaces the form in place. No page reload, no
redirect.

---

## 5. Technical approach

**Recommendation: stay static.** One HTML file, no framework, no build step,
deployed on GitHub Pages alongside the rest of the site.

| Option | Pros | Cons |
|---|---|---|
| **Static single file** ✅ | Instant load, nothing to break, zero cost, edit and ship in a minute | Manual deploy; logic lives in one file |
| React/Vite (Chemistry Lab's stack) | Component reuse, easier if this grows into many pages | Build step and dependency upkeep for a page that is essentially one screen and a form |
| Site builder (Framer, Webflow) | Fast visual editing | Subscription, and the poster aesthetic gets fought at every step |

The page is one screen and a form. A framework would add maintenance without
adding capability. Revisit only if this becomes multi-city with per-city
pages.

**Form backend: the existing Google Apps Script.** Already live, already
serving buildandbreak. Adding a route for this costs one paste, no new
service, no new bill. A sheet is also the correct admin panel at this
volume — sortable, shareable, already familiar.

**Payment (phase 2): Razorpay Payment Link.** No integration work, no card
data ever touching the page, works with UPI. Manual UPI-over-WhatsApp is fine
at ten people a week; it stops being fine the moment two cities run at once.

---

## 6. Data model (conceptual)

**Request** — one per submission.

- who: name, WhatsApp number, what they do
- what: the project they're stuck with
- when: which Sunday they applied for
- where: city (fixed to Ahmedabad today, a field so it doesn't have to be)
- state: new → invited → paid → attended, or declined
- notes: free text, for the manual call

Deliberately no user accounts, no login, no attendance history. Ten people a
week is a spreadsheet-sized problem. Introducing identity before there's a
reason is how a page becomes an app nobody asked for.

---

## 7. Design principles

**Photo does the emotional work. Type does only the functional work.**
The pattern already running across manavjoshi.com, Chemistry Lab, and Build &
Break: a full-viewport image, radically sparse type, staged fade-up entrance.

**This hero departs on one point:** the image is light, so it takes ink and
green type directly on the wall rather than the dark scrim used elsewhere.
A scrim would kill this photograph.

**Nothing repeats.** The name is in the image, so it isn't in the type. The
subhead the visitor already read on Instagram doesn't get re-read here.

**Urgency shown, never stated.** Build & Break used a draining seat tube, not
a countdown. No "limited spots", no timer.

**The live element is the TV, and it is not scarcity.** Scanlines, a slow
breathing glow, and an occasional flicker over the screen region of the
photograph. The set is powered on — that reads as "this is happening" without
claiming anything that expires, which matters for an event that recurs every
week.

Not a glyph or type animation: the words are baked into the image, so live
text would have to be positioned over the screen across every crop and
viewport. It breaks the moment the image scales. Effects on the baked pixels
survive any crop.

**Palette:** cream `#f3efe4`, print green `#2e5b34`, ink `#23271f`.
Fredoka for display, Space Mono for functional type, a serif for questions.

**Content surface: glass over a photo that never leaves.** The hero image is a
fixed layer behind the whole page; the content screens ride over it as large
frosted panels — the glass-tile treatment from Chemistry Lab's periodic table
(cream at low opacity, blur plus saturate, an inset lit edge on the top and
left, wide soft shadow).

This is a dependency, not a decoration: `backdrop-filter` only produces glass
when there is imagery behind it to blur. On flat cream it renders as a plain
panel. So the photo continuing down the page is what makes the surface work at
all.

Two constraints:
- The photo dims and desaturates past the hero, or cream glass on a white wall
  loses all contrast.
- Three or four large panels, not a grid of small tiles — many blurred
  surfaces stutter on mobile scroll. Use a `position: fixed` image layer, not
  `background-attachment: fixed`, which iOS Safari mishandles.

**Microinteractions earn their place:** press-down buttons, a stamped
confirmation, staged reveals. Nothing that delays reading.

**Mobile is the primary target.** Traffic arrives from Instagram. Desktop is
the fallback layout, and the portrait photo needs a crop anchored to the TV so
it survives a landscape viewport.

---

## 8. Security & privacy

- Personal data collected is minimal: name, phone, two sentences. No payment
  data on the page at any phase — the payment link is hosted by the provider.
- Honeypot field for bots; the written field is itself a strong spam filter.
- The sheet holds phone numbers. Keep it private, don't publish the link.
- No analytics beyond what the rest of the site already runs.

---

## 9. Phases

**Phase 1 — this week.** Rebuilt page live: new hero, negotiator ordering,
form to sheet, auto-rolling date. Manual invites and manual UPI.

**Phase 2 — once a Sunday has actually run.** Swap the TV photo for a real
photograph of the room. This is the single highest-value upgrade on the whole
page; a photo of ten people heads-down does what no copy can. Add the payment
link to the invite.

**Phase 3 — only if volume demands it.** Payment on the page, an admin view
over the sheet, past-Sunday proof.

**Phase 4 — only if the format proves out.** Second city, per-city dates,
alumni loop.

Phases 3 and 4 are explicitly not the goal. The goal is ten people in a room
this Sunday.

---

## 10. Risks

| Risk | Response |
|---|---|
| **No real photos yet** — the hero pattern depends on strong imagery, and the TV shot shows no people | Ship on the TV image, shoot Sunday, swap. Treat it as temporary by design. |
| **Volume dies after the first week** — a recurring event with no attendees looks worse than no event | Auto-rolling date means the page is never stale. Requests roll to the next Sunday rather than expiring. |
| **The written field suppresses applies** | It's the filter, so it stays — but keep it to one field and make the placeholder do the work. Watch the numbers; if requests dry up, this is the first thing to test. |
| **Portrait photo on desktop** | Crop anchored to the TV, wall extends. Verify on a laptop viewport before shipping. |
| **Everything depends on one Apps Script** shared with two other live pages | Never create a new deployment — edit the existing version. A new deployment changes the URL and breaks buildandbreak. |

---

## 11. Open questions

- Does the glass survive the swap in phase 2? A photograph of a real room is
  busier than a white wall, and frosted panels over a busy image can turn
  muddy. Worth checking the moment there's a real shot, not before.
