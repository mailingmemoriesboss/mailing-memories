export type DeckRecord = {
  slug: string;
  name: string;
  who: string;
  price: "$30";
  featured?: boolean;
  bg: string;
  accent: string;
  text: string;
  section: string;
  startHere?: string;
  heroKicker: string;
  promise: string;
  description: string;
  idealFor: string[];
  highlights: string[];
  related: string[];
  purchaseUrl: string;
};

export type DigitalProduct = {
  id: string;
  name: string;
  desc: string;
  price: string;
  purchaseUrl: string;
};

export type ComingSoonProduct = {
  id: string;
  name: string;
  desc: string;
};

export type StartHereGroup = {
  id: string;
  label: string;
  description: string;
  deckSlugs: string[];
  featuredSlug: string;
  bg: string;
  accent: string;
  text: string;
};

export type DeckSection = {
  id: string;
  label: string;
  description: string;
  deckSlugs: string[];
};

export const PHYSICAL_DECKS: DeckRecord[] = [
  {
    slug: "in-the-hard-season",
    name: "In the Hard Season",
    who: "For the friend going through something difficult",
    price: "$30",
    featured: true,
    bg: "#E6EEF0",
    accent: "#455A64",
    text: "#263238",
    section: "Hard Moments",
    startHere: "Hard Moments",
    heroKicker: "Hard Moments",
    promise:
      "Honest, gentle language for grief, illness, burnout, and the seasons no standard card knows how to hold.",
    description:
      "This deck is built for presence, not platitudes. It helps you write toward the hard thing directly, without trying to fix it or rush past it.",
    idealFor: ["Grief and loss", "Illness and family crisis", "Burnout, fear, or long hard stretches"],
    highlights: [
      "30 guided cards with emotionally calibrated prompts",
      "Think / Fill / Start structure to reduce blank-page paralysis",
      "Lift-and-use phrase bank for language that feels steady and human",
    ],
    related: ["the-caregiver", "letters-i-never-sent", "enough"],
    purchaseUrl: "",
  },
  {
    slug: "the-caregiver",
    name: "The Caregiver",
    who: "For the person standing next to the patient",
    price: "$30",
    bg: "#F0F3EF",
    accent: "#6B7D6A",
    text: "#3C473B",
    section: "Hard Moments",
    startHere: "Hard Moments",
    heroKicker: "Hard Moments",
    promise:
      "Words for the person carrying invisible labor, anticipatory grief, and the quiet cost of showing up every day.",
    description:
      "This deck is written to the caregiver, not the patient. It names the unseen work and emotional weight that often go unacknowledged.",
    idealFor: ["Spousal or family caregiving", "Aging parent care", "Long medical seasons"],
    highlights: [
      "Built specifically for the person beside the crisis",
      "Helps you witness labor that usually goes unnamed",
      "Designed to feel steady, specific, and deeply seen",
    ],
    related: ["in-the-hard-season", "enough", "legacy"],
    purchaseUrl: "",
  },
  {
    slug: "letters-i-never-sent",
    name: "Letters I Never Sent",
    who: "For the unfinished business of the heart",
    price: "$30",
    bg: "#EBECEE",
    accent: "#2C3034",
    text: "#1A1D1F",
    section: "Hard Moments",
    startHere: "Hard Moments",
    heroKicker: "Inner Work",
    promise:
      "A structured way to write toward the conversations that never happened, the apologies that linger, and the words still waiting for paper.",
    description:
      "Not every letter needs to be mailed. This deck gives shape to unresolved relationships, unspoken love, and unfinished emotional territory.",
    idealFor: ["Estrangement and drift", "Private grief work", "Unsaid love or apology"],
    highlights: [
      "Designed for emotionally charged, unsent writing",
      "Useful for both private reflection and eventual sending",
      "Strongest when you need structure without emotional flattening",
    ],
    related: ["in-the-hard-season", "reflection-memory", "legacy"],
    purchaseUrl: "",
  },
  {
    slug: "the-long-friendship",
    name: "The Long Friendship",
    who: "For the friend who has the whole archive",
    price: "$30",
    featured: true,
    bg: "#F8EDE9",
    accent: "#A65F4D",
    text: "#5C352B",
    section: "Relationships",
    startHere: "Relationships",
    heroKicker: "Relationships",
    promise:
      "Prompts for the friend who has known your history, survived the chapters, and stayed through every version of you.",
    description:
      "This deck is for the friendship itself, not just an occasion inside it. It helps you write toward shared history, staying power, and what the friendship has actually meant.",
    idealFor: ["Best friends across years", "Old friends reconnecting", "Milestone birthdays and reunions"],
    highlights: [
      "Built for long history and lived specificity",
      "Encourages actual memories instead of generic praise",
      "Strong gift deck for friendships that deserve a record",
    ],
    related: ["just-because", "love-that-isnt-romantic", "gratitude"],
    purchaseUrl: "",
  },
  {
    slug: "love-that-isnt-romantic",
    name: "Love That Isn't Romantic",
    who: "For the love that doesn't have a category",
    price: "$30",
    bg: "#FDF4F4",
    accent: "#B08484",
    text: "#6B4F4F",
    section: "Relationships",
    startHere: "Relationships",
    heroKicker: "Relationships",
    promise:
      "Serious, usable language for the parent, sibling, friend, or chosen family member you love deeply.",
    description:
      "This deck gives non-romantic love the weight it deserves. It helps you say the real thing to the people who make up most of a life.",
    idealFor: ["Parents and adult children", "Chosen family", "Deep friendships and siblings"],
    highlights: [
      "Valentine's counter-programming with year-round depth",
      "Names love clearly without turning sentimental mushy",
      "Broadest emotional use across family and chosen family",
    ],
    related: ["the-long-friendship", "gratitude", "just-because"],
    purchaseUrl: "",
  },
  {
    slug: "gratitude",
    name: "Gratitude",
    who: "For the one who changed something in you",
    price: "$30",
    bg: "#FFF9EC",
    accent: "#B3824A",
    text: "#6B4F2C",
    section: "Relationships",
    startHere: "Everyday Connection",
    heroKicker: "Everyday Connection",
    promise:
      "A deeper thank-you deck focused on what someone’s character gave you, not just what they did.",
    description:
      "This is not casual thanks. It helps you write the earned, specific thank-you that has probably been sitting in your chest for years.",
    idealFor: ["Mentors and teachers", "Parents", "Friends who changed your path"],
    highlights: [
      "Moves beyond standard thank-you language",
      "Designed for sincerity, specificity, and emotional weight",
      "Strong evergreen deck for gifting and repeat use",
    ],
    related: ["just-because", "admiration-character", "the-long-friendship"],
    purchaseUrl: "",
  },
  {
    slug: "just-because",
    name: "Just Because",
    who: "For the person you've been meaning to reach out to",
    price: "$30",
    featured: true,
    bg: "#FFF8F8",
    accent: "#D1A7A7",
    text: "#8C6A6A",
    section: "Relationships",
    startHere: "Everyday Connection",
    heroKicker: "Everyday Connection",
    promise:
      "Low-pressure prompts for the ordinary Tuesday reach-out that matters more than people expect.",
    description:
      "This is your easiest starting point. It is warm, light, and built for the kind of thoughtful contact that keeps relationships from going stale.",
    idealFor: ["Random reach-outs", "Low-stakes encouragement", "First-time buyers"],
    highlights: [
      "Most accessible deck in the collection",
      "Fastest to use when you simply want to say something good",
      "Ideal starter deck and strongest repeat-purchase candidate",
    ],
    related: ["gratitude", "the-long-friendship", "new-beginnings"],
    purchaseUrl: "",
  },
  {
    slug: "admiration-character",
    name: "Admiration & Character",
    who: "For the person whose character deserves to be named out loud",
    price: "$30",
    bg: "#E8EDF2",
    accent: "#213040",
    text: "#15202B",
    section: "Recognition & Character",
    startHere: "Milestones & Growth",
    heroKicker: "Recognition",
    promise:
      "A deck for naming integrity, steadiness, restraint, and the kind of character that earns real regard.",
    description:
      "This set goes beyond compliments. It helps you witness someone’s values with precision and write something that lands like evidence, not flattery.",
    idealFor: ["Mentors and leaders", "Parents honored by adult children", "Retirement and tribute moments"],
    highlights: [
      "Built for admiration that is serious, not casual",
      "Works especially well when tied to a specific moment or example",
      "Premium-feeling recognition for milestone occasions",
    ],
    related: ["gratitude", "growth-pride", "legacy"],
    purchaseUrl: "",
  },
  {
    slug: "growth-pride",
    name: "Growth & Pride",
    who: "For the person whose progress deserves to be recognized",
    price: "$30",
    bg: "#EFF2EE",
    accent: "#3A5235",
    text: "#243321",
    section: "Recognition & Character",
    startHere: "Milestones & Growth",
    heroKicker: "Milestones & Growth",
    promise:
      "Language for the becoming, not just the achievement — the growth, effort, and visible change you have quietly watched.",
    description:
      "This deck is for saying, 'I have been paying attention.' It helps you write toward progress, resilience, and the distance someone has traveled.",
    idealFor: ["Graduations", "Recovery and rebuilding", "Coaching or mentoring relationships"],
    highlights: [
      "Stronger than generic congratulations language",
      "Especially good when you have witnessed the before and after",
      "Balances tenderness, pride, and specific observation",
    ],
    related: ["new-beginnings", "admiration-character", "the-milestone-nobody-celebrates"],
    purchaseUrl: "",
  },
  {
    slug: "new-beginnings",
    name: "New Beginnings",
    who: "For the person starting over",
    price: "$30",
    bg: "#F0F5F6",
    accent: "#749BA4",
    text: "#476166",
    section: "Time, Memory, and Milestones",
    startHere: "Milestones & Growth",
    heroKicker: "Milestones & Growth",
    promise:
      "A threshold deck for the moment before the leap — graduation, relocation, new work, retirement, or the chapter that starts after loss.",
    description:
      "This deck writes toward the edge itself. It is calmer and more grounded than generic celebration, with space for uncertainty, courage, and what someone is carrying forward.",
    idealFor: ["Graduation", "Moves and career shifts", "Fresh starts after endings"],
    highlights: [
      "Designed for the moment before or during transition",
      "Useful when encouragement needs more honesty than hype",
      "Strong pairing deck with growth, friendship, and legacy themes",
    ],
    related: ["growth-pride", "just-because", "legacy"],
    purchaseUrl: "",
  },
  {
    slug: "the-milestone-nobody-celebrates",
    name: "The Milestone Nobody Celebrates",
    who: "For the quiet progress that still deserves acknowledgment",
    price: "$30",
    bg: "#F5F2F4",
    accent: "#927C8C",
    text: "#5B4D57",
    section: "Time, Memory, and Milestones",
    startHere: "Milestones & Growth",
    heroKicker: "Milestones & Growth",
    promise:
      "Prompts for the anniversaries and private thresholds that mattered most and passed without ceremony.",
    description:
      "This deck was built for the wins the world overlooks — recovery anniversaries, private grief dates, hidden endurance, and change that never got a party.",
    idealFor: ["Recovery and sobriety anniversaries", "Quiet survival markers", "Self-validation and private milestones"],
    highlights: [
      "Names invisible milestones directly",
      "Can be used for self-directed writing or for someone else",
      "One of the most differentiated decks in the system",
    ],
    related: ["growth-pride", "enough", "reflection-memory"],
    purchaseUrl: "",
  },
  {
    slug: "reflection-memory",
    name: "Reflection & Memory",
    who: "For honoring what still lives in memory",
    price: "$30",
    bg: "#FBF7EC",
    accent: "#997D3A",
    text: "#5E4D24",
    section: "Time, Memory, and Milestones",
    heroKicker: "Inner Work",
    promise:
      "A reflective deck for writing toward the past with honesty instead of blur, nostalgia, or avoidance.",
    description:
      "This set turns memory into a writing door. It helps you name what stayed, what changed, and what still carries weight.",
    idealFor: ["Personal reflection", "Shared history letters", "Life chapter processing"],
    highlights: [
      "Deepest journaling-adjacent deck in the collection",
      "Works for private use and sendable letters",
      "Best when you want thoughtfulness without vagueness",
    ],
    related: ["letters-i-never-sent", "legacy", "the-milestone-nobody-celebrates"],
    purchaseUrl: "",
  },
  {
    slug: "enough",
    name: "Enough",
    who: "For the person who needs to hear 'right now, as you are'",
    price: "$30",
    bg: "#FFF8F5",
    accent: "#C2A388",
    text: "#7A6453",
    section: "Hard Moments",
    heroKicker: "Inner Work",
    promise:
      "A self-compassion deck built around sufficiency, release, and permission for the person carrying too much.",
    description:
      "Enough is the inward-facing deck. It helps the writer put pressure down, mark what has been endured, and speak with more mercy toward the self.",
    idealFor: ["Burnout recovery", "Self-compassion work", "Therapy-adjacent journaling"],
    highlights: [
      "Written for inward work, not performance",
      "Useful as a private ritual or gifted support tool",
      "Strong for people who need permission more than advice",
    ],
    related: ["in-the-hard-season", "the-milestone-nobody-celebrates", "the-caregiver"],
    purchaseUrl: "",
  },
  {
    slug: "legacy",
    name: "Legacy",
    who: "For the conversations people keep putting off",
    price: "$30",
    bg: "#EEEBF0",
    accent: "#4B3B52",
    text: "#2E2432",
    section: "Time, Memory, and Milestones",
    startHere: "Milestones & Growth",
    heroKicker: "Legacy",
    promise:
      "A deck for the long-view letter — the one meant for a parent, mentor, elder, or person whose life has shaped yours deeply.",
    description:
      "This set helps you say the things worth saying before more time passes. It is slower, weightier, and built for impact that lasts.",
    idealFor: ["Parents and grandparents", "Retirement and tribute letters", "Serious illness or late-life honor"],
    highlights: [
      "Best used when the relationship deserves a real record",
      "Excellent for milestone ages, retirement, and gratitude with gravity",
      "Built for letters people keep, reread, and pass down",
    ],
    related: ["admiration-character", "reflection-memory", "the-caregiver"],
    purchaseUrl: "",
  },
  {
    slug: "the-workplace-set",
    name: "The Workplace Set",
    who: "For the colleague who made the hard days lighter",
    price: "$30",
    bg: "#F0F1F3",
    accent: "#6F748B",
    text: "#45485A",
    section: "Recognition & Character",
    heroKicker: "Professional Recognition",
    promise:
      "Thoughtful language for the work no one sees, the teammate others lean on, and the kind of recognition that feels human.",
    description:
      "This deck translates real appreciation into something more lasting than email. It is designed for managers, teams, and workplace relationships that deserve more care.",
    idealFor: ["Managers recognizing team members", "Peer appreciation", "Departures, promotions, and hard stretches"],
    highlights: [
      "Makes professional recognition feel personal without feeling awkward",
      "Useful for retention, morale, and meaningful acknowledgment",
      "Good bridge between personal stationery and workplace culture",
    ],
    related: ["admiration-character", "gratitude", "growth-pride"],
    purchaseUrl: "",
  },
  {
    slug: "letters-from-little-ones",
    name: "Letters from Little Ones",
    who: "For the child who wants to say something real",
    price: "$30",
    bg: "#F2F8F5",
    accent: "#88B097",
    text: "#536B5C",
    section: "Family & Younger Writers",
    heroKicker: "Family",
    promise:
      "Simple, concrete prompts that help children write honest letters adults will keep for years.",
    description:
      "This deck is designed for younger writers who have real feelings but need an easier way in. The result is still meaningful, but the writing path is lighter and more direct.",
    idealFor: ["Ages 6–12", "Grandparents and family gifts", "Parents helping children write"],
    highlights: [
      "Kid-friendly language without flattening the emotional value",
      "Great for holidays, grandparents, and keepsake moments",
      "One of the most naturally giftable decks in the collection",
    ],
    related: ["just-because", "gratitude", "the-long-friendship"],
    purchaseUrl: "",
  },
];

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "digital-decks",
    name: "Digital Deck Downloads",
    desc: "Printable PDF versions of the guided decks for home printing or quick access on demand.",
    price: "$18",
    purchaseUrl: "",
  },
  {
    id: "writing-guide",
    name: "The Writing Guide",
    desc: "A companion guide for tone, structure, emotional clarity, and how to say what you actually mean.",
    price: "$12",
    purchaseUrl: "",
  },
];

