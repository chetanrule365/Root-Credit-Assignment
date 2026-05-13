import type { MetaArgs } from "./+types/home";
import { AccountType } from "./account-type";

export function meta({}: MetaArgs) {
  return [
    { title: "Account Type" },
    { name: "description", content: "Select the account type to begin onboarding." },
  ];
}

export default function Home() {
  return <AccountType />;
}
