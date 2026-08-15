import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell } from "@/components/legal/legal-shell";
import { BOOK_A_CALL_URL, PRIVACY_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service · Yaltopia Affiliate",
  description: "Terms for using the Yaltopia Affiliate marketplace.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service">
      <p>
        These Terms of Service (“Terms”) are a contract between you and <strong>Yaltopia Tech</strong> for use of{" "}
        <strong>Yaltopia Affiliate</strong> (the “Platform”). By creating an account, signing in with a social
        provider, or using the public site, you agree to these Terms and the{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the Platform.
      </p>

      <section>
        <h2>1. The Platform</h2>
        <p>
          Yaltopia Affiliate is an open marketplace. Advertisers list orders and brief Creators. Creators promote
          with a promo code and a tracking link. Admin staff may approve accounts and review KYC. A Payout Agent
          (Admin capability, not a public join) may view what an Advertiser owes and request payment. Shoppers stay
          anonymous. Tracking redirects at <code>/r/{"{code}"}</code> may ship later.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old and able to form a binding contract under Ethiopian law. Advertisers
          must be authorized to bind the business they represent. We may refuse, suspend, or close accounts that
          fail KYC, follower thresholds, or these Terms.
        </p>
      </section>

      <section>
        <h2>3. Accounts and social login</h2>
        <p>
          There is one login for every role. You sign in with a social provider (Google, TikTok, Instagram, YouTube,
          Telegram, or Facebook). Join is social login plus a grant of access to the five marketplace platforms.
          We do not offer email/password registration on the customer site. You are responsible for the connected
          accounts and for keeping provider access under your control.
        </p>
        <p>
          Roles on the account decide the workspace: Advertiser <code>/app</code>, Creator <code>/studio</code>,
          Admin or Payout Agent <code>/admin</code>. Admin and Payout Agent are assigned; they are not a public
          join. A profile may be both Creator and Advertiser.
        </p>
      </section>

      <section>
        <h2>4. Profiles, packages, and claims</h2>
        <p>
          After join, you complete a profile (and KYC) in the workspace. Creators create sellable packages in the
          studio (<code>/studio/packages</code>), not on the join form. Packages shown on public cards and{" "}
          <code>/c/{"{id}"}</code> must be accurate. Listed Favikon placeholder pages start unclaimed. You may
          claim a handle that is yours; Admin confirms or rejects. You may not sell a handle you do not control.
        </p>
      </section>

      <section>
        <h2>5. KYC and marketplace access</h2>
        <p>
          Auth signup is open. Marketplace access (live orders, briefs, payouts) requires a complete KYC pack and
          Admin approval. Advertisers upload TIN certificate, national ID, and business license. Creators upload
          national ID, a liveness photo, page-analytics proof, and admin-view proof, and must meet the
          then-current follower threshold on one linked social (launch: 1,000+). Payout Agents cannot review KYC.
        </p>
      </section>

      <section>
        <h2>6. Orders, briefs, and performance</h2>
        <p>
          Advertisers publish orders on the public board. After the parties agree, the Advertiser deposits the order
          amount into wallet escrow. The Creator sends a sample, revises if required, posts, then asks for release.
          Funds send only when the brief’s views, likes, and comments criteria are met, or as Admin resolves a
          dispute. Money on the Platform is <code>{"{ amount: string, currency }"}</code> (ETB). Do not invent
          floating-point balances.
        </p>
        <p>
          Fake engagement, purchased metrics, misleading samples, or misstated follower counts are prohibited. We
          may withhold or reverse payouts and suspend accounts after review.
        </p>
      </section>

      <section>
        <h2>7. Wallet, fees, and payouts</h2>
        <p>
          Advertiser wallets hold available and reserved balances. A Payout Agent may create a payment request to an
          Advertiser. Creator earnings release only through the Platform’s escrow path. You authorize us and our
          payment partners to process deposits, reserves, fees, and payouts. You are responsible for taxes on your
          side.
        </p>
      </section>

      <section>
        <h2>8. Tracking links and promo codes</h2>
        <p>
          When live, last-click cookies and postbacks attribute orders to a code or link. Promo code wins over
          click where both exist. You must not wrap, cloak, or hijack another party’s codes or links.
        </p>
      </section>

      <section>
        <h2>9. Acceptable use</h2>
        <ul>
          <li>No unlawful content, hate, or exploitation of minors.</li>
          <li>No scraping, attacking, or bypassing access controls on the Platform or connected socials.</li>
          <li>No impersonation, including claiming a listed page that is not yours.</li>
          <li>No use of another person’s KYC documents.</li>
        </ul>
      </section>

      <section>
        <h2>10. Your content and our license</h2>
        <p>
          You keep rights in your profile, packages, samples, and posted videos. You grant Yaltopia Tech a
          non-exclusive license to host, display, and transmit that content as needed to run the Marketplace
          (including public creator pages and order cards). Demo portfolios on unclaimed placeholders are not your
          confirmed paid work.
        </p>
      </section>

      <section>
        <h2>11. Platform availability</h2>
        <p>
          We provide the Platform “as is.” We may change features, take the service down for maintenance, or refuse
          a transaction. We are not a party to every commercial term between Advertiser and Creator except as
          escrow and these Terms require.
        </p>
      </section>

      <section>
        <h2>12. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by Ethiopian law, Yaltopia Tech is not liable for lost profits, lost data,
          or indirect damages, or for a counterparty’s failure to perform. Our aggregate liability for a claim
          relating to the Platform is limited to fees you paid us in the three months before the claim, or ETB
          5,000, whichever is greater, except where liability cannot be limited (for example proven fraud or
          personal injury caused by us).
        </p>
      </section>

      <section>
        <h2>13. Suspension and termination</h2>
        <p>
          You may stop using the Platform at any time. We may suspend or close an account for KYC failure, fraud,
          unpaid payment requests, or breach of these Terms. Outstanding escrow and legal retention still apply.
        </p>
      </section>

      <section>
        <h2>14. Governing law</h2>
        <p>
          These Terms are governed by the laws of the Federal Democratic Republic of Ethiopia. Courts in Addis
          Ababa have exclusive jurisdiction, except that we may seek injunctive relief elsewhere to protect the
          Platform.
        </p>
      </section>

      <section>
        <h2>15. Contact</h2>
        <p>
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          {" · "}
          <a href={BOOK_A_CALL_URL}>{BOOK_A_CALL_URL}</a>
        </p>
      </section>

      <section>
        <h2>16. Changes</h2>
        <p>
          We may update these Terms. Material changes will be posted on this page and, where required, notified in
          the workspace. Continued use after the updated date is acceptance of the new Terms.
        </p>
      </section>

      <p className="text-xs text-muted-foreground">
        This document is a product template and does not constitute legal advice. Have a licensed Ethiopian attorney
        review marketplace, escrow, KYC/AML, and consumer terms before production launch.
      </p>
    </LegalShell>
  );
}
