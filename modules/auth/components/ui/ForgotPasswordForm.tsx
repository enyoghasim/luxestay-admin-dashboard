"use client";
import { Field, Form, Formik } from "formik";
import { ForgotPasswordFormInitialValues } from "../../types/auth.types";
import { ForgotPasswordValidationSchema } from "../../schema/validations";
import ErrorAlert from "@/modules/common/components/error-alert";
import { Input } from "@/modules/common/components/ui/input";
import { LuMail } from "react-icons/lu";
import { Button } from "@/modules/common/components/ui/button";
import Link from "next/link";
import Logo from "@/modules/common/icons/logo";
import useAuth from "../../services/auth.mutation";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuth();
  return (
    <Formik
      initialValues={ForgotPasswordFormInitialValues}
      validationSchema={ForgotPasswordValidationSchema}
      onSubmit={forgotPassword}
    >
      {({ handleSubmit, errors, touched, status, isSubmitting }) => (
        <>
          <Form
            className="space-y-4  md:max-w-lg w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <ErrorAlert message={status?.error} />
            <div className="flex flex-row items-center justify-center gap-2 mb-8">
              <Logo className="w-8 h-8" />
              <h3 className="font-medium text-lg md:text-xl">
                Trouble logging in?
              </h3>
            </div>

            <Field
              as={Input}
              name="email"
              type="email"
              required
              placeholder="Email"
              label="Email Address"
              icon={<LuMail size={18} />}
              autoComplete="email"
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <Button className="w-full" loading={isSubmitting} type="submit">
              Send reset link
            </Button>
            <div className="flex items-center justify-end">
              <Link
                href="/auth/signin"
                className="underline text-neutral-500 font-inter font-medium text-sm"
              >
                Back to Signin
              </Link>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
