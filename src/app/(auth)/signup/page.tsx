"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GNB } from "@/components/GNB";
import { SignupStepper } from "./_components/SignupStepper";
import { StepUserType } from "./_components/StepUserType";
import { StepTerms } from "./_components/StepTerms";
import { StepBasicInfo } from "./_components/StepBasicInfo";
import { StepBusinessInfo } from "./_components/StepBusinessInfo";
import { SignupCompleteModal } from "./_components/SignupCompleteModal";
import { useSignupForm } from "./_hooks/useSignupForm";
import { useSignup } from "@/hooks/useSignup";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { authApi } from "@/api/auth";
import type { SignupRequest, GoogleSignupRequest } from "@/types/auth";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pendingCode = searchParams.get("pendingCode");

  const {
    step,
    formData,
    updateForm,
    updateTerms,
    updateBusiness,
    toggleAllTerms,
    nextStep,
    prevStep,
    requiredTermsAgreed,
    allTermsAgreed,
  } = useSignupForm();

  const signupMutation = useSignup();
  const googleSignupMutation = useGoogleSignup();

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [introPhase, setIntroPhase] = useState<"intro" | "exiting" | "done">("intro");

  const isGoogleFlow = !!pendingCode;

  // Intro animation: show intro for 1.5s, then exit transition
  useEffect(() => {
    const exitTimer = setTimeout(() => setIntroPhase("exiting"), 1500);
    const doneTimer = setTimeout(() => setIntroPhase("done"), 2300);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Fetch google pending email
  useEffect(() => {
    if (pendingCode && !googleEmail) {
      authApi.googlePending(pendingCode).then((res) => {
        if (res.success) {
          setGoogleEmail(res.data.email);
        }
      });
    }
  }, [pendingCode, googleEmail]);

  const handleSubmit = () => {
    if (isGoogleFlow && pendingCode) {
      const data: GoogleSignupRequest = {
        pendingCode,
        userType: "advertiser",
        ageGroup: formData.ageGroup,
        terms: {
          service: true,
          privacy: true,
          overseas: true,
          adid: formData.terms.adid,
        },
        business: {
          industryMain: formData.business.industryMain,
          industrySub: formData.business.industrySub || undefined,
          businessName: formData.business.businessName || undefined,
          businessDuration: formData.business.businessDuration || undefined,
        },
      };
      googleSignupMutation.mutate(data, {
        onSuccess: (res) => {
          if (res.success) {
            setShowCompleteModal(true);
          }
        },
      });
    } else {
      const data: SignupRequest = {
        email: formData.email,
        password: formData.password,
        userType: "advertiser",
        ageGroup: formData.ageGroup,
        terms: {
          service: true,
          privacy: true,
          overseas: true,
          adid: formData.terms.adid,
        },
        business: {
          industryMain: formData.business.industryMain,
          industrySub: formData.business.industrySub || undefined,
          businessName: formData.business.businessName || undefined,
          businessDuration: formData.business.businessDuration || undefined,
        },
      };
      signupMutation.mutate(data, {
        onSuccess: (res) => {
          if (res.success) {
            setShowCompleteModal(true);
          }
        },
      });
    }
  };

  const handleNext = () => nextStep();
  const handlePrev = () => prevStep();

  const showTitle = step === 1;
  const introActive = introPhase !== "done";
  const showBackground = introPhase === "intro";
  const formReady = introPhase === "exiting" || introPhase === "done";

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative overflow-hidden">
      <GNB
        state="logout"
        tabs={[
          { label: "모델 카탈로그", value: "catalog" },
          { label: "생성하기", value: "create" },
          { label: "요금제", value: "pricing" },
        ]}
        onLoginClick={() => router.push("/login")}
      />

      {/* Intro overlay — gradient blobs + glassmorphism */}
      {introActive && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: showBackground ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          {/* Gradient blob 1 — pink/purple radial */}
          <div
            className="absolute"
            style={{
              width: 500,
              height: 500,
              left: "20.8%",
              top: 165,
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFD1E3, #DFBAE3)",
              filter: "blur(175px)",
            }}
          />
          {/* Gradient blob 2 — pink/violet linear */}
          <div
            className="absolute"
            style={{
              width: 404,
              height: 404,
              left: "50.4%",
              top: 241,
              borderRadius: "50%",
              background: "linear-gradient(161deg, #F3498D, #A63EB1)",
              filter: "blur(175px)",
            }}
          />
          {/* Glassmorphism overlay */}
          <div
            className="absolute inset-0"
            style={{
              top: 80,
              backgroundColor: "rgba(251, 251, 251, 0.6)",
              backdropFilter: "blur(30.625px)",
              WebkitBackdropFilter: "blur(30.625px)",
            }}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col items-center pt-20">
        {/* Title — starts lower (intro), moves up to final position */}
        {showTitle && (
          <p
            className="text-heading-m text-neutral-900 text-center mb-7.5 whitespace-pre-line z-30"
            style={{
              transform: formReady ? "translateY(0)" : "translateY(120px)",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {"뮤즈가 처음이시군요!\n맞춤형 서비스를 제공해 드리기 위해 몇 가지만 여쭤볼게요."}
          </p>
        )}

        {/* Content area */}
        <div
          className="flex flex-col items-center w-[457px] gap-12"
          style={{
            opacity: formReady ? 1 : 0,
            transform: formReady ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <SignupStepper currentStep={step} isGoogleFlow={isGoogleFlow} />

          <div className="flex flex-col items-end w-full gap-15">
            {step === 1 && (
              <StepUserType
                userType={formData.userType}
                onSelect={(type) => updateForm("userType", type)}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <StepTerms
                terms={formData.terms}
                onUpdateTerm={updateTerms}
                onToggleAll={toggleAllTerms}
                allAgreed={allTermsAgreed}
                requiredAgreed={requiredTermsAgreed}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {step === 3 && (
              <StepBasicInfo
                formData={formData}
                onUpdate={updateForm}
                onNext={handleNext}
                onPrev={handlePrev}
                isGoogleFlow={isGoogleFlow}
                googleEmail={googleEmail}
              />
            )}

            {step === 4 && (
              <StepBusinessInfo
                business={formData.business}
                onUpdate={updateBusiness}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
                isSubmitting={signupMutation.isPending || googleSignupMutation.isPending}
              />
            )}
          </div>
        </div>
      </main>

      <SignupCompleteModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
      />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
