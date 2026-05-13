import { motion } from "framer-motion";
import { type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { onboardingSchema } from "../context/FormContext";
import type { OnboardingFormValues } from "../context/FormContext";

const countries = [
  { flag: "https://flagcdn.com/w40/us.png", code: "+1" },
  { flag: "https://flagcdn.com/w40/gb.png", code: "+44" },
  { flag: "https://flagcdn.com/w40/in.png", code: "+91" },
  { flag: "https://flagcdn.com/w40/ca.png", code: "+1" },
  { flag: "https://flagcdn.com/w40/au.png", code: "+61" },
  { flag: "https://flagcdn.com/w40/de.png", code: "+49" },
  { flag: "https://flagcdn.com/w40/fr.png", code: "+33" },
  { flag: "https://flagcdn.com/w40/jp.png", code: "+81" },
  { flag: "https://flagcdn.com/w40/br.png", code: "+55" },
  { flag: "https://flagcdn.com/w40/za.png", code: "+27" },
] as const;

type Country = (typeof countries)[number];

export default function PhoneNumber() {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors, isValidating },
  } = useFormContext<OnboardingFormValues>();

  const watchCountryCode = watch("countryCode");
  const watchPhone = watch("phone");

  const onCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find((item) => item.code === event.target.value);
    if (selected) {
      setValue("countryCode", selected.code, { shouldValidate: true });
    }
  };

  const phoneSchema = onboardingSchema.pick({ countryCode: true, phone: true });
  const phoneValidation = phoneSchema.safeParse({ countryCode: watchCountryCode, phone: watchPhone });
  const isPhoneValid = phoneValidation.success;

  const onSubmit = async () => {
    if (phoneValidation.success) {
      navigate("/verify-phone-number");
    } else {
      phoneValidation.error.issues.forEach((error: any) => {
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
            <ProgressBar percentage={25} />

            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950">
              OTP Verification
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Enter your mobile number to receive the OTP code.
            </p>

            <div className="mt-10 space-y-4">
              <div className="text-sm font-medium text-slate-700">
                Mobile Number<span className="text-red-400">*</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex h-16 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
                  <img
                    src={countries.find((item) => item.code === watchCountryCode)?.flag ?? countries[0].flag}
                    alt={watchCountryCode ?? countries[0].code}
                    className="w-5 object-contain"
                  />
                  <select
                    {...register("countryCode")}
                    onChange={(event) => {
                      onCountryChange(event);
                    }}
                    className="h-full bg-transparent text-base text-slate-900 outline-none"
                  >
                    {countries.map((item, index) => (
                      <option key={`${item.code}-${index}`} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="8343989239"
                    className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                  {errors.phone ? (
                    <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
                  ) : null}
                </div>
              </div>
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
              disabled={!isPhoneValid || isValidating}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              Continue
            </button>
          </div>
        </form>
      </motion.section>
    </Layout>
  );
}
