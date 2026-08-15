import type { Creator, CreatorCampaign, CreatorPackage, SocialAccount, SocialPlatform } from "@/packages/contracts";
import {
  DEFAULT_MIN_FOLLOWERS,
  FAVIKON_ET_TIKTOK_2026,
  REQUIRED_SOCIAL_PLATFORMS,
} from "@/packages/contracts";

export const mockMinFollowers = DEFAULT_MIN_FOLLOWERS;

export function emptyCreator(): Creator {
  return {
    id: "",
    displayName: "",
    bio: "",
    city: "",
    country: "ET",
    niche: "",
    status: "pending_review",
    photoUrl: "",
    socials: REQUIRED_SOCIAL_PLATFORMS.map((platform) => ({
      platform,
      handle: "",
      url: "",
      followerCount: 0,
    })),
    packages: [
      {
        id: "pkg-1",
        title: "",
        platform: "tiktok",
        deliverable: "",
        price: { amount: "", currency: "ETB" },
      },
    ],
    campaigns: [],
    briefFee: { amount: "0.00", currency: "ETB" },
    maxFollowersDeclared: 0,
    minFollowersRequired: DEFAULT_MIN_FOLLOWERS.amount,
    claimStatus: "unclaimed",
  };
}

function socialUrl(platform: SocialPlatform, handle: string): string {
  if (platform === "tiktok") return `https://www.tiktok.com/@${handle}`;
  if (platform === "instagram") return `https://www.instagram.com/${handle}`;
  if (platform === "youtube") return `https://www.youtube.com/@${handle}`;
  if (platform === "telegram") return `https://t.me/${handle}`;
  if (platform === "facebook") return `https://www.facebook.com/${handle}`;
  return `https://www.tiktok.com/@${handle}`;
}

function listedSocials(
  entries: { platform: SocialPlatform; handle: string; followers?: number }[],
): SocialAccount[] {
  return REQUIRED_SOCIAL_PLATFORMS.map((platform) => {
    const row = entries.find((entry) => entry.platform === platform);
    if (!row) {
      return { platform, handle: "", url: "", followerCount: 0 };
    }
    return {
      platform,
      handle: row.handle,
      url: socialUrl(platform, row.handle),
      followerCount: row.followers ?? 0,
    };
  });
}

function placeholderPackages(_id: string): CreatorPackage[] {
  return [];
}

const SAMPLE_VIDEOS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
];

const CAMPAIGN_BRANDS: Record<string, [string, string]> = {
  Motivation: ["Rise Addis", "Selam Fit"],
  Lifestyle: ["Merkato Home", "Yene Glow"],
  Comedy: ["Rift Cola", "Taxi Talk"],
  Music: ["Addis Beats", "Krar Club"],
  Film: ["Abyssinia Reels", "Blue Nile Cut"],
  Wildlife: ["Simien Watch", "Rift Trails"],
  Food: ["Injera House", "Buna Daily"],
  Faith: ["Selam Light", "Meskel Hour"],
  Fitness: ["Addis Lift", "Highland Run"],
  Culture: ["Habesha Threads", "Timket Live"],
  Sports: ["Pitch Addis", "St. George Kit"],
  Fashion: ["Kazanchis Wear", "Shewa Line"],
  Beauty: ["Yene Glow", "Sheba Skin"],
  Tech: ["Telebirr Demo", "Safaricom Spot"],
  TV: ["EBC Night", "Kana Clip"],
};

