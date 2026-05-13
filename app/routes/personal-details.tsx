import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { onboardingSchema } from "../context/FormContext";
import type { OnboardingFormValues } from "../context/FormContext";

export default function PersonalDetails() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    setError,
    formState: { errors, isValidating },
  } = useFormContext<OnboardingFormValues>();

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  const nameSchema = onboardingSchema.pick({ firstName: true, lastName: true });
  const nameValidation = nameSchema.safeParse({ firstName: watchFirstName, lastName: watchLastName });
  const isNameValid = nameValidation.success;

  const onSubmit = async () => {
    if (nameValidation.success) {
      navigate("/create-password");
    } else {
      nameValidation.error.issues.forEach((error: any) => {
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
            <ProgressBar percentage={75} />

            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950">
              What is your name?
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Please enter your full name so we can personalise your account.
            </p>

            <div className="mt-10 space-y-6">
              <label className="block text-sm font-medium text-slate-700">
                First Name
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="Oliver"
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                {errors.firstName ? (
                  <p className="mt-2 text-sm text-red-500">{errors.firstName.message}</p>
                ) : null}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Last Name
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Last Name"
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                {errors.lastName ? (
                  <p className="mt-2 text-sm text-red-500">{errors.lastName.message}</p>
                ) : null}
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
              disabled={!isNameValid || isValidating}
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
