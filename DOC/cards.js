// closer — question bank.
// rules for every question: under ~12 words, one ask, plain spoken words,
// answerable within seconds. lvl 1 = light, 2 = real, 3 = deep.
// tags: new, friends, date, family, work. wild = action card.
// min / max = player-count bounds (default 2..99).
//   max:2  → only works one on one
//   min:3  → needs a group
//   max:7  → whole-table rounds that drag past seven people

const BANK = [
  // ---------- new people ----------
  { q: "how did you end up here tonight?", lvl: 1, tags: ["new"] },
  { q: "what do people usually get wrong about you?", lvl: 1, tags: ["new", "date"] },
  { q: "what are you weirdly good at?", lvl: 1, tags: ["new", "work"] },
  { q: "what did you want to be when you were ten?", lvl: 1, tags: ["new", "date", "work"] },
  { q: "what's the best thing that happened to you this month?", lvl: 1, tags: ["new", "friends"] },
  { q: "what's your favorite way to waste a day?", lvl: 1, tags: ["new", "date"] },
  { q: "what are you embarrassingly into right now?", lvl: 1, tags: ["new", "friends", "date"] },
  { q: "who's the most interesting person you know?", lvl: 1, tags: ["new"] },

  { q: "what are you figuring out right now?", lvl: 2, tags: ["new", "friends"] },
  { q: "what's the last thing you changed your mind about?", lvl: 2, tags: ["new", "work"] },
  { q: "what part of your life would surprise everyone here?", lvl: 2, tags: ["new"], min: 3 },
  { q: "what about your life would surprise me?", lvl: 2, tags: ["new"], max: 2 },
  { q: "when did you last do something for the first time?", lvl: 2, tags: ["new", "friends"] },
  { q: "what compliment do you never get but deserve?", lvl: 2, tags: ["new", "date", "work"] },
  { q: "what's easy for you that's hard for most people?", lvl: 2, tags: ["new", "work"] },
  { q: "what are you avoiding these days?", lvl: 2, tags: ["new", "friends"] },
  { q: "what do you do when nobody's watching?", lvl: 2, tags: ["new", "date"] },

  { q: "what are you still trying to prove?", lvl: 3, tags: ["new", "work"] },
  { q: "when did you last cry?", lvl: 3, tags: ["new", "friends", "date"] },
  { q: "what do you wish someone had told you sooner?", lvl: 3, tags: ["new", "work"] },
  { q: "what do you need more of in your life right now?", lvl: 3, tags: ["new", "friends"] },
  { q: "how close have you come to giving up on something big?", lvl: 3, tags: ["new"] },
  { q: "if we meet again in five years, what should be different?", lvl: 3, tags: ["new"] },
  { q: "what's a question you wish people asked you?", lvl: 3, tags: ["new", "date"] },

  // ---------- friends ----------
  { q: "what's your favorite memory of us?", lvl: 1, tags: ["friends"] },
  { q: "what was your first impression of me?", lvl: 1, tags: ["friends"], max: 2 },
  { q: "what was your first impression of someone here? name them.", lvl: 1, tags: ["friends"], min: 3 },
  { q: "what's the dumbest thing we've done together?", lvl: 1, tags: ["friends"] },
  { q: "who here would survive a zombie movie?", lvl: 1, tags: ["friends"], min: 3 },
  { q: "what song has been stuck in your head?", lvl: 1, tags: ["friends"] },
  { q: "what's been the best part of your week?", lvl: 1, tags: ["friends", "work"] },
  { q: "what do i clearly love that you don't get?", lvl: 1, tags: ["friends"], max: 2 },
  { q: "if we started a business tomorrow, what would it be?", lvl: 1, tags: ["friends"] },

  { q: "what do you admire about someone in this room?", lvl: 2, tags: ["friends", "family"], min: 3 },
  { q: "what's one thing you admire about me? be honest.", lvl: 2, tags: ["friends"], max: 2 },
  { q: "when have i surprised you?", lvl: 2, tags: ["friends"], max: 2 },
  { q: "what do you miss about the old days?", lvl: 2, tags: ["friends", "family"] },
  { q: "what's changed in you this year?", lvl: 2, tags: ["friends", "date"] },
  { q: "what do you never get to talk about?", lvl: 2, tags: ["friends"] },
  { q: "who do you call when things fall apart?", lvl: 2, tags: ["friends"] },
  { q: "what's something i do that secretly annoys you?", lvl: 2, tags: ["friends"], max: 2 },
  { q: "what's a side of you this group hasn't seen?", lvl: 2, tags: ["friends"], min: 3 },
  { q: "what's a side of you i haven't seen?", lvl: 2, tags: ["friends"], max: 2 },

  { q: "what's something you've never told me?", lvl: 3, tags: ["friends"], max: 2 },
  { q: "what's something you've never told this group?", lvl: 3, tags: ["friends"], min: 3 },
  { q: "what do you think my blind spot is?", lvl: 3, tags: ["friends"], max: 2 },
  { q: "when did you feel closest to me?", lvl: 3, tags: ["friends", "date"], max: 2 },
  { q: "what are you scared to want out loud?", lvl: 3, tags: ["friends", "date"] },
  { q: "how can i be a better friend to you?", lvl: 3, tags: ["friends"], max: 2 },
  { q: "what do you need from this group that you never ask for?", lvl: 3, tags: ["friends"], min: 3 },
  { q: "when did someone here change your life?", lvl: 3, tags: ["friends"], min: 3 },
  { q: "what would your younger self not believe about your life now?", lvl: 3, tags: ["friends", "new"] },

  // ---------- date ----------
  { q: "what made you say yes to tonight?", lvl: 1, tags: ["date"] },
  { q: "what does a perfect ordinary day look like for you?", lvl: 1, tags: ["date", "new"] },
  { q: "what instantly makes you like someone?", lvl: 1, tags: ["date", "new"] },
  { q: "what are you like at a party?", lvl: 1, tags: ["date", "new"] },
  { q: "what's the most spontaneous thing you've done lately?", lvl: 1, tags: ["date"] },
  { q: "what's a green flag you fly?", lvl: 1, tags: ["date"] },
  { q: "what's your favorite thing about your life right now?", lvl: 1, tags: ["date", "friends"] },
  { q: "what were you like in school?", lvl: 1, tags: ["date", "work"] },

  { q: "what's your first impression of me? be honest.", lvl: 2, tags: ["date"], max: 2 },
  { q: "what do you overthink?", lvl: 2, tags: ["date", "new"] },
  { q: "how do you show someone you care?", lvl: 2, tags: ["date"] },
  { q: "when do you feel most like yourself?", lvl: 2, tags: ["date", "new"] },
  { q: "what are you actually looking for right now?", lvl: 2, tags: ["date"] },
  { q: "what's a dealbreaker most people would find silly?", lvl: 2, tags: ["date"] },
  { q: "what scares you about getting close to someone?", lvl: 2, tags: ["date"] },
  { q: "what's the nicest thing an ex could honestly say about you?", lvl: 2, tags: ["date"] },

  { q: "what do you want that you've never said out loud?", lvl: 3, tags: ["date", "new"] },
  { q: "when did you last feel truly seen?", lvl: 3, tags: ["date"] },
  { q: "what pattern do you keep repeating in relationships?", lvl: 3, tags: ["date"] },
  { q: "what are you afraid i'll find out about you?", lvl: 3, tags: ["date"], max: 2 },
  { q: "what about tonight will you remember?", lvl: 3, tags: ["date"] },
  { q: "what part of you takes the longest to show someone?", lvl: 3, tags: ["date"] },

  // ---------- family ----------
  { q: "what family story never gets old?", lvl: 1, tags: ["family"] },
  { q: "what smell takes you straight back to childhood?", lvl: 1, tags: ["family", "friends"] },
  { q: "who's the funniest person in this family?", lvl: 1, tags: ["family"] },
  { q: "what did you get away with that nobody ever found out?", lvl: 1, tags: ["family", "friends"] },
  { q: "what's your earliest memory of home?", lvl: 1, tags: ["family"] },
  { q: "what family habit have you caught yourself repeating?", lvl: 1, tags: ["family"] },
  { q: "what was your favorite age?", lvl: 1, tags: ["family", "new"] },
  { q: "what's the best meal this family ever made?", lvl: 1, tags: ["family"] },

  { q: "what do you wish we did more of?", lvl: 2, tags: ["family", "friends"] },
  { q: "what's a lesson from this family you still use?", lvl: 2, tags: ["family"] },
  { q: "what were you like at my age?", lvl: 2, tags: ["family"] },
  { q: "which family trait did you inherit, for better or worse?", lvl: 2, tags: ["family"] },
  { q: "what do you worry about that you never say?", lvl: 2, tags: ["family", "work"] },
  { q: "what's something you've never thanked someone here for?", lvl: 2, tags: ["family", "friends"], min: 3 },
  { q: "what have you never thanked me for?", lvl: 2, tags: ["family"], max: 2 },
  { q: "what did you want that you never told anyone?", lvl: 2, tags: ["family"] },
  { q: "who in the family do you wish you knew better?", lvl: 2, tags: ["family"] },

  { q: "what do you wish you'd asked someone who's gone?", lvl: 3, tags: ["family"] },
  { q: "what did you give up for this family?", lvl: 3, tags: ["family"] },
  { q: "what do you hope we say about you someday?", lvl: 3, tags: ["family"] },
  { q: "what's the hardest thing you've carried alone?", lvl: 3, tags: ["family", "friends"] },
  { q: "what are you most proud of about us?", lvl: 3, tags: ["family"] },
  { q: "is there something you've been meaning to say to me?", lvl: 3, tags: ["family", "date"], max: 2 },

  // ---------- work ----------
  { q: "what did you want to be before this?", lvl: 1, tags: ["work"] },
  { q: "what's a small win from this week?", lvl: 1, tags: ["work"] },
  { q: "what's your most controversial work opinion?", lvl: 1, tags: ["work"] },
  { q: "surprise day off tomorrow. what do you do?", lvl: 1, tags: ["work"] },
  { q: "what's the best part of your workday?", lvl: 1, tags: ["work"] },
  { q: "what job would you be terrible at?", lvl: 1, tags: ["work", "new"] },
  { q: "what's the weirdest job you've ever had?", lvl: 1, tags: ["work", "new"] },
  { q: "what work thing do you secretly enjoy that everyone hates?", lvl: 1, tags: ["work"] },

  { q: "what are you better at than your job needs?", lvl: 2, tags: ["work"] },
  { q: "when did you last feel proud of your work?", lvl: 2, tags: ["work"] },
  { q: "what does nobody here know you're good at?", lvl: 2, tags: ["work"], min: 3 },
  { q: "what are you good at that i've never seen?", lvl: 2, tags: ["work"], max: 2 },
  { q: "what would you change here if nobody could say no?", lvl: 2, tags: ["work"] },
  { q: "who taught you the most, ever?", lvl: 2, tags: ["work", "family"] },
  { q: "what's the best advice you've ignored?", lvl: 2, tags: ["work", "new"] },
  { q: "what part of your job would you do for free?", lvl: 2, tags: ["work"] },
  { q: "what's harder about your job than people think?", lvl: 2, tags: ["work"] },

  { q: "what's the real reason you do this work?", lvl: 3, tags: ["work"] },
  { q: "what would you do if money stopped mattering?", lvl: 3, tags: ["work", "new"] },
  { q: "when did you almost quit?", lvl: 3, tags: ["work"] },
  { q: "what do you want to be known for?", lvl: 3, tags: ["work", "new"] },
  { q: "what should this team hear more often?", lvl: 3, tags: ["work"] },
  { q: "what do you feel like an impostor about?", lvl: 3, tags: ["work"] },
  { q: "what would you regret not trying?", lvl: 3, tags: ["work", "date"] },

  // ---------- wildcards ----------
  { q: "give the person on your left an honest compliment.", wild: true, tags: ["new", "friends", "date", "family", "work"], min: 3 },
  { q: "describe the person on your right in three words. they can't respond.", wild: true, tags: ["new", "friends", "family", "work"], min: 3 },
  { q: "anyone in the group can ask you anything. answer it.", wild: true, tags: ["new", "friends", "date", "family", "work"], min: 3 },
  { q: "on three, everyone point at who'd survive a heist.", wild: true, tags: ["new", "friends", "work"], min: 3 },
  { q: "everyone answers this one: best day of the year so far?", wild: true, tags: ["new", "friends", "family", "work"], min: 3, max: 7 },
  { q: "raise whatever's in front of you and toast the group.", wild: true, tags: ["new", "friends", "family", "work"], min: 3 },
  { q: "ask me anything. i have to answer.", wild: true, tags: ["new", "friends", "date", "family", "work"], max: 2 },
  { q: "make eye contact for ten seconds. no talking.", wild: true, tags: ["date", "friends"], max: 2 },
  { q: "text someone you miss: \"thinking of you.\" right now.", wild: true, tags: ["friends", "family"] },
  { q: "give me an honest compliment. i can't deflect it.", wild: true, tags: ["new", "friends", "family", "work"], max: 2 },
];

// last card of every deck, per room. two = exactly two people.
const CLOSERS = {
  new: {
    grp: "one thing you'll remember about tonight. everyone answers.",
    two: "one thing you'll remember about tonight. both answer.",
  },
  friends: {
    grp: "tell someone here why you're glad they exist. be specific.",
    two: "tell me why you're glad we're friends. be specific.",
  },
  date: {
    grp: "on three, both answer at once: should we do this again?",
    two: "on three, both answer at once: should we do this again?",
  },
  family: {
    grp: "say the thing you've been meaning to say.",
    two: "say the thing you've been meaning to say.",
  },
  work: {
    grp: "appreciate someone's work out loud. be specific.",
    two: "say one specific thing you appreciate about my work.",
  },
};
