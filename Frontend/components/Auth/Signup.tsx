import Image from "next/image";
import Link from "next/link";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center px-14 sm:px-0 bgtab:px-5">
      <div className="w-1/2 flex justify-center sm:w-full">
        <div className="w-[25rem] px-8 sm:w-full sm:px-5">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <p className="text-[#bababc]">
            Already have an account{" "}
            <Link className="link-style ml-[0.15rem]" href="/login">
              Login
            </Link>{" "}
          </p>

          <SignupForm />
        </div>
      </div>
      <div className="w-1/2 flex justify-end sm:hidden mr-4">
        <Image
          src="signupVector.svg"
          alt="signup-vector"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Signup;
