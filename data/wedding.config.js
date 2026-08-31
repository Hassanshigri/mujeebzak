/* ============================================================================
   THE ONLY FILE YOU NEED TO EDIT TO SWAP IN THE CLIENT'S REAL DETAILS.
   Everything marked  TODO  is a placeholder awaiting Mujeeb's reply.
   ==========================================================================*/

export const site = {
  studio: "JK STUDIO",              // TODO: your studio name in the footer
  year: 2026,
  // Displayed on the gate + browser tab
  brideFirst: "Urooj",
  groomFirst: "Zameer",
  monogram: "UZ",
  hashtagLine: "A WEDDING CELEBRATION",
};

export const families = {
  // "With the blessings of Almighty Allah and the guidance of ..." — from the
  // formal Nikah card: "Alhaj Mohammad Yousuf / Late Syed Ahmed Ali request
  // the pleasure of your presence ... of their granddaughter"
  blessingOf: "Alhaj Mohammad Yousuf / Late Syed Ahmed Ali / Late Ghulam Dastagir",
  brideParents: "MR. & MRS. MOHAMMED MUJEEB",
  groomParents: "MR. & MRS. AHMED MOHIUDDIN",
};

export const scripture = {
  bismillah: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
  ayah: "فِي الدُّنْيَا وَالْآخِرَةِ",
  ayahTranslation: "In this world and the Hereafter",
  thanks: "جَزَاكَ ٱللَّٰهُ خَيْرًا",
};

/* ----------------------------------------------------------------------------
   EVENTS
   Mehndi / Nikah / Valima dates, times & venues below are taken straight off
   the three printed invitation cards the client sent — those are confirmed.
   Dua-e-Khair, Dolki and Mayoun still only have the dates from his original
   text message; no card for those three yet, so time/venue/address are
   still TODO.
   -------------------------------------------------------------------------*/
export const events = [
  {
    id: "dua-e-khair",
    name: "Dua-e-Khair",
    blurb:
      "We begin with prayer. Join us as both families gather to seek Allah's blessings for {BRIDE} and {GROOM} at the start of their journey.",
    date: "Saturday, December 5, 2026",
    time: "TODO",
    venue: "TODO",
    address: ["TODO street", "TODO city, ST 00000"],
    mapUrl: "",
    dressCode: "",
    image: "/images/dua-e-khair-bg.png",
  },
  {
    id: "dolki",
    name: "Dolki",
    blurb:
      "An evening of dhol, song and laughter as the celebrations open in the warmth of family.",
    date: "Saturday, December 12, 2026",
    time: "TODO",
    venue: "TODO",
    address: ["TODO street", "TODO city, ST 00000"],
    mapUrl: "",
    dressCode: "",
    image: "/images/dolki-bg.png",
  },
  {
    id: "mayoun",
    name: "Mayoun",
    blurb:
      "The traditional ubtan ceremony — a tender morning of blessings for the bride before the days ahead.",
    date: "Sunday, December 13, 2026",
    time: "TODO",
    venue: "TODO",
    address: ["TODO street", "TODO city, ST 00000"],
    mapUrl: "",
    dressCode: "",
    image: "/images/mayo-bg.png",
  },
  {
    id: "mehndi",
    name: "Mehndi",
    blurb:
      "Join us for an evening of henna, music, dance & delicious food!",
    date: "Wednesday, December 16, 2026",
    time: "6:00 PM – 11:00 PM",
    venue: "Elite Banquet Hall",
    // TODO: confirm exact street address — card text was cramped/hard to read
    address: ["11315 S Texas 6 Hwy", "Sugar Land, TX 77498"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Elite+Banquet+Hall+11315+S+Texas+6+Hwy+Sugar+Land+TX+77498",
    dressCode: "",
    note: "Ladies only. Hosted by Khalas. RSVP by November 16.",
    // No dedicated Mehndi photo was supplied — reusing the Dua-e-Khair one.
    image: "/images/dua-e-khair-bg.png",
  },
  {
    id: "nikkah",
    name: "Nikkah",
    blurb:
      "With gratitude to Allah, we invite you to witness the sacred vows that unite {BRIDE} and {GROOM}.",
    date: "Friday, December 18, 2026",
    time: "4:00 PM",
    venue: "The Spring - Wedding & Events",
    address: ["4999 Buller Rd.", "Brookshire, TX 77423"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Spring+Wedding+and+Events+4999+Buller+Rd+Brookshire+TX+77423",
    dressCode: "",
    note: "Dinner to follow.",
    image: "/images/nikah-bg.png",
  },
  {
    id: "valima",
    name: "Valima",
    blurb:
      "Please join us for an evening of gratitude and celebration as family and friends gather for the Valima.",
    date: "Saturday, December 19, 2026",
    time: "7:00 PM",
    venue: "Chateau Crystal",
    address: ["2517 S. Gessner Rd", "Houston, TX 77063"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Chateau+Crystal+2517+S+Gessner+Rd+Houston+TX+77063",
    dressCode: "",
    image: "/images/valima-bg.png",
  },
];

export const notes = {
  rsvpDeadline: "November 16, 2026",
  privateNotice:
    "Attendance is reserved only for the individuals listed in this invitation. Kindly do not add or substitute guests.",
  giftNote:
    "Your presence and prayers are the greatest gifts. Kindly, no boxed gifts.",
  closingLine:
    "Your presence, prayers, and blessings will make our celebration complete. In shā' Allāh.",
  gratitude:
    "Your prayers, presence, and affection are deeply cherished by both families.",
};

export const backgrounds = {
  gate: "/images/first.png",           // welcome screen
  transition: "/images/second.png",    // shown ~1.5s while the doors finish opening
  invitation: "/images/invitaiton-bg.png",
  closing: "/images/end-bg.png",       // "With love and gratitude" section
};

export const music = {
  // Drop an mp3 at public/audio/theme.mp3 (see public/audio/README.txt)
  src: "/audio/theme.mp3",
  autoplayAfterGate: true,
  volume: 0.35,
};

export const eventById = (id) => events.find((e) => e.id === id);
