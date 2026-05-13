import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router";
import type { OnboardingFormValues } from "../context/FormContext";

const accountTypes = [
  {
    id: "personal",
    title: "Personal",
    icon: (
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 9.5C11.5312 9.5 14 11.9688 14 15C14 15.5625 13.5312 16 13 16H1C0.4375 16 0 15.5625 0 15C0 11.9688 2.4375 9.5 5.5 9.5H8.5ZM1.5 14.5H12.4688C12.2188 12.5312 10.5312 11 8.5 11H5.5C3.4375 11 1.75 12.5312 1.5 14.5ZM7 8C4.78125 8 3 6.21875 3 4C3 1.8125 4.78125 0 7 0C9.1875 0 11 1.8125 11 4C11 6.21875 9.1875 8 7 8ZM7 1.5C5.59375 1.5 4.5 2.625 4.5 4C4.5 5.40625 5.59375 6.5 7 6.5C8.375 6.5 9.5 5.40625 9.5 4C9.5 2.625 8.375 1.5 7 1.5Z"
          fill="#0054FD"
        />
      </svg>
    ),
  },
  {
    id: "business",
    title: "Business",
    icon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 3C15.0938 3 16 3.90625 16 5V13C16 14.125 15.0938 15 14 15H2C0.875 15 0 14.125 0 13V5C0 3.90625 0.875 3 2 3H4V2C4 0.90625 4.875 0 6 0H10C11.0938 0 12 0.90625 12 2V3H14ZM5.5 2V3H10.5V2C10.5 1.75 10.25 1.5 10 1.5H6C5.71875 1.5 5.5 1.75 5.5 2ZM11.5 4.5H4.5V13.5H11.5V4.5ZM1.5 13C1.5 13.2812 1.71875 13.5 2 13.5H3V4.5H2C1.71875 4.5 1.5 4.75 1.5 5V13ZM14.5 13V5C14.5 4.75 14.25 4.5 14 4.5H13V13.5H14C14.25 13.5 14.5 13.2812 14.5 13Z"
          fill="#132C4A"
        />
      </svg>
    ),
  },
] as const;

type AccountTypeId = (typeof accountTypes)[number]["id"];

export function AccountType() {
  const navigate = useNavigate();
  const { watch, setValue } = useFormContext<OnboardingFormValues>();
  const selectedType = watch("accountType");

  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        className="rounded-4xl bg-white p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.32)] w-full md:w-1/2 h-full flex flex-col justify-between"
      >
        <div>
          <p className="text-base font-medium text-slate-500">
            To join us tell us what type of account you are opening
          </p>

          <div className="mt-8 space-y-4">
            {accountTypes.map((accountType) => {
              const selected = selectedType === accountType.id;
              return (
                <button
                  key={accountType.id}
                  type="button"
                  onClick={() => setValue("accountType", accountType.id, { shouldValidate: true })}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition duration-200 ${
                    selected
                      ? "border-blue-500 bg-blue-50 shadow-[0_12px_40px_-20px_rgba(59,130,246,0.45)]"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700">
                      {accountType.icon}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">
                        {accountType.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        Suitable for {accountType.title.toLowerCase()} users
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-base font-semibold shrink-0 ${
                      selected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {selected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="button"
            disabled={!selectedType}
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 hover:bg-blue-500"
            onClick={() => navigate("/phone-number")}
          >
            Continue
          </button>
        </div>
      </motion.section>
    </Layout>
  );
}
