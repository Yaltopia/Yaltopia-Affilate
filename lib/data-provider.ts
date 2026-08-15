import { DATA_PROVIDER_IDS, type DataProviderId } from "@/packages/contracts";

export function dataProviderId(): DataProviderId {
  const raw = process.env.NEXT_PUBLIC_DATA_PROVIDER ?? "firebase";
  return DATA_PROVIDER_IDS.includes(raw as DataProviderId) ? (raw as DataProviderId) : "firebase";
}
