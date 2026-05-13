import { type KeyboardEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { onboardingSchema } from "../context/FormContext";
import type { OnboardingFormValues } from "../context/FormContext";

export function meta() {
  return [
    { title: "OTP Verification" },
    {
      name: "description",
      content: "Verify your phone number with an OTP code.",
    },
  ];
}

export default function VerifyPhoneNumber() {
  const navigate = useNavigate();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors, isValidating },
  } = useFormContext<OnboardingFormValues>();

  const otpValues = watch(["d1", "d2", "d3", "d4"]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const updateOtp = (index: number, value: string) => {
    const nextValue = value.slice(-1);
    const field = (`d${index + 1}` as keyof OnboardingFormValues) as keyof OnboardingFormValues;
    setValue(field, nextValue, { shouldValidate: true });

    if (nextValue && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const otpSchema = onboardingSchema.pick({ d1: true, d2: true, d3: true, d4: true });
  const otpValidation = otpSchema.safeParse({ d1: otpValues[0], d2: otpValues[1], d3: otpValues[2], d4: otpValues[3] });
  const isOtpValid = otpValidation.success;

  const onSubmit = async () => {
    if (otpValidation.success) {
      navigate("/personal-details");
    } else {
      otpValidation.error.issues.forEach((error: any) => {
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
            <ProgressBar percentage={50} />

            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950">
              OTP Verification
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              An OTP has been sent to your mobile number
            </p>

            <div className="w-fit flex flex-col items-end">
              <div className="mt-10 grid grid-cols-4 gap-12 w-fit">
                {( ["d1", "d2", "d3", "d4"] as const ).map((field, index) => {
                  const { ref, onChange, onBlur, name, ...inputProps } = register(field);
                  return (
                    <div key={field}>
                      <input
                        {...inputProps}
                        name={name}
                        ref={(el) => {
                          inputsRef.current[index] = el;
                          ref(el);
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        onChange={(event) => {
                          onChange(event);
                          updateOtp(index, event.target.value);
                        }}
                        onBlur={onBlur}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        className="h-16 w-16 rounded-2xl border border-slate-200 bg-slate-50 text-center text-2xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />
                      {errors[field] ? (
                        <p className="mt-2 text-xs text-red-500">{errors[field]?.message}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
                <span>Did not receive OTP?</span>
                <button
                  type="button"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isOtpValid || isValidating}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </div>
        </form>
      </motion.section>
    </Layout>
  );
}
