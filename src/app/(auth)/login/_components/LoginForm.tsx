"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { SocialButton } from "@/components/SocialButton";
import { VisibilityOnIcon, VisibilityOffIcon } from "@/components/Icon";
import { ThreeDots } from "@/components/ThreeDots";
import { useLogin } from "@/hooks/useLogin";
import { loginSchema } from "@/lib/validation";
import { safeRedirectPath } from "@/lib/safeRedirect";
import { API_URL } from "@/constants/app";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [dotIndex, setDotIndex] = useState<0 | 1 | 2>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as "email" | "password";
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const interval = setInterval(() => {
      setDotIndex((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 400);

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          clearInterval(interval);
          if (res.success) {
            router.push(safeRedirectPath(searchParams.get("from")));
          } else {
            setServerError(res.error.message);
          }
        },
        onError: () => {
          clearInterval(interval);
          setServerError("로그인 중 오류가 발생했습니다.");
        },
      },
    );
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const isLoading = loginMutation.isPending;

  return (
    <div className="flex flex-col items-center w-[474px] gap-8">
      {/* Title */}
      <div className="flex flex-col items-center w-[290px] gap-1">
        <h1
          className="w-full text-center text-[56px] font-bold leading-none"
          style={{
            fontFamily: "'Gmarket Sans', sans-serif",
            background: "linear-gradient(to bottom, #FFD1E3, #DFBAE3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          muse
        </h1>
        <p className="w-full text-center text-heading-xs text-neutral-900">
          AI 모델 기반 광고 이미지 생성 서비스
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-12">
        {/* Input fields */}
        <div className="flex flex-col w-full gap-0">
          <TextField
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            state={errors.email ? "error" : "default"}
            helperText={errors.email}
            reserveHelperSpace
          />
          <TextField
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            state={errors.password ? "error" : "default"}
            helperText={errors.password}
            reserveHelperSpace
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-neutral-500"
              >
                {showPassword ? (
                  <VisibilityOnIcon size="lg" />
                ) : (
                  <VisibilityOffIcon size="lg" />
                )}
              </button>
            }
          />
        </div>

        {/* Server error */}
        {serverError && (
          <p className="w-full text-[14px] leading-none font-normal text-error-500 pl-3 -mt-8">
            {serverError}
          </p>
        )}

        {/* Login button */}
        <Button
          type="submit"
          hierarchy="primary"
          size="large"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <ThreeDots activeIndex={dotIndex} /> : "로그인"}
        </Button>
      </form>

      {/* Divider + Social + Signup link */}
      <div className="flex flex-col w-full gap-6">
        {/* SNS divider */}
        <div className="flex items-center w-full gap-4">
          <div className="flex-1 h-px bg-neutral-200" />
          <span className="text-caption-m text-neutral-500">
            SNS 계정으로 로그인
          </span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Google button */}
        <SocialButton
          provider="google"
          size="large"
          onClick={handleGoogleLogin}
          className="w-full!"
        />

        {/* Signup link */}
        <div className="flex items-center justify-center gap-1 w-full">
          <span className="text-caption-m text-neutral-400">
            서비스가 처음이신가요?
          </span>
          <Link
            href="/signup"
            className="text-[14px] font-semibold leading-none tracking-[0.028em] text-pink-400"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
