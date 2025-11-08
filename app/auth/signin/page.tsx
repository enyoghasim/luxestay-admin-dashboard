import SigninForm from "@/modules/auth/components/ui/SigninForm";

export const metadata = {
  title: "Luxestay - Admin Sign-In",
};

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-5">
      <SigninForm />
    </div>
  );
};

export default Signin;
