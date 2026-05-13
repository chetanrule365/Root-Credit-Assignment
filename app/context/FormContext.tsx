import { createContext, useContext, type ReactNode } from "react";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const onboardingSchema = z.object({
  // Account Type Step
  accountType: z.enum(["personal", "business"]),

  // Phone Number Step
  countryCode: z.string().nonempty("Country is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^[0-9]{7,15}$/, "Enter a valid phone number"),

  // OTP Step
  d1: z.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit"),
  d2: z.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit"),
  d3: z.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit"),
  d4: z.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit"),

  // Personal Details Step
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  // Password Step
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
});

onboardingSchema.superRefine((values, ctx) => {
  if (values.password !== values.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords must match",
    });
  }
});

export { onboardingSchema };

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export const FormContext = createContext<
  UseFormReturn<OnboardingFormValues> | undefined
>(undefined);

export function useOnboardingForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useOnboardingForm must be used within OnboardingFormProvider");
  }
  return context;
}

interface FormProviderProps {
  children: ReactNode;
}

export function OnboardingFormProvider({ children }: FormProviderProps) {
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      accountType: "personal",
      countryCode: "+1",
      phone: "",
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
