import guests from "./guests.json";

const normalize = (s) => s.toLowerCase().trim().replace(/\s+/g, " ");

// Guests type their name; find the record whose name matches, regardless
// of case/spacing. Returns null if nothing matches.
export const findGuestByName = (input) => {
  if (!input) return null;
  const needle = normalize(input);
  const slug = Object.keys(guests).find(
    (key) => key !== "_readme" && normalize(guests[key].name) === needle
  );
  return slug ? { slug, ...guests[slug] } : null;
};

export default guests;
