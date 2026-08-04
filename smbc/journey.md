# SMBC — the leak-proof journey

Working doc. Not committed (public repo).
Companion: `messages.md` (every message, written out), `masterplan.md` (the page).

---

## The rule this whole doc runs on

**Nobody is ever in a state with no next action.**

A leak is not someone saying no. A leak is someone who wanted in and fell out of
the system because there was nothing for them to do next. Every state below has
an exit, including the states that feel like endings.

---

## 1. The state machine

Every person is in exactly one state at a time. This is the spine.

```
                    story / post / a friend forwards
                                │
                          ┌─────▼─────┐
                          │  VISITOR  │──── not ready ────┐
                          └─────┬─────┘                   │
                          applies (free)                  │
                          ┌─────▼─────┐                   │
                          │  APPLIED  │                   │
                          └─────┬─────┘                   │
                    Wednesday 8pm decision                │
                 ┌────────────┴────────────┐              │
           ┌─────▼─────┐            ┌──────▼──────┐       │
           │  INVITED  │            │   PASSED    │       │
           │  (unpaid) │            │ (this week) │◄──────┘
           └─────┬─────┘            └──────┬──────┘
        pays ₹449 │  ·24h·                 │ application stays live,
                  │  unpaid → seat rolls   │ priority next week
           ┌──────▼──────┐                 │
           │  CONFIRMED  │                 └──► RING 1 (open community)
           └──────┬──────┘
        ┌─────────┴─────────┐
   ┌────▼────┐        ┌─────▼─────┐
   │ NO-SHOW │        │ ATTENDED  │──► RING 2 (builders)
   └────┬────┘        └─────┬─────┘
        │              4 Sundays │
        │             ┌──────────▼──────────┐
        │             │      REGULAR        │──► RING 3
        │             └──────────┬──────────┘
        │                        │ silent 3 weeks
        └───────────────────►  LAPSED ──► one 1:1, manual
```

Two states you hadn't listed but that will cost you the most seats over a
quarter: **NO-SHOW** (you turned someone away for a seat that then sat empty)
and **LAPSED** (came twice, loved it, drifted). Both are handled below.

---

## 2. Stage by stage: the leak, then the plug

### Stage 0 — Discovery (story, post, a friend forwards it)

| Leak | Plug |
|---|---|
| Story has no link, or links to the homepage | One canonical URL everywhere, forever: `manavjoshi.com/smbc`. Link sticker on every story, link in bio, in every caption. Never a different URL for a different edition. |
| A friend recommends you by describing it. The description does the selling, badly, and no link moves | Attendees get a **forwardable message** on Sunday evening, written for them (message P). People forward messages. They do not compose them. |
| The post reads like a past event | Already solved: the date auto-rolls and dies at 1pm Sunday. |
| Someone sees it on a Tuesday, isn't free this Sunday, and there is no reason to remember you exist | **The second door** (below). This is the fix that matters most at this stage. |

**The second door.** The page has exactly one action on it: apply for this
Sunday. Everyone who is not free this Sunday leaves with nothing and never
returns. Add one line near the form:

> Not this Sunday? The community is open. You'll see what gets built each week
> and when applications open. → [join]

That single link converts "wrong week" from a total loss into ring 1. Over a
quarter this is worth more than any change to the pitch, because "wrong week" is
the most common reason a good applicant doesn't apply, and today it has no exit.

---

### Stage 1 — The page → application

| Leak | Plug |
|---|---|
| ₹449 + eight seats causes self-rejection before applying | Say the true shape once: applying is free, the invite is what costs. One line, no defence of the price (per the ruling: never justify a price). |
| Form asks for a project description and people freeze | Already handled by the placeholder. Leave it. |
| They fill the form and then wonder if it sent | Confirmation screen, rebuilt. Below. |

---

### Stage 2 — APPLIED: the dead air

**This is the single biggest leak in the system today**, and the cheapest to fix,
because 100% of applicants pass through it. Right now the confirmation screen says:

> [ REQUEST SENT ] — Eight people hear back before Sunday.

That is a dead end. No date, no next step, nothing to do, and four days of
silence follow it. Half of what you lose, you lose here.

The confirmation screen has to do three jobs:

1. **Kill the uncertainty.** Name the exact moment: "Wednesday, 8pm. Yes or no,
   everyone hears."
