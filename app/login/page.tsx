import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { PageLoader } from "@/components/brand/page-loader";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader label="Loading login" />}>
      <LoginForm />
    </Suspense>
  );
}