export const COMING_SOON_PRODUCTS: ComingSoonProduct[] = [
  {
    id: "complete-box-set",
    name: "Complete Box Set",
    desc: "All 16 decks gathered into one keepsake collection.",
  },
  {
    id: "companion-books",
    name: "Companion Books",
    desc: "Extended guides with deeper prompts, essays, and longer writing paths.",
  },
  {
    id: "gift-bundles",
    name: "Gift Bundles",
    desc: "Curated pairings for specific life moments, seasons, and relationships.",
  },
];

export const START_HERE_GROUPS: StartHereGroup[] = [
  {
    id: "everyday-connection",
    label: "Everyday Connection",
    description: "Low-pressure decks for reaching out, thanking someone, or saying the good thing before it gets delayed again.",
    deckSlugs: ["just-because", "gratitude"],
    featuredSlug: "just-because",
    bg: "#FFF8F8",
    accent: "#D1A7A7",
    text: "#8C6A6A",
  },
  {
    id: "hard-moments",
    label: "Hard Moments",
    description: "For grief, caregiving, unresolved feelings, and the emotional terrain where generic cards fail completely.",
    deckSlugs: ["in-the-hard-season", "the-caregiver", "letters-i-never-sent"],
    featuredSlug: "in-the-hard-season",
    bg: "#E6EEF0",
    accent: "#455A64",
    text: "#263238",
  },
  {
    id: "relationships",
    label: "Relationships",
    description: "For long friendships, chosen family, and the non-romantic love people rarely put into words clearly.",
    deckSlugs: ["the-long-friendship", "love-that-isnt-romantic"],
    featuredSlug: "the-long-friendship",
    bg: "#F8EDE9",
    accent: "#A65F4D",
    text: "#5C352B",
  },
  {
    id: "milestones-growth",
    label: "Milestones & Growth",
    description: "For transitions, recognition, hidden progress, and the chapters that deserve something more honest than congratulations.",
    deckSlugs: ["new-beginnings", "growth-pride", "legacy", "the-milestone-nobody-celebrates"],
    featuredSlug: "new-beginnings",
    bg: "#F0F5F6",
    accent: "#749BA4",
    text: "#476166",
  },
];