2. **Get the number saved.** One tap to save you as a contact. This is not
   cosmetic. On the WhatsApp Business app, broadcast messages *only reach people
   who have your number saved* — measured drop is 40–60%, and it is silent: the
   app shows the message as sent. Every reminder you ever send depends on this
   one tap happening now, while they are motivated.
3. **Hand them ring 1 immediately.** They join the community the minute they
   apply, before they know the outcome. So a "no" on Wednesday lands on someone
   who is already inside, not someone being shown the door.

Job 3 is the structural move in this whole design. **Everyone joins the open
community at the moment of application, not at the moment of rejection.** A
community link inside a rejection reads as a consolation prize. The same link
sent at the moment of maximum enthusiasm reads as access.

---

### Stage 3 — The decision (Wednesday 8pm)

Fix the hour and never move it. A predictable decision time is what lets people
stop checking their phone, and it is what makes the Wednesday message get opened.

Seat maths, held publicly and honestly:

- **8 seats.** Never stated as "8 seats available to applicants" — you hold seats
  and you should keep holding them. Structural scarcity ("eight seats, every
  week") stays true either way, per the existing ruling.
- Working split while you're still seeding the room: **6 applied + 2 host seats.**
- Publish the ratio in the message itself: "eight seats, 31 applications." The
  number does all the work that a countdown timer would do, and it is true.

---

### Stage 4 — INVITED → CONFIRMED (pay to claim)

| Leak | Plug |
|---|---|
| They read the invite, mean to pay, forget | 24h window, stated in the invite, plus one nudge at hour 20. Deadline creates the action. |
| Payment link friction | One UPI link or QR in the message. Nothing else. No gateway, no page, no account. |
| Seat sits unpaid and the Sunday runs at 7 | Auto-roll: unpaid at 24h, the seat is offered to the next person on the list, and they are told so up front. This is also what makes the waitlist real rather than decorative. |
| Someone feels tricked by paying before they know the address | Give the exact address on payment, not before. Standard, and it also protects the room. |

The 24h roll is the reason pay-to-claim is worth the friction. It is not really
about the ₹449. It converts "I'll think about it" into a decision inside a day,
and it recycles the seat while there is still time to fill it.

---

### Stage 5 — PASSED (not invited). The flow you asked most about.

Framing first, mechanics second.

**Never say rejected, and never invent a reason.** There are exactly two true
reasons, and they are very different in what they should trigger:

1. **Capacity.** Eight seats, thirty-one applications. This is 90% of cases and
   it is not about them at all. Say it in numbers, because numbers are the only
   version of this sentence that doesn't sound like a let-down softener.
2. **Fit.** No specific sprint, wants a co-working space, mundane work, wrong
   city, wrong date. This one is fixable, so say what to fix.

Four mechanics do the retention work:

**a) The application carries forward.** They do not reapply. This is the whole
game. Reapplying is a weekly act of self-humiliation that nobody performs twice.
Carrying forward turns a no into a queue position, and a queue is a place you can
stand comfortably. One line in the message: *"You don't need to apply again.
You're in for next Sunday unless you tell me otherwise."*

**b) Priority is real and earned by waiting.** Passed twice → looked at before
anyone new. Passed three times → you get a seat or an honest sentence about why
you will not get one, ever. Nobody should be strung along past three weeks; that
is where a warm person turns cold permanently. Three passes is your forcing
function to either seat them or release them cleanly.

**c) They are already in ring 1, so Sunday evening they see it happen.** Photos
of the demo circle, one line each on what eight people built that morning. This
is the retention engine and it costs you nothing extra because you are posting it
anyway. It is honest — it is just a report of what happened — and it does what no
persuasion can: it makes the room real and it makes missing it feel like missing
something specific.

**d) Give the passed person a job.** The strongest anti-leak available: ask them
for something. *"Who else should be in that room?"* A referral from someone who
didn't get in is the cheapest high-quality supply you will ever get, and being
asked to contribute is the opposite of being turned away. It also converts the
person from an applicant into a participant while they wait.

**What to never do here:** discount them in, add a ninth chair, apologise more
than one sentence, or promise a seat you can't hold. Every one of those trades
the format's credibility for one person's feelings, and the format is what they
applied for.

---

### Stage 6 — CONFIRMED → the room (the no-show plugs)

Three touches, each doing one job:

