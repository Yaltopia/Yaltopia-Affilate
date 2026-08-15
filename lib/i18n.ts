import type { Locale, SocialPlatform } from "@/packages/contracts";

export const copy = {
  en: {
    filters: "Filters",
    reset: "Reset",
    category: "Category",
    platform: "Platform",
    followers: "Followers",
    packagePrice: "Package price",
    anyCategory: "Any category",
    anyPlatform: "Any platform",
    selected: "selected",
    creators: "Creators",
    posts: "Posts",
    creatorsJoin: "Creators join",
    advertisers: "Advertisers",
    spec: "Spec",
    logIn: "Log in",
    joinAdvertiser: "Join as advertiser",
    workspace: "Workspace",
    heroLead: "Find",
    heroCreators: "creators",
    heroTail: "to collaborate with",
    heroSupport: "Search an @handle. Brief a video. Pay on a tracked code — not a handshake.",
    searchHandles: "Search creator handles",
    searchPlaceholder: "Search @handle on TikTok, Instagram, YouTube, Telegram\u2026",
    seeHow: "See how it works",
    directoryKicker: "{count} placeholder pages \u00b7 creators can claim their handle",
    directoryTitle: "Top TikTokers in Ethiopia",
    directorySource: "Seeded from {source}. These are not claimed accounts until the creator says so.",
    emptyTitle: "No creator matches",
    emptyQuery: "Nothing for @{query}. Try another handle, or reset filters.",
    emptyFilters: "No pages match these filters. Reset the panel.",
    unclaimed: "Unclaimed",
    claimReview: "Claim in review",
    claimReviewLong: "Claim is in review. Admin confirms the handle belongs to you.",
    viewPage: "View page",
    claimCta: "This is my page \u2014 claim handle",
    claimHandle: "Claim @{handle}",
    claimed: "This page is claimed.",
    placeholderCard: "Placeholder page. Claim this handle if it is yours.",
    fromPrice: "From",
    language: "Language",
    footerCredit: "Yaltopia Affiliate by Prime Store.",
    poweredBy: "Powered by {org}",
  },
  am: {
    filters: "\u121b\u1323\u122a\u12eb\u12ce\u127d",
    reset: "\u12f3\u130d\u121d \u12a0\u1235\u1300\u121d\u122d",
    category: "\u121d\u12f5\u1265",
    platform: "\u1218\u12f5\u1228\u12ad",
    followers: "\u1270\u12a8\u1273\u12ee\u127d",
    packagePrice: "\u12e8\u1325\u1245\u120d \u12cb\u130b",
    anyCategory: "\u1201\u1209\u121d \u121d\u12f5\u1266\u127d",
    anyPlatform: "\u1201\u1209\u121d \u1218\u12f5\u1228\u12ae\u127d",
    selected: "\u1270\u1218\u122d\u1320\u12cb\u120d",
    creators: "\u1348\u1323\u122a\u12ce\u127d",
    posts: "\u120d\u1325\u134e\u127d",
    creatorsJoin: "\u12a5\u1295\u12f0 \u1348\u1323\u122a \u12ed\u1240\u120b\u1240\u1209",
    advertisers: "\u12a0\u1235\u1273\u12cb\u1242\u12ce\u127d",
    spec: "\u12f5\u1295\u130d",
    logIn: "\u130d\u1263",
    joinAdvertiser: "\u12a5\u1295\u12f0 \u12a0\u1235\u1273\u12cb\u1242 \u12ed\u1240\u120b\u1240\u1209",
    workspace: "\u12e8\u1235\u122b \u1266\u1273",
    heroLead: "\u12eb\u130d\u1299",
    heroCreators: "\u1348\u1323\u122a\u12ce\u127d",
    heroTail: "\u1208\u1218\u1235\u122b\u1275",
    heroSupport:
      "@\u1218\u1208\u12eb \u12ed\u1348\u120d\u1309\u1362 \u126a\u12f2\u12ee \u12ed\u1320\u12ed\u1241\u1362 \u1260\u12ad\u1275\u1275\u120d \u12ae\u12f5 \u12ed\u12ad\u1348\u1209 \u2014 \u1260\u12a5\u1305 \u1218\u1328\u1263\u1260\u1325 \u12a0\u12ed\u12f0\u1208\u121d\u1362",
    searchHandles: "\u12e8\u1348\u1323\u122a \u1218\u1208\u12eb\u12ce\u127d\u1295 \u12ed\u1348\u120d\u1309",
    searchPlaceholder:
      "\u1260\u1272\u12ad\u1276\u12ad\u1363 \u12a2\u1295\u1235\u1273\u130d\u122b\u121d\u1363 \u12e9\u1271\u1265\u1363 \u1274\u120c\u130d\u122b\u121d @\u1218\u1208\u12eb \u12ed\u1348\u120d\u1309\u2026",
    seeHow: "\u12a5\u1295\u12f4\u1275 \u12a5\u1295\u12f0\u121a\u1230\u122b",
    directoryKicker:
      "{count} \u1308\u133e\u127d \u00b7 \u1348\u1323\u122a\u12ce\u127d \u1218\u1208\u12eb\u1278\u12cd\u1295 \u120a\u1320\u12ed\u1241 \u12ed\u127d\u120b\u1209",
    directoryTitle: "\u1260\u12a2\u1275\u12ee\u1335\u12eb \u12a8\u134d\u1270\u129b \u1272\u12ad\u1276\u12a8\u122e\u127d",
    directorySource:
      "\u12a8 {source} \u12e8\u1270\u12c8\u1230\u12f0\u1362 \u1348\u1323\u122a\u12cd \u12a5\u1235\u12aa\u1320\u12ed\u1245 \u12f5\u1228\u1235 \u12a5\u1290\u12da\u1205 \u12e8\u1270\u12eb\u12d9 \u12a0\u12ed\u12f0\u1209\u121d\u1362",
    emptyTitle: "\u121d\u1295\u121d \u1348\u1323\u122a \u12a0\u120d\u1270\u1308\u1298\u121d",
    emptyQuery:
      "\u1208 @{query} \u121d\u1295\u121d \u12e8\u1208\u121d\u1362 \u120c\u120b \u1218\u1208\u12eb \u12ed\u121e\u12ad\u1229 \u12c8\u12ed\u121d \u121b\u1323\u122a\u12eb\u12cd\u1295 \u12ed\u1218\u120d\u1231\u1362",
    emptyFilters:
      "\u12a5\u1290\u12da\u1205 \u121b\u1323\u122a\u12eb\u12ce\u127d \u121d\u1295\u121d \u1308\u133d \u12a0\u120b\u1218\u1321\u121d\u1362 \u1350\u1290\u1209\u1295 \u12ed\u1218\u120d\u1231\u1362",
    unclaimed: "\u12a0\u120d\u1270\u1320\u12e8\u1240\u121d",
    claimReview: "\u1325\u12eb\u1244 \u1260\u130d\u121d\u1308\u121b \u120b\u12ed",
    claimReviewLong:
      "\u1325\u12eb\u1244 \u1260\u130d\u121d\u1308\u121b \u120b\u12ed \u1290\u12cd\u1362 \u12a0\u1235\u1270\u12f3\u12f3\u122a \u1218\u1208\u12eb\u12cd \u12e8\u12a5\u122d\u1235\u12ce \u1218\u1206\u1291\u1295 \u12eb\u1228\u130b\u130d\u1323\u120d\u1362",
    viewPage: "\u1308\u1339\u1295 \u12ed\u1218\u120d\u12a8\u1271",
    claimCta: "\u12ed\u1205 \u12e8\u12a4 \u1308\u133d \u1290\u12cd \u2014 \u1218\u1208\u12eb \u1320\u12ed\u1245",
    claimHandle: "@{handle} \u1320\u12ed\u1245",
    claimed: "\u12ed\u1205 \u1308\u133d \u1270\u12ed\u12df\u120d\u1362",
    placeholderCard:
      "\u12e8\u1218\u1320\u1263\u1260\u1242\u12eb \u1308\u133d\u1362 \u12e8\u12a5\u122d\u1235\u12ce \u12a8\u1206\u1290 \u1218\u1208\u12eb\u12cd\u1295 \u12ed\u1320\u12ed\u1241\u1362",
    fromPrice: "\u12a8",
    language: "\u124b\u1295\u124b",
    footerCredit: "Yaltopia Affiliate by Prime Store\u1362",
    poweredBy: "\u12e8\u1270\u130e\u120b\u1260\u1270\u12cd \u1260 {org}",
  },
} as const;