export const DECK_SECTIONS: DeckSection[] = [
  {
    id: "hard-moments",
    label: "Hard Moments",
    description: "For grief, caregiving, apology, exhaustion, and the seasons where presence matters most.",
    deckSlugs: ["in-the-hard-season", "the-caregiver", "letters-i-never-sent", "enough"],
  },
  {
    id: "relationships",
    label: "Relationships",
    description: "For friendship, affection, gratitude, and the everyday contact that keeps people close.",
    deckSlugs: ["the-long-friendship", "love-that-isnt-romantic", "gratitude", "just-because"],
  },
  {
    id: "recognition-character",
    label: "Recognition & Character",
    description: "For growth, admiration, workplace appreciation, and naming what someone has become.",
    deckSlugs: ["admiration-character", "growth-pride", "the-workplace-set"],
  },
  {
    id: "time-memory-milestones",
    label: "Time, Memory, and Milestones",
    description: "For reflection, legacy, new chapters, and the moments that deserve a proper record.",
    deckSlugs: ["new-beginnings", "the-milestone-nobody-celebrates", "reflection-memory", "legacy"],
  },
  {
    id: "family-younger-writers",
    label: "Family & Younger Writers",
    description: "For children and families who want to create a keepsake instead of just a card.",
    deckSlugs: ["letters-from-little-ones"],
  },
];

export const FEATURED_DECKS = PHYSICAL_DECKS.filter((deck) => deck.featured);

export function getDeckBySlug(slug: string) {
  return PHYSICAL_DECKS.find((deck) => deck.slug === slug);
    }