function placeholderCampaigns(row: FavikonRow, index: number): CreatorCampaign[] {
  const brands = CAMPAIGN_BRANDS[row.niche] ?? ["Rift Cola", "Habesha Threads"];
  const platform = row.socials[0]?.platform ?? "tiktok";
  const base = 6500 + (21 - row.rank) * 1100;
  return brands.map((brand, slot) => ({
    id: `${row.id}-camp-${slot + 1}`,
    brand,
    title: `${brand} ${row.niche.toLowerCase()} film`,
    platform,
    charged: { amount: `${base + slot * 2800}.00`, currency: "ETB" },
    views: 80_000 + (21 - row.rank) * 14_000 + slot * 36_000,
    likes: 9_500 + (21 - row.rank) * 900 + slot * 3_200,
    comments: 280 + (21 - row.rank) * 18 + slot * 90,
    videoUrl: SAMPLE_VIDEOS[(index + slot) % SAMPLE_VIDEOS.length],
    postedOn: slot === 0 ? "2026-05-12" : "2026-03-04",
  }));
}

type FavikonRow = {
  id: string;
  rank: number;
  tiktokScore: number;
  displayName: string;
  handle: string;
  niche: string;
  bio: string;
  socials: { platform: SocialPlatform; handle: string; followers?: number }[];
};

