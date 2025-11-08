import ResetPasswordForm from "@/modules/auth/components/ui/ResetPasswordForm";

export const metadata = {
  title: "Luxestay - Admin Reset Password",
};

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-5">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