- **Saturday 9pm — the lock.** Ask for one line back: *"What are you putting the
  three hours into tomorrow?"* You already collect this at the form, so you are
  not gathering information. You are collecting a **reply**, because a person who
  typed a sentence to you last night shows up. And the sentence is what they read
  out in the declaration circle, so the message is doing double work.
  **A confirmed member who has not replied by Sunday 8am is your no-show.** That
  is your early-warning signal, and it gives you the morning to backfill.
- **Sunday 8:30am — the day-of.** Maps pin, a photo of the actual door, the one
  sentence of what happens at 10:00 sharp. Not a re-pitch.
- **Add to calendar.** A Google Calendar link in the confirmation message. No
  email needed for this; the URL works fine from WhatsApp.

**No-show handling.** They paid and didn't come. Do not ignore it and do not
scold. One message Sunday evening, and the offer that keeps them: their ₹449
carries to any future Sunday, claimed once. It costs you nothing (the seat was
paid), and the alternative is a person who is now embarrassed and will never
message you again. Embarrassment is the most underrated cause of churn in small
communities.

---

### Stage 7 — In the room → coming back

**The highest-leverage moment in the entire journey is roughly 12:10 on Sunday**,
at the close of the asks round and just before the build block, and right now
nothing happens in it. Their goal has just been sharpened by seven other people
and the room has handed them offers. That is peak. Then the build block starts,
people scatter into their own work, drift out at different times, and the next
contact is a cold ask on a Tuesday.

**Claim next Sunday before the build block starts.** Out loud, while everyone is
still one group: anyone who wants next Sunday takes it now. Paid on the spot or
held till Wednesday. It has to happen before 12:15 — the room never reconvenes
after that, because the format deliberately ends in scattered focused work and
people stay as long as they like.

Any friction you remove here is worth ten Instagram posts, because this is the
only moment in the week when the value is not a claim, it's something that
happened to them twenty minutes ago.

This also fixes your supply problem from the other side: returning members fill
seats you never have to sell.

---

### Stage 8 — Retention inside the rings

Communities die from **no scheduled beat**, not from bad members. Each ring needs
exactly one recurring thing that happens whether or not anyone is in the mood.

| Ring | Who's in it | Posting | The one beat |
|---|---|---|---|
| **1. Sunday Build Club** (open) | Everyone who applies, plus anyone from a story or referral | **Admin-only.** Zero noise, zero moderation, nobody leaves. | **Sunday 7pm:** what eight people got unstuck on, plus last week's testimony. Ends with applications open. |
| **2. The Builders** (attended ≥1) | Anyone who has done one Sunday | Open chat | **Wednesday:** one line, what happened to the thing you started Sunday. You post first, every week, without fail. |
| **3. The Regulars** (attended 4) | Earned, countable, no judgement call | Open chat, small | First look at everything: the residency, guest seats, anything you launch. This ring's job is not status, it's being the room you sell the deep end to. |

**On naming the third ring.** I'd avoid "Elite". It is a claim, and a claim has to
be defended — which cuts against your own ruling that you never justify. **"The
Regulars"** is a fact: you either showed up four times or you didn't. It cannot be
argued with, it needs no explanation, and it matches the streak identity your
format already generates ("haven't missed a Sunday in nine weeks"). Understatement
also ages better than a superlative when the group is eleven people.

**Why 4 Sundays, and why countable:** a criterion you judge is a criterion you
have to defend every week to the person who didn't make it. A criterion you count
defends itself. Keep a private override for someone who obviously belongs — just
never publish the override as a rule.

**Ladder visibility.** Ring 1 has to be able to see that ring 2 exists, or there
is nothing to climb toward. The Sunday 7pm post does this automatically: it is
ring 2's output, published to ring 1.

---

### Stage 9 — LAPSED

Attended twice, then three silent Sundays. This person is your highest-value
recoverable, and they are **the one touch that must never be automated or
broadcast**. One 1:1 message that names what they built. If you can't remember
what they built, that is the actual problem, and the fix is the attendance sheet
below.

---

## 3. The host-invite lane (people you bring in yourself)

Separate track, same room. Rules:

- **They still fill the form.** Not for screening — you already decided. You need
  the sprint line, because that is what they declare at 10:00. Send them the form
  link directly with a line saying it takes a minute and you already have them a seat.
- **Money: use a code, not an exception.** Code `HOST` on the payment step →
  ₹0 or ₹99, your call. A code is repeatable, trackable and quiet. A one-off
  "don't worry about it" is none of those and it leaks into your public price.