const FAVIKON_ROWS: FavikonRow[] = [
  {
    id: "c-adonay",
    rank: 1,
    tiktokScore: 96.5,
    displayName: "Adonay Berhane Hailemichael",
    handle: "adonayberhane",
    niche: "Motivation",
    bio: "Adonay Berhane Hailemichael is an Ethiopian TikTok creator focused on helping others achieve fame and confidence. His content often revolves around personal growth, motivation, and the journey to becoming a well-known figure. He engages his audience with relatable posts about self-improvement and the law of attraction, encouraging them to embrace their potential. With a significant following, he shares insights on fame and personal branding, making him a notable presence in the Ethiopian TikTok community.",
    socials: [{ platform: "tiktok", handle: "adonayberhane" }],
  },
  {
    id: "c-yuti",
    rank: 2,
    tiktokScore: 94.3,
    displayName: "Yuti Nass",
    handle: "yuti_nass",
    niche: "Lifestyle",
    bio: "Yuti Nass is a prominent Ethiopian social media personality and CEO of Yuti Velo, known for her engaging TikTok content that showcases Ethiopian culture and humor. Her posts often feature collaborations with other creators and highlight local events, making her a relatable figure in the Ethiopian digital landscape. With a significant following, she effectively combines entertainment with cultural representation, appealing to a young audience interested in Ethiopian trends and lifestyle.",
    socials: [{ platform: "tiktok", handle: "yuti_nass" }],
  },
  {
    id: "c-sami",
    rank: 3,
    tiktokScore: 92,
    displayName: "SAMI (ፓፓ)",
    handle: "sami",
    niche: "Comedy",
    bio: "SAMI (ፓፓ) is an Ethiopian TikTok creator known for engaging content that resonates with a wide audience. His posts often include popular hashtags like #foryoupage and #viral, showcasing a strong connection with Ethiopian TikTok trends. He promotes his services and encourages followers to engage with his content, indicating a focus on community interaction and entertainment.",
    socials: [{ platform: "tiktok", handle: "sami" }],
  },
  {
    id: "c-veronica",
    rank: 4,
    tiktokScore: 91.8,
    displayName: "Veronica Adane",
    handle: "veronicaadane",
    niche: "Music",
    bio: "Veronica Adane is a prominent Ethiopian artist and content creator known for her vibrant presence on social media, particularly on TikTok and Instagram. She shares updates about her music performances, beauty collaborations, and personal insights, often engaging with her audience through relatable content. Her posts frequently highlight her work with beauty brands and her upcoming music tours, showcasing her artistic journey and community involvement.",
    socials: [
      { platform: "tiktok", handle: "veronicaadane" },
      { platform: "instagram", handle: "veronicaadane" },
    ],
  },
  {
    id: "c-henok",
    rank: 5,
    tiktokScore: 91.7,
    displayName: "Henok Wendimu",
    handle: "henokwendimu",
    niche: "Film",
    bio: "Henok Wendimu is an Ethiopian actor and theater artist building a portfolio across film and stage. He is active on Instagram, TikTok, and YouTube with clips ranging from city life and travel to behind-the-scenes acting moments. He promotes his online portfolio and personal storytelling, engages fans with motivational messages, and highlights cultural pride. Content centers on acting projects, performance histories, and creative collaborations.",
    socials: [
      { platform: "tiktok", handle: "henokwendimu" },
      { platform: "instagram", handle: "henokwendimu" },
      { platform: "youtube", handle: "henokwendimu" },
    ],
  },
  {
    id: "c-amleset",
    rank: 6,
    tiktokScore: 91,
    displayName: "Amleset Muchie",
    handle: "amlesetmuchie",
    niche: "Film",
    bio: "Amleset Muchie is an Ethiopian actress, film director, and writer known for her work in various films and documentaries. She studied filmmaking at the New York Film Academy and has a background in journalism. Amleset is also a brand ambassador and has a significant social media presence, sharing insights into her life, family, and professional projects. She actively engages with her audience through various platforms, promoting her work and advocating for environmental issues.",
    socials: [
      { platform: "tiktok", handle: "amlesetmuchie" },
      { platform: "instagram", handle: "amlesetmuchie" },
    ],
  },
  {
    id: "c-lijramsa",
    rank: 7,
    tiktokScore: 91,
    displayName: "L I J R A M S A",
    handle: "lijramsa",
    niche: "Wildlife",
    bio: "L I J R A M S A is a wildlife enthusiast and photographer based in Ethiopia, sharing engaging content on TikTok. His posts often feature interactions with nature, beauty, and local culture, showcasing a vibrant lifestyle. He promotes various local businesses and services, indicating a strong community connection. His content is visually appealing and resonates with a broad audience, particularly those interested in wildlife and Ethiopian culture.",
    socials: [{ platform: "tiktok", handle: "lijramsa" }],
  },
  {
    id: "c-mekdes",
    rank: 8,
    tiktokScore: 90.7,
    displayName: "Mekdes Firew",
    handle: "mekdesfirew",
    niche: "Food",
    bio: "Mekdes Firew is an Ethiopian lifestyle creator sharing daily vlogs, cooking tutorials, thrift fashion, hair styling, and faith-inspired moments across YouTube, TikTok, and Instagram. She combines everyday life with uplifting spiritual messages, building a warm, family-oriented community. Content focuses on practical tips, authentic moments, and brand collaborations through paid promotions.",
    socials: [
      { platform: "tiktok", handle: "mekdesfirew" },
      { platform: "youtube", handle: "mekdesfirew" },
      { platform: "instagram", handle: "mekdesfirew" },
    ],
  },
  {
    id: "c-metaferia",
    rank: 9,
    tiktokScore: 90.7,
    displayName: "Metaferia",
    handle: "metaferia",
    niche: "Music",
    bio: "Metaferia is a music producer known for his engaging TikTok presence, where he shares remixes and music-related content. His posts often feature Ethiopian cultural themes and collaborations with other artists, showcasing a vibrant connection to his roots. With a significant number of likes on his videos, he has built a strong following within the Ethiopian TikTok community, focusing on music and entertainment.",
    socials: [{ platform: "tiktok", handle: "metaferia" }],
  },
  {
    id: "c-eshetu",
    rank: 10,
    tiktokScore: 90.6,
    displayName: "Eshetu Melese",
    handle: "eshetumelese",
    niche: "Comedy",
    bio: "Eshetu Melese is an Ethiopian stand-up comedian, entrepreneur, and philanthropist known for his media company, Donkey Tube, which focuses on raising awareness of sociological issues through humor. With over 3 million subscribers on YouTube, he engages audiences with entertaining content that often highlights social challenges and personal stories. His work aims to inspire change and provide a voice to the voiceless, making a significant impact in Ethiopian society.",
    socials: [
      { platform: "tiktok", handle: "eshetumelese" },
      { platform: "youtube", handle: "DonkeyTube", followers: 3_000_000 },
    ],
  },
  {
    id: "c-yordanos",
    rank: 11,
    tiktokScore: 90.4,
    displayName: "Yordanos Shimeles",
    handle: "yordanosshimeles",
    niche: "Faith",
    bio: "Yordanos Shimeles is a prominent TikTok creator known for her faith-based content, celebrating her relationship with God and sharing personal reflections on life and spirituality. Her posts often express gratitude and joy, resonating with a large audience through uplifting messages and engaging visuals. She frequently collaborates with brands related to beauty and lifestyle, showcasing products while maintaining a strong focus on her Christian beliefs.",
    socials: [{ platform: "tiktok", handle: "yordanosshimeles" }],
  },
  {
    id: "c-tomas",
    rank: 12,
    tiktokScore: 90.4,
    displayName: "Tomas Hailu",
    handle: "tomashailu",
    niche: "Fitness",
    bio: "Tomas Hailu is a prominent figure in the Ethiopian fitness scene, focusing on Ethio Dance Fitness (EDF). He actively promotes fitness culture through engaging TikTok content, showcasing gym activities, community events, and innovative fitness equipment. His posts often encourage participation and reposting, reflecting a strong community-oriented approach. Hailu's content emphasizes motivation, fitness lifestyle, and the importance of physical health, making him a key influencer in promoting fitness in Ethiopia.",
    socials: [{ platform: "tiktok", handle: "tomashailu" }],
  },
  {
    id: "c-dallol",
    rank: 13,
    tiktokScore: 90.3,
    displayName: "Dallol Gebeya",
    handle: "dallolgebeya",
    niche: "Culture",
    bio: "Dallol Gebeya is an Ethiopian TikTok creator known for engaging content that highlights local culture, humor, and social commentary. His posts often feature themes of kindness, nostalgia, and community, resonating with a wide audience. He shares insights into Ethiopian life, places, and events, often using humor and relatable scenarios to connect with viewers. His content reflects a strong connection to Ethiopian identity and social issues, making him a notable figure in the Ethiopian TikTok community.",
    socials: [{ platform: "tiktok", handle: "dallolgebeya" }],
  },
  {
    id: "c-lual",
    rank: 14,
    tiktokScore: 89.9,
    displayName: "Lual Terefe",
    handle: "lualterefe",
    niche: "Culture",
    bio: "Lual Terefe is a vibrant content creator primarily active on TikTok and Instagram, showcasing Ethiopian culture and humor through engaging posts. His content often features playful interactions, collaborations with other creators, and a focus on community engagement. He frequently uses hashtags related to Ethiopian identity and trends, appealing to a broad audience interested in Habesha culture. His posts reflect a lighthearted and entertaining style, making him a relatable figure in the Ethiopian social media landscape.",
    socials: [
      { platform: "tiktok", handle: "lualterefe" },
      { platform: "instagram", handle: "lualterefe" },
    ],
  },
  {
    id: "c-soloz",
    rank: 15,
    tiktokScore: 89.9,
    displayName: "SolozTactic",
    handle: "soloztactic",
    niche: "Sports",
    bio: "SolozTactic is a football journalist and social media manager with a strong presence on TikTok, where he engages with a large audience through football-related content. His posts often feature commentary on Ethiopian football and popular players, showcasing his expertise in the sport. With a follower count of 200k, he actively promotes paid promotions and interacts with fans through replies and engaging content.",
    socials: [{ platform: "tiktok", handle: "soloztactic", followers: 200_000 }],
  },
  {
    id: "c-alexis",
    rank: 16,
    tiktokScore: 89.8,
    displayName: "Alexis Alex",
    handle: "alexisalex",
    niche: "Comedy",
    bio: "AleTube (Alexis Alex) is a Habesha YouTuber and streamer producing humorous, family-centric reels and skits. Content blends Amharic-language humor, cultural moments, and diaspora life with collaborations and trending challenges across Instagram and TikTok, featuring everyday family interactions, food moments, and travel glimpses like Dubai events.",
    socials: [
      { platform: "tiktok", handle: "alexisalex" },
      { platform: "instagram", handle: "alexisalex" },
      { platform: "youtube", handle: "AleTube" },
    ],
  },
  {
    id: "c-mahi",
    rank: 17,
    tiktokScore: 89.8,
    displayName: "Mahi Keb",
    handle: "mahikeb",
    niche: "Lifestyle",
    bio: "Mahi Keb is a vibrant TikTok creator and CEO known for her engaging content that blends humor, family moments, and cultural references. Her posts often showcase her Ethiopian heritage, featuring popular trends, food experiences, and travel adventures, particularly in Thailand. With a strong following, she connects with her audience through relatable and entertaining videos, often highlighting her personality and lifestyle.",
    socials: [{ platform: "tiktok", handle: "mahikeb" }],
  },
  {
    id: "c-teklu",
    rank: 18,
    tiktokScore: 89.6,
    displayName: "Teklu Fikadu",
    handle: "teklufikadu",
    niche: "Music",
    bio: "Teklu Fikadu operates an entertainment-focused YouTube channel and active TikTok presence, mainly sharing music, weddings, and Ethiopian culture in Amharic and Afan Oromo. Content centers on awards, celebrity weddings, and video blogs that showcase Ethiopian entertainment and social events, appealing to fans of regional music and celebration culture.",
    socials: [
      { platform: "tiktok", handle: "teklufikadu" },
      { platform: "youtube", handle: "teklufikadu" },
    ],
  },
  {
    id: "c-dirshu",
    rank: 19,
    tiktokScore: 89.5,
    displayName: "Dirshu Dana",
    handle: "dirshudana",
    niche: "Culture",
    bio: "Dirshu Dana is a prominent Ethiopian content creator known for his engaging TikTok and YouTube videos. His content often features vlogs, humorous skits, and commentary on societal issues, resonating with a wide audience. He actively engages with his followers through relatable and entertaining posts, showcasing aspects of Ethiopian culture and daily life. His TikTok videos have garnered significant likes, indicating a strong connection with his audience.",
    socials: [
      { platform: "tiktok", handle: "dirshudana" },
      { platform: "youtube", handle: "dirshudana" },
    ],
  },
  {
    id: "c-neba",
    rank: 20,
    tiktokScore: 89.5,
    displayName: "Neba4kilo",
    handle: "neba4kilo",
    niche: "Comedy",
    bio: "Neba4kilo is a TikTok creator known for humorous content that resonates with Ethiopian audiences. His posts often feature relatable scenarios and comedic sketches, showcasing a light-hearted approach to everyday life. With a significant number of likes on his videos, he engages viewers through entertaining storytelling and cultural references, making him a popular figure in the Ethiopian TikTok community.",
    socials: [{ platform: "tiktok", handle: "neba4kilo" }],
  },
];

/** Placeholder pages from Favikon. Handles are claimable by the creators. */
export const mockCreators: Creator[] = FAVIKON_ROWS.map((row, index) => {
  const followers = Math.max(0, ...row.socials.map((social) => social.followers ?? 0));
  return {
    id: row.id,
    displayName: row.displayName,
    bio: row.bio,
    city: "Ethiopia",
    country: "ET",
    niche: row.niche,
    status: "pending_review",
    photoUrl: `/creators/${row.id}.webp`,
    socials: listedSocials(row.socials),
    packages: placeholderPackages(row.id),
    campaigns: placeholderCampaigns(row, index),
    briefFee: { amount: "0.00", currency: "ETB" },
    maxFollowersDeclared: followers,
    minFollowersRequired: DEFAULT_MIN_FOLLOWERS.amount,
    claimStatus: "unclaimed",
    source: FAVIKON_ET_TIKTOK_2026.source,
    sourceUrl: FAVIKON_ET_TIKTOK_2026.sourceUrl,
    rank: row.rank,
    tiktokScore: row.tiktokScore,
  };
});

export function getCreator(id: string): Creator | undefined {
  return mockCreators.find((creator) => creator.id === id);
}
