/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING INVITATION · MASTER CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Everything on the invitation is driven by this single object.
 *  Diya Saha & Debanu Das Wedding Celebration
 */

export interface StoryMilestone {
  title: string
  date: string
  text: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface WeddingEvent {
  title: string
  date: string
  time: string
  venue: string
  note?: string
  badge?: string
}

export interface FamilySide {
  label: string
  title: string
  photo: string
  members: { name: string; relation: string }[]
}

export interface InvitationConfig {
  couple: {
    bride: string
    groom: string
    /** Short names used in headings */
    brideShort: string
    groomShort: string
  }
  /** ISO date-time of the ceremony — drives the countdown & calendar */
  weddingDate: string
  /** Human-readable date shown under the hero */
  displayDate: string
  tagline: string
  hero: {
    /** Square childhood photos held in front of the faces */
    childhoodBride: string
    childhoodGroom: string
    /** Grown-up portraits revealed on scroll */
    portraitBride: string
    portraitGroom: string
    /** Ghibli-style illustrated bodies holding empty frames */
    bodyBride: string
    bodyGroom: string
  }
  story: StoryMilestone[]
  events: WeddingEvent[]
  details: {
    ceremony: { title: string; venue: string; time: string; note: string }
    reception?: { title: string; venue: string; time: string; note: string }
    dressCode: string
  }
  venue: {
    name: string
    address: string
    /** Query used for the embedded Google Map + "Open in Maps" link */
    mapQuery: string
    url?: string
  }
  gallery: GalleryImage[]
  families: { bride: FamilySide; groom: FamilySide }
  calendar: {
    title: string
    description: string
    /** Duration of the event in hours */
    durationHours: number
  }
  music: {
    /** Path/URL to an .mp3 — leave empty to hide the music toggle */
    src: string
    label: string
  }
  theme: {
    /** Warm gold accent (hex) */
    gold: string
    /** Page background (hex) */
    background: string
    /** Main text color (hex) */
    ink: string
    /** Background texture overlay: 'paper' | 'plain' */
    texture: "paper" | "plain"
  }
  fonts: {
    /** Google-font family names (already loaded in index.html) */
    serif: string
    script: string
    sans: string
  }
  footer: {
    thanks: string
    copyright: string
  }
  /** Optional blocks controlled by InviteStory Control Centre */
  sections?: {
    story?: boolean
    countdown?: boolean
    events?: boolean
    venue?: boolean
    gallery?: boolean
    family?: boolean
  }
}

const config: InvitationConfig = {
  couple: {
    bride: "Diya Saha",
    groom: "Debanu Das",
    brideShort: "Diya",
    groomShort: "Debanu",
  },
  weddingDate: "2027-01-26T19:00:00+05:30",
  displayDate: "Tuesday, 26 January 2027",
  tagline: "Two souls, one sacred journey.\nForever begins now.",
  hero: {
    childhoodBride: "/images/childhood-bride.png",
    childhoodGroom: "/images/childhood-groom.png",
    portraitBride: "/images/portrait-bride.png",
    portraitGroom: "/images/portrait-groom.png",
    bodyBride: "/images/body-bride.png",
    bodyGroom: "/images/body-groom.png",
  },
  story: [
    {
      title: "First Meeting",
      date: "The Beginning",
      text: "A simple introduction that turned into hours of effortless conversations, gentle smiles, and an unspoken feeling that this was the start of something truly special.",
    },
    {
      title: "Friendship & Laughter",
      date: "Growing Together",
      text: "From shared dreams and endless talks to being each other's quiet confidant, our bond deepened with every season into a profound and steadfast love.",
    },
    {
      title: "The Promise",
      date: "A Lifetime Ahead",
      text: "With hearts full of gratitude and love, we chose each other — a promise to walk together through every high and low, hand in hand forever.",
    },
    {
      title: "Subho Bibaha",
      date: "January 2027",
      text: "And now, we step into the sacred bond of matrimony. We would be overjoyed and honoured to have your warm presence and blessings as our journey begins.",
    },
  ],
  events: [
    {
      title: "Ashirbad Ceremony",
      date: "14 December 2026",
      time: "11:00 AM — 5:00 PM",
      venue: "Swarnabhumi Banquet, Agartala, Tripura",
      note: "Auspicious blessings from elders and loved ones",
      badge: "Pre-Wedding",
    },
    {
      title: "The Wedding Ceremony",
      date: "26 January 2027",
      time: "7:00 PM onwards",
      venue: "The Manikya Enclave, Agartala, Tripura",
      note: "Subho Bibaha & sacred wedding rituals",
      badge: "Main Ceremony",
    },
    {
      title: "Reception Party",
      date: "29 January 2027",
      time: "7:00 PM onwards",
      venue: "Malancha Niwas, Agartala, Tripura",
      note: "An evening of feast, music and celebration",
      badge: "Celebration",
    },
  ],
  details: {
    ceremony: {
      title: "The Wedding Ceremony",
      venue: "The Manikya Enclave, Agartala, Tripura",
      time: "7:00 PM onwards",
      note: "Please join us to celebrate our sacred union",
    },
    reception: {
      title: "Reception Party",
      venue: "Malancha Niwas, Agartala, Tripura",
      time: "7:00 PM onwards",
      note: "Dinner & celebration with family and friends",
    },
    dressCode: "Traditional / Festive Formal · Soft pastels & elegant neutrals encouraged",
  },
  venue: {
    name: "The Manikya Enclave",
    address: "79 Tilla, Agartala, Tripura 799006",
    mapQuery: "The Manikya Enclave, 79 Tilla, Agartala, Tripura",
    url: "https://maps.app.goo.gl/WpkDsBzRRQDXwznP8?g_st=iw",
  },
  gallery: [
    { src: "/images/gallery-1.png", alt: "A gentle embrace & whispered promises · Diya & Debanu" },
    { src: "/images/gallery-2.png", alt: "Forever by your side · In love & elegance" },
    { src: "/images/gallery-3.png", alt: "Quiet moments & blooming joy by the water" },
  ],
  families: {
    bride: {
      label: "The Bride's Family",
      title: "The Saha Family",
      photo: "/images/family-bride.png",
      members: [
        { name: "Saha Family", relation: "Family of the Bride" },
      ],
    },
    groom: {
      label: "The Groom's Family",
      title: "The Das Family",
      photo: "/images/family-groom.png",
      members: [
        { name: "Das Family", relation: "Family of the Groom" },
      ],
    },
  },
  calendar: {
    title: "Diya & Debanu — Wedding",
    description: "Wedding ceremony of Diya Saha & Debanu Das at The Manikya Enclave, Agartala, Tripura.",
    durationHours: 4,
  },
  music: {
    src: "",
    label: "Wedding Tune",
  },
  theme: {
    gold: "#b98a4e",
    background: "#faf5ec",
    ink: "#46392c",
    texture: "paper",
  },
  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    script: "'Great Vibes', cursive",
    sans: "'Jost', 'Helvetica Neue', sans-serif",
  },
  footer: {
    thanks: "Thank you for being part of our special journey",
    copyright: "© 2027 Diya & Debanu · Handcrafted with love by InviteStory",
  },
  sections: {
    story: true,
    countdown: true,
    events: true,
    venue: true,
    gallery: true,
    family: true,
  },
}

export default config
