"use client";
import { Field, Form, Formik } from "formik";
import { signinFormInitialValues } from "../../types/auth.types";
import { SigninValidationSchema } from "../../schema/validations";
import ErrorAlert from "@/modules/common/components/error-alert";
import { Input } from "@/modules/common/components/ui/input";
import { LuLock, LuMail } from "react-icons/lu";
import { Button } from "@/modules/common/components/ui/button";
import Link from "next/link";
import Logo from "@/modules/common/icons/logo";

const SigninForm = () => {
  return (
    <Formik
      initialValues={signinFormInitialValues}
      validationSchema={SigninValidationSchema}
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
              <h3 className="font-medium text-lg md:text-xl">Sign In</h3>
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

            <Button className="w-full" loading={isSubmitting} type="submit">
              Sign In
            </Button>
            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="underline text-neutral-500 font-inter font-medium text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SigninForm;
