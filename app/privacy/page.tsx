import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell } from "@/components/legal/legal-shell";
import { BOOK_A_CALL_URL, PRIVACY_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy · Yaltopia Affiliate",
  description: "How Yaltopia Tech collects and uses personal data on Yaltopia Affiliate.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        This Privacy Policy explains how <strong>Yaltopia Tech</strong> (“Yaltopia Tech,” “we,” “us,” or “our”),
        operator of <strong>Yaltopia Affiliate</strong> (the “Platform”), collects, uses, discloses, and protects
        personal data of Advertisers, Creators, Admin staff, and other users. We operate under the laws of the
        Federal Democratic Republic of Ethiopia.
      </p>

      <section>
        <h2>1. Who we are</h2>
        <p>
          The Platform is a marketplace where Advertisers brief Creators, Creators promote with a promo code and a
          tracking link, and Admin’s Payout Agent may request payment from an Advertiser. The customer site is
          public. Workspaces at <code>/app</code>, <code>/studio</code>, and <code>/admin</code> require a signed-in
          session. Shoppers who later follow a tracking link stay anonymous to counterparties.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <h3>2.1 Information you provide directly</h3>
        <p>
          <strong>All users.</strong> Display name and the social-login identity you use to create and open an
          account (Google, TikTok, Instagram, YouTube, Telegram, or Facebook). We do not collect a Platform password
          for ordinary sign-in. If you use a demo account in a non-production environment, that test credential is
          not your production identity.
        </p>
        <p>
          <strong>Social grants.</strong> When you join, you grant access for TikTok, Instagram, YouTube, Telegram,
          and Facebook (handle and profile URL; Creators also enter follower counts). Connecting a provider may
          return tokens or profile fields from that provider, limited to what you authorize.
        </p>
        <p>
          <strong>Advertisers (KYC, after join).</strong> TIN certificate, national ID, and business license uploads
          at <code>/app/kyc</code>. Wallet and payment/refill details processed via payment partners. Business
          profile: name, city, website, bio, and five social links. Marketplace orders (title, description,
          platforms, categories, KPIs, budget as Money).
        </p>
        <p>
          <strong>Creators (KYC, after join).</strong> National ID, a live photo for identity verification,
          screenshots of page analytics and admin/owner view, at <code>/studio/kyc</code>. Public profile: display
          name, city, category, bio. Packages (title, platform, deliverable, price as Money) created in the studio
          at <code>/studio/packages</code>, not on join. Optional page claim for a listed handle. Past-campaign
          portfolio rows you confirm.
        </p>
        <p>
          <strong>Offer and brief information.</strong> Orders posted by Advertisers; briefs, samples, posted video
          URLs, comments, and release requests between the matched parties.
        </p>
        <h3>2.2 Information collected automatically</h3>
        <ul>
          <li>Tracking-link and promo-code click data when that feature is live (<code>/r/{"{code}"}</code>).</li>
          <li>Performance metrics from tracking (clicks, conversions) and, where obtainable, engagement.</li>
          <li>Device and usage data (IP address, browser, logs, approximate location from IP).</li>
          <li>Session cookies used to keep you signed in and route you to the correct workspace.</li>
        </ul>
        <h3>2.3 Information from third parties</h3>
        <ul>
          <li>Social platforms, to the extent you connect an account or submit analytics screenshots (follower counts, engagement, ownership proof).</li>
          <li>Payment processors for wallet refills, escrow, and payouts (amounts as Money: string amount plus currency, typically ETB).</li>
          <li>Identity-verification providers, if we use one.</li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your information</h2>
        <ul>
          <li>Create and manage your account; verify identity; for Creators, verify ownership or control of social accounts and listed-page claims.</li>
          <li>Operate the Marketplace: matching, briefs, packages, public creator pages, and the public order board.</li>
          <li>Process wallet deposits, escrow holds, fee deductions, and payouts. Payout Agent staff may view balances and create payment requests; they cannot review KYC or approve Creators.</li>
          <li>Conduct manual verification of promotional performance, including video analytics review against brief KPIs (views, likes, comments).</li>
          <li>Communicate about your account, orders, briefs, and Platform updates.</li>
          <li>Detect, investigate, and prevent fraud, fake engagement, policy violations, and unauthorized access.</li>
          <li>Comply with legal, tax, and regulatory obligations under Ethiopian law.</li>
          <li>Improve and secure the Platform. Structured audit logs record money, auth, and approval events. We do not log secrets, KYC file URLs, national ID numbers, or TIN values.</li>
        </ul>
        <p>
          We do not use KYC documents (ID, TIN certificate, business license, verification selfie) for any purpose
          other than verification, fraud prevention, legal compliance, and account security, unless we ask for and
          receive your separate consent.
        </p>
      </section>

      <section>
        <h2>4. Legal bases and consent</h2>
        <p>
          Where required by applicable law, we process personal data on the basis of: your consent (for example KYC
          uploads, identity photos, and social-account grants); performance of our contract with you (the{" "}
          <Link href="/terms">Terms of Service</Link>); our legitimate interests in operating a trustworthy
          marketplace and preventing fraud; and compliance with legal obligations (for example tax and business
          registration verification).
        </p>
      </section>

      <section>
        <h2>5. How we share information</h2>
        <ul>
          <li>
            <strong>Counterparties on the Platform</strong>, on a need-to-know basis. An Advertiser may see a
            Creator’s public profile, social links, packages, past campaigns you publish, and relevant performance
            metrics for a matched brief. A Creator may see relevant order and brand information. We do not share raw
            KYC documents between Advertisers and Creators.
          </li>
          <li>
            <strong>Payment processors and financial partners</strong>, to process wallet refills, escrow, and
            payouts.
          </li>
          <li>
            <strong>Identity-verification providers</strong>, if used, to confirm submitted documents.
          </li>
          <li>
            <strong>Social platforms</strong> you choose to connect, under that platform’s own terms.
          </li>
          <li>
            <strong>Service providers</strong> who host infrastructure (including Firebase, Supabase, or Convex when
            configured), provide analytics, or support operations, under confidentiality and data-protection
            obligations. The live data provider is selected per environment; the user interface does not talk to
            those SDKs directly.
          </li>
          <li>
            <strong>Regulators, tax authorities, or law enforcement</strong>, where required by Ethiopian law, court
            order, or to protect the rights, property, or safety of Yaltopia Tech, our users, or the public.
          </li>
          <li>
            <strong>A successor entity</strong>, in the event of a merger, acquisition, or sale of assets, subject to
            this Policy or a substantially similar one.
          </li>
        </ul>
        <p>We do not sell your personal data.</p>
      </section>

      <section>
        <h2>6. Manual verification process</h2>
        <p>
          Certain performance results (for example video analytics summaries, samples, and posted content) are
          reviewed by authorized Admin staff as part of verification and dispute resolution. Payout Agents do not
          perform KYC review. Access to KYC files is limited to the owner and Admin.
        </p>
      </section>

      <section>
        <h2>7. Data retention</h2>
        <p>
          We retain personal data for as long as your account is active and for a reasonable period afterward to
          comply with legal, tax, accounting, and dispute-resolution requirements. KYC documents are generally
          retained for the period required under applicable Ethiopian recordkeeping and anti-fraud obligations, after
          which they are securely deleted or anonymized, unless a longer period is required by law or an ongoing
          dispute. Unclaimed placeholder pages and labeled demo portfolios are not treated as a Creator’s confirmed
          paid work until the handle is claimed and the work is confirmed.
        </p>
      </section>

      <section>
        <h2>8. Data security</h2>
        <p>
          We use administrative, technical, and physical safeguards designed to protect personal data, including
          restricted storage paths for KYC, encryption in transit where applicable, role-based access to workspaces,
          and access controls for verification staff. No system is completely secure; we cannot guarantee absolute
          security.
        </p>
      </section>

      <section>
        <h2>9. Your rights</h2>
        <p>Subject to applicable law, you may:</p>
        <ul>
          <li>Request access to the personal data we hold about you;</li>
          <li>Request correction of inaccurate or incomplete data;</li>
          <li>Request deletion of your data, subject to legal, tax, and fraud-prevention retention needs;</li>
          <li>Withdraw consent for optional processing (for example optional communications), where consent is the basis;</li>
          <li>Disconnect a social grant, which may limit Marketplace access until required platforms are connected again;</li>
          <li>Object to certain processing, where applicable.</li>
        </ul>
        <p>
          To exercise these rights, contact us using the details in Section 12. We may need to verify your identity
          before acting on a request.
        </p>
      </section>

      <section>
        <h2>10. Children</h2>
        <p>
          The Platform is not directed to individuals under 18. We do not knowingly collect personal data from
          minors. If we learn we have collected data from a minor, we will delete it.
        </p>
      </section>

      <section>
        <h2>11. International transfers</h2>
        <p>
          If your data is transferred to or processed in a country other than Ethiopia (for example where a hosting
          or social-login provider’s servers are located), we take steps to ensure it continues to be protected in a
          manner consistent with this Policy.
        </p>
      </section>

      <section>
        <h2>12. Contact us</h2>
        <p>
          For privacy questions, requests, or complaints:{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Website contact:{" "}
          <a href={BOOK_A_CALL_URL}>{BOOK_A_CALL_URL}</a>.
        </p>
        <p>Registered address will be published here when the Ethiopian entity filing is complete.</p>
      </section>

      <section>
        <h2>13. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated via the Platform
          or email. The “Last updated” date at the top reflects the most recent revision.
        </p>
      </section>

      <p className="text-xs text-muted-foreground">
        This document is a product template and does not constitute legal advice. Have a licensed Ethiopian attorney
        review personal-data obligations, KYC/AML handling, social-login token use, and rules that apply to affiliate
        marketplaces and digital wallets in Ethiopia.
      </p>
    </LegalShell>
  );
}
