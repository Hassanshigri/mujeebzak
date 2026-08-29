import guests from "./guests.json";

export const getGuest = (slug) => {
  if (!slug) return null;
  const g = guests[slug.toLowerCase().trim()];
  return g ? { slug, ...g } : null;
};

export default guests;
