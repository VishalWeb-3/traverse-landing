import posts from "../data/blog-posts.json";

export type BlogPost = (typeof posts)[number];

export type EditorialPerson = { name: string; role: string; avatar: string; bio: string; links: { label: string; href: string }[] };

// Editorial profiles carried over from the original site (src/lib/localBlogs.ts there).
const people: Record<string, EditorialPerson> = {
  "Shubham Sharma": {
    name: "Shubham Sharma",
    role: "VPN Researcher & Technology Writer",
    avatar: "/Shubham_Sharma.jpg",
    bio: "Shubham Sharma specializes in VPNs, online privacy, and cybersecurity content. He researches and tests VPN services, evaluates privacy policies, compares security features, and analyzes real-world performance to help readers make informed decisions. His goal is to provide clear, accurate, and unbiased information about online security tools.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/shubham-sharma-76612a317/" },
      { label: "Facebook", href: "https://www.facebook.com/shubhamsharmagetmylikes" },
      { label: "X", href: "https://x.com/shubham0gml" },
    ],
  },
  "Jake Walker": {
    name: "Jake Walker",
    role: "Founder & CEO, Traverse VPN",
    avatar: "/jake.jpg",
    bio: "Jake Walker is the Founder and CEO of Traverse VPN, with a strong focus on digital privacy, internet security, and online freedom. He reviews VPN-related content to ensure technical accuracy, transparency, and alignment with industry best practices. His expertise includes VPN technology, encryption standards, and privacy-focused solutions.",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/people/Jake-Walker/pfbid09xaRQwtTNXJ696VWj935N7vjJgpGVUhQHnFhT4P5YeDXTJGX822Mrp5LEcC528J2l/" },
      { label: "X", href: "https://x.com/Jakewalker102" },
    ],
  },
};

export const blogPosts: BlogPost[] = posts;

/** Same lookup as the original site: a post is reachable by its slug or its file name. */
export function getBlogPost(id: string) {
  return blogPosts.find((post) => post.slug === id || post.id === id);
}

export function editorialPerson(name: string): EditorialPerson {
  return people[name] ?? { name, role: "", avatar: "/Shubham_Sharma.jpg", bio: "", links: [] };
}

/** Public file paths in the posts mix raw and URL-encoded spellings; normalise them for <img>/next/image. */
export function assetUrl(src: string) {
  try { return encodeURI(decodeURI(src)); } catch { return encodeURI(src); }
}

export function formatPostDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Topic shown in the blog feed, derived from the article itself. */
export function postTopic(post: BlogPost) {
  const text = `${post.slug} ${post.title}`.toLowerCase();
  if (/how-to|set up|setup/.test(text)) return "Setup";
  if (/ vs |-vs-|comparison|best vpn/.test(text)) return "Comparisons";
  if (/business|remote/.test(text)) return "Work";
  return "Security";
}
