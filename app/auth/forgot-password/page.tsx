import ForgotPasswordForm from "@/modules/auth/components/ui/ForgotPasswordForm";

export const metadata = {
  title: "Luxestay - Admin Forgot Password",
};

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-5">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