- **Replace payment with a reply.** A free seat has no lock on it, and free guests
  are your highest no-show risk. Their commitment device is a required reply:
  *"Reply YES by Friday and it's yours."* No reply by Friday, the seat goes to the
  applicant list. Same rule as everyone, different currency.
- **After Sunday there is no difference.** They enter ring 2 exactly like anyone
  else. No permanent guest class. The whole point of a host seat is to convert a
  person into a member, and a permanent guest never converts.
- **Cap it.** Two host seats a week. It stays a curation tool. Past two, you are
  running a guest list, and the applicants can feel it.

Track host seats in their own column so that in six weeks you know the honest
number: how many of your seats you filled yourself. That number tells you whether
demand is real long before the vibes do.

---

## 4. Should you collect email?

**No — with one exception.**

Your instinct is right for India, and the field costs you form completion at the
exact moment you can least afford friction. Everything email would have carried
has a better WhatsApp-native version:

- Calendar invite → a Google Calendar link works from a WhatsApp message.
- Weekly re-engagement → ring 1 does this, with guaranteed delivery. Broadcast
  can't, because of the saved-number problem.
- A permanent record of who applied → the sheet already is that.

**The exception:** collect it at payment, where the gateway captures it anyway.
That gives you a clean list of people who have actually paid you money, at zero
cost to form conversion. That list is worth having and it is the only email list
worth having here.

---

## 5. What to build now vs. what to wait on

You said build the no-brainers and hold the uncertain ones. Splitting on one
test: **does this automation depend on a process you have run at least twice?**

### Build now (no process risk, all upside)

1. **Rebuild the confirmation screen** — decision time, save-my-number tap,
   community link. Highest return of anything in this doc, and none of it depends
   on how the club evolves.
2. **The second door on the page** — one line + community link for people who
   aren't free this Sunday.
3. **Sheet state machine** — `status`, `edition`, `passes`, `paid`, `attended`,
   `source`, `host_seat`. Six columns. Everything downstream is impossible without
   this, and it costs one paste.
4. **Wednesday assembly script** — a script that reads the sheet and prints your
   send list: name, wa.me link, which message, personalised. It does not send. It
   removes the twenty minutes of assembly that is the actual reason a weekly
   message doesn't go out.
5. **Attendance log** — one tab, one row per person per edition. This is what
   makes ring 3 countable and lapse detection possible later.

### Wait (process not proven yet)

- **WhatsApp Cloud API / automated sends.** Template approval, per-message cost,
  and you don't yet know your own message cadence. Run it by hand for three
  editions. If the send list stabilises, then automate the sends, not before.
- **Payment gateway + automatic seat roll.** UPI link and a manual tick is fine at
  8 seats. Automate when you are turning away more than 20 people a week.
- **Lapse detection.** The rule ("silent 3 Sundays") is a guess until you have six
  weeks of attendance. Collect first, automate second.
- **Referral tracking codes.** No volume to attribute yet. The forwardable message
  works without them.

---

## 6. The weekly operating rhythm, one screen

```
SUN 12:10  claim next Sunday, out loud, BEFORE the build block scatters the room
SUN 19:00  ring 1 post: what got unstuck + last week's testimony, seats open
SUN 19:30  ring 2: add today's eight
SUN 20:00  no-show message, if any
WED 20:00  decisions out: invites, passes, priority passes
THU 16:00  payment nudge to unpaid
THU 20:00  unpaid seats roll to next in line
SAT 21:00  the lock: one line back from each of the eight
SUN 08:00  anyone who hasn't replied = likely no-show, backfill
SUN 08:30  day-of: pin, door photo, 10:00 sharp
```

Nine touches. Six of them are one message. Two are automatable today (the two
Sunday posts are manual by nature but assembled for you). The Wednesday block is
where all the work is, which is why the assembly script is worth building first.

---

## 7. Open questions for you

1. **6+2 seat split** — is two host seats a week right, or one?
2. **"The Regulars"** for ring 3, or do you want to keep "Elite"?
3. **Ring 1 admin-only** — I'm recommending it (zero moderation, nobody mutes and
   forgets you). The trade is no peer chat in the outer ring. Fine by me at this
   size; your call.
4. **Three-pass release** — are you willing to tell someone honestly, at pass
   three, that this isn't their room? The mechanic only works if you will.