export type CopyKey = keyof typeof copy.en;

export const nicheLabels: Record<Locale, Record<string, string>> = {
  en: {},
  am: {
    Motivation: "\u1270\u1290\u1233\u123d\u1290\u1275",
    Lifestyle: "\u12e8\u1291\u122e \u12d8\u12ed\u1264",
    Comedy: "\u12ae\u121c\u12f2",
    Music: "\u1219\u12da\u1243",
    Film: "\u134a\u120d\u121d",
    Wildlife: "\u12e8\u12f1\u122d \u12a5\u1295\u1235\u1233\u1275",
    Food: "\u121d\u130d\u1265",
    Faith: "\u12a5\u121d\u1290\u1275",
    Fitness: "\u12e8\u12a0\u12ab\u120d \u1265\u1243\u1275",
    Culture: "\u1263\u1205\u120d",
    Sports: "\u1235\u1356\u122d\u1275",
    Fashion: "\u134b\u123d\u1295",
    Beauty: "\u12cd\u1260\u1275",
    Tech: "\u1274\u12ad\u1296\u120e\u1302",
    TV: "\u1274\u120c\u126a\u12e5\u1295",
  },
};

export const platformLabels: Record<Locale, Record<SocialPlatform, string>> = {
  en: {
    tiktok: "TikTok",
    instagram: "Instagram",
    youtube: "YouTube",
    telegram: "Telegram",
    facebook: "Facebook",
    other: "Other",
  },
  am: {
    tiktok: "\u1272\u12ad\u1276\u12ad",
    instagram: "\u12a2\u1295\u1235\u1273\u130d\u122b\u121d",
    youtube: "\u12e9\u1271\u1265",
    telegram: "\u1274\u120c\u130d\u122b\u121d",
    facebook: "\u134c\u1235\u1261\u12ad",
    other: "\u120c\u120b",
  },
};

export function t(locale: Locale, key: CopyKey, vars?: Record<string, string | number>): string {
  let value: string = copy[locale][key] ?? copy.en[key];
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
  }
  return value;
}

export function nicheLabel(locale: Locale, niche: string): string {
  return nicheLabels[locale][niche] ?? niche;
}

export function platformLabel(locale: Locale, platform: SocialPlatform): string {
  return platformLabels[locale][platform] ?? platform;
}
