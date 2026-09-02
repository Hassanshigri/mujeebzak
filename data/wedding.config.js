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
   Client scaled the invite down to just Nikkah + Valima. Dates/times/venues
   are straight off the two printed invitation cards. `isoDate` drives the
   live countdown — keep it in sync with `date`+`time` if either changes.
   -------------------------------------------------------------------------*/
export const events = [
  {
    id: "nikkah",
    name: "Nikkah",
    blurb:
      "With gratitude to Allah, we invite you to witness the sacred vows that unite Zameer and Urooj.",
    date: "Friday, December 18, 2026",
    time: "4:00 PM",
    isoDate: "2026-12-18T16:00:00-06:00",
    venue: "The Spring - Wedding & Events",
    address: ["4999 Buller Rd.", "Brookshire, TX 77423"],
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=The+Spring+Wedding+and+Events+4999+Buller+Rd+Brookshire+TX+77423",
    dressCode: "",
    note: "Dinner to follow.",
    image: "/images/nikah-bg.webp",
  },
  {
    id: "valima",
    name: "Valima",
    blurb:
      "Please join us for an evening of gratitude and celebration as family and friends gather for the Valima.",
    date: "Saturday, December 19, 2026",
    time: "7:00 PM",
    isoDate: "2026-12-19T19:00:00-06:00",
    venue: "Chateau Crystal",
    address: ["2517 S. Gessner Rd", "Houston, TX 77063"],
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Chateau+Crystal+2517+S+Gessner+Rd+Houston+TX+77063",
    dressCode: "",
    image: "/images/valima-bg.webp",
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
  closing: "/images/first-rep.webp",    // "With love and gratitude" section
};

// Countdown section — art-directed per breakpoint (portrait crop on mobile,
// wide crop on web); CSS media-query background-image so only the matching
// file is ever downloaded.
export const countdownBackgrounds = {
  mobile: "/images/countdown-mob-bg.webp",
  web: "/images/countdown-web-bd.webp",
};

export const envelopeVideo = "/videos/envelope-open.mp4";     // opening screen, plays 4.2s then reveals the invitation
export const invitationVideo = "/videos/invitation-bg.mp4";   // loops behind the invitation text — no card, text sits right on it

export const music = {
  // Drop an mp3 at public/audio/theme.mp3 (see public/audio/README.txt)
  src: "/audio/theme.mp3",
  autoplayAfterGate: true,
  volume: 0.35,
};

export const eventById = (id) => events.find((e) => e.id === id);
