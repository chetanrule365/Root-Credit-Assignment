import { motion } from "framer-motion";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { SummaryDialog } from "../components/SummaryDialog";
import { onboardingSchema } from "../context/FormContext";
import type { OnboardingFormValues } from "../context/FormContext";

function EyeIcon({ slashed }: { slashed: boolean }) {
  return slashed ? (
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1.66217C5.80683 1.66217 1.6014 4.64823 0.0350939 9.09284C-0.011698 9.22645 -0.011698 9.37062 0.0350939 9.50423C1.6014 13.9488 5.80683 16.9349 10.5 16.9349C15.1932 16.9349 19.3986 13.9488 20.9649 9.50423C21.0117 9.37062 21.0117 9.22645 20.9649 9.09284C19.3986 4.64823 15.1931 1.66217 10.5 1.66217ZM10.5 15.6622C6.4407 15.6622 2.79215 13.1136 1.35209 9.29853C2.79215 5.48346 6.44066 2.93491 10.5 2.93491C14.5593 2.93491 18.2078 5.48346 19.6479 9.29853C18.2078 13.1136 14.5593 15.6622 10.5 15.6622Z" fill="#0054FD"/>
      <path d="M10.5079 5.48053C8.33659 5.48053 6.57031 7.19326 6.57031 9.29872C6.57031 11.4042 8.33659 13.1169 10.5079 13.1169C12.6792 13.1169 14.4455 11.4042 14.4455 9.29872C14.4455 7.19322 12.6792 5.48053 10.5079 5.48053ZM10.5079 11.8442C9.06012 11.8442 7.88285 10.7026 7.88285 9.29872C7.88285 7.89485 9.06015 6.75327 10.5079 6.75327C11.9557 6.75327 13.1329 7.89488 13.1329 9.29872C13.1329 10.7026 11.9556 11.8442 10.5079 11.8442Z" fill="#0054FD"/>
      <line x1="1.30668" y1="0.353539" x2="18.4885" y2="17.5354" stroke="#0054FD"/>
    </svg>
  ) : (
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1.66217C5.80683 1.66217 1.6014 4.64823 0.0350939 9.09284C-0.011698 9.22645 -0.011698 9.37062 0.0350939 9.50423C1.6014 13.9488 5.80683 16.9349 10.5 16.9349C15.1932 16.9349 19.3986 13.9488 20.9649 9.50423C21.0117 9.37062 21.0117 9.22645 20.9649 9.09284C19.3986 4.64823 15.1931 1.66217 10.5 1.66217ZM10.5 15.6622C6.4407 15.6622 2.79215 13.1136 1.35209 9.29853C2.79215 5.48346 6.44066 2.93491 10.5 2.93491C14.5593 2.93491 18.2078 5.48346 19.6479 9.29853C18.2078 13.1136 14.5593 15.6622 10.5 15.6622Z" fill="#0054FD"/>
      <path d="M10.5079 5.48053C8.33659 5.48053 6.57031 7.19326 6.57031 9.29872C6.57031 11.4042 8.33659 13.1169 10.5079 13.1169C12.6792 13.1169 14.4455 11.4042 14.4455 9.29872C14.4455 7.19322 12.6792 5.48053 10.5079 5.48053ZM10.5079 11.8442C9.06012 11.8442 7.88285 10.7026 7.88285 9.29872C7.88285 7.89485 9.06015 6.75327 10.5079 6.75327C11.9557 6.75327 13.1329 7.89488 13.1329 9.29872C13.1329 10.7026 11.9556 11.8442 10.5079 11.8442Z" fill="#0054FD"/>
    </svg>
  );
}

export default function CreatePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const {
    register,
    watch,
    setError,
    formState: { errors, isValidating },
  } = useFormContext<OnboardingFormValues>();

  const accountType = watch("accountType");
  const countryCode = watch("countryCode");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const phone = watch("phone");

  const passwordSchema = onboardingSchema.pick({ password: true, confirmPassword: true });
  const passwordValidation = passwordSchema.safeParse({ password: watchPassword, confirmPassword: watchConfirmPassword });
  const isPasswordValid = passwordValidation.success;

  const closeModal = () => setIsSummaryOpen(false);
  const confirmAndContinue = () => navigate("/");

  const onSubmit = async () => {
    if (passwordValidation.success) {
      setIsSummaryOpen(true);
    } else {
      passwordValidation.error.issues.forEach((error: any) => {
        setError(error.path[0] as keyof OnboardingFormValues, { message: error.message });
      });
    }
  };

  return (
    <Layout>
      <motion.section
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        className="rounded-4xl bg-white p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.32)] w-full md:w-1/2 h-full flex flex-col justify-between"
      >
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="h-full flex flex-col justify-between">
          <div>
            <ProgressBar percentage={100} />

            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950">
              Create Password for your account
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Secure your account with a strong password.
            </p>

            <div className="mt-10 space-y-6">
              <label className="block text-sm font-medium text-slate-700">
                Enter new password
                <div className="relative mt-2">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 pr-14 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-4 inline-flex items-center text-slate-400 transition hover:text-slate-700"
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    <EyeIcon slashed={!showPassword} />
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">Must be at least 6 characters</p>
                )}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Confirm password
                <div className="relative mt-2">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 pr-14 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute inset-y-0 right-4 inline-flex items-center text-slate-400 transition hover:text-slate-700"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                  >
                    <EyeIcon slashed={!showConfirmPassword} />
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-500">{errors.confirmPassword.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">Both passwords must match</p>
                )}
              </label>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isPasswordValid || isValidating}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              Continue
            </button>
          </div>
        </form>
      </motion.section>

      {isSummaryOpen ? (
        <SummaryDialog
          accountType={accountType}
          fullName={`${firstName} ${lastName}`}
          phoneNumber={`${countryCode} ${phone}`}
          onClose={closeModal}
          onConfirm={confirmAndContinue}
        />
      ) : null}
    </Layout>
  );
}
