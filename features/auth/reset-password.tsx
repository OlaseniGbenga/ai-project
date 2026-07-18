"use client";

import ResetPasswordForm from "@/components/form/reset-password";
import Image from "next/image";
import BackStep from "@/components/ui/btn/back-step";
import OTForm from "@/components/form/otp-form";
import ConfirmPasswordForm from "@/components/form/confirm-password";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

function ResetPassword() {
  const [step, setStep] = useState(2);

  return (
    <div className="flex   justify-center items-start  h-screen pt-20">
      <div className="absolute left-4">
        <BackStep onPrevStep={() => step > 1 && setStep(step - 1)} />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 ">
        <Image
          loading="eager"
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="self-center mb-8"
        />

        {step === 1 && (
          <Fade direction="left">
            <ResetPasswordForm />
          </Fade>
        )}
        {step === 2 && (
          <Fade direction="left">
            <OTForm />
          </Fade>
        )}
        {step === 3 && (
          <Fade direction="left">
            <ConfirmPasswordForm />
          </Fade>
        )}
      </div>

      {/* <p
        onClick={() => {
          setStep(step + 1);
        }}
      >
        jj
      </p> */}
    </div>
  );
}

export default ResetPassword;
