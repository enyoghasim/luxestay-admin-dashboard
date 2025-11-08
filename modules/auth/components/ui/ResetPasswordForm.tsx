"use client";
import { Field, Form, Formik } from "formik";
import { resetPasswordFormInitialValues } from "../../types/auth.types";
import { ResetPasswordValidationSchema } from "../../schema/validations";
import ErrorAlert from "@/modules/common/components/error-alert";
import { Input } from "@/modules/common/components/ui/input";
import { LuLock } from "react-icons/lu";
import { Button } from "@/modules/common/components/ui/button";
import Link from "next/link";
import Logo from "@/modules/common/icons/logo";
import { useParams } from "next/navigation";

const ResetPasswordForm = () => {
  const params = useParams<{ selector: string; token: string }>();

  return (
    <Formik
      initialValues={{
        ...resetPasswordFormInitialValues,
        selector: params.selector,
        token: params.token,
      }}
      validationSchema={ResetPasswordValidationSchema}
      onSubmit={() => {}}
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
              <h3 className="font-medium text-lg md:text-xl">Reset Password</h3>
            </div>
            <Field
              as={Input}
              name="selector"
              type="text"
              placeholder="Selector"
              value={params.selector}
              readOnly
              hidden
            />
            <Field
              as={Input}
              name="token"
              type="text"
              value={params.token}
              readOnly
              hidden
            />

            <Field
              as={Input}
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              required
              icon={<LuLock size={18} />}
              passwordToggle
              autoComplete="current-password"
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />

            <Field
              as={Input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              required
              icon={<LuLock size={18} />}
              passwordToggle
              autoComplete="current-password"
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
            />

            <Button className="w-full" loading={isSubmitting} type="submit">
              Reset Password
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

export default ResetPasswordForm;
