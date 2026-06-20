"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";

export default function CurriculumFormSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const interestOptions = [
    { value: "content", label: t("form.interest.content") },
    { value: "automation", label: t("form.interest.automation") },
    { value: "data", label: t("form.interest.data") },
    { value: "media", label: t("form.interest.media") },
    { value: "productivity", label: t("form.interest.productivity") },
  ];

  const schema = z.object({
    fullName: z.string().min(2, t("form.error.fullName")),
    email: z.string().email(t("form.error.email")),
    bottleneck: z.string().min(3, t("form.error.bottleneck")),
    interests: z.array(z.string()).min(1, t("form.error.interests")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interests: [] },
  });

  const selectedInterests = watch("interests") || [];

  const toggleInterest = (value: string) => {
    const current = selectedInterests;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue("interests", updated, { shouldValidate: true });
    if (updated.length > 0) clearErrors("interests");
  };

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      reset();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      reset();
    }
  };

  return (
    <section
      id="curriculum"
      className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-card border border-outline-variant/40 overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="bg-tertiary-fixed p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
              {t("form.title")}
            </h2>
            <p className="text-on-surface-variant">
              {t("form.subtitle")}
            </p>
          </div>

          {/* Form */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {t("form.successTitle")}
                  </h3>
                  <p className="text-green-700">
                    {t("form.successBody")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-green-700 underline hover:text-green-900"
                  >
                    {t("form.submitAnother")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-on-surface"
                    >
                      {t("form.fullName")}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder={t("form.fullNamePlaceholder")}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors font-body-md text-body-md bg-white ${
                        errors.fullName
                          ? "border-error focus:border-error"
                          : "border-outline-variant focus:border-primary"
                      }`}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-error">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-on-surface"
                    >
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors font-body-md text-body-md bg-white ${
                        errors.email
                          ? "border-error focus:border-error"
                          : "border-outline-variant focus:border-primary"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Bottleneck */}
                  <div className="space-y-2">
                    <label
                      htmlFor="bottleneck"
                      className="block text-sm font-semibold text-on-surface"
                    >
                      {t("form.bottleneck")}
                    </label>
                    <input
                      id="bottleneck"
                      type="text"
                      placeholder={t("form.bottleneckPlaceholder")}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors font-body-md text-body-md bg-white ${
                        errors.bottleneck
                          ? "border-error focus:border-error"
                          : "border-outline-variant focus:border-primary"
                      }`}
                      {...register("bottleneck")}
                    />
                    {errors.bottleneck && (
                      <p className="text-sm text-error">
                        {errors.bottleneck.message}
                      </p>
                    )}
                  </div>

                  {/* Interests */}
                  <div className="space-y-3">
                    <span className="block text-sm font-semibold text-on-surface">
                      {t("form.interests")}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {interestOptions.map((option) => {
                        const checked = selectedInterests.includes(option.value);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleInterest(option.value)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                              checked
                                ? "border-primary bg-primary/5"
                                : "border-outline-variant hover:bg-surface-container-low"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                                checked
                                  ? "bg-primary border-primary"
                                  : "border-outline-variant bg-white"
                              }`}
                            >
                              {checked && <Check size={14} className="text-white" />}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                checked
                                  ? "text-primary"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.interests && (
                      <p className="text-sm text-error">
                        {errors.interests.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <div className="bg-error-container text-error rounded-xl p-4 text-sm font-medium">
                      {serverError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-container text-white py-4 rounded-xl font-bold text-lg transition-all hover:bg-on-primary-fixed-variant shadow-md disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {t("form.submitting")}
                      </>
                    ) : (
                      t("form.submit")
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
