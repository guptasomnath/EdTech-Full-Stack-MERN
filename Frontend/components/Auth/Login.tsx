import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="w-full h-full bg-slate-50 flex items-center px-14 sm:px-0 bgtab:px-5">
      <div className="w-1/2 flex justify-center sm:w-full">
        <div className="w-[25rem] px-8 sm:w-full sm:px-5">
          <h1 className="font-bold text-2xl">Login</h1>
          <p className="text-[#8686a7]">
            Dosen't have any account yet?{" "}
            <Link className="link-style ml-[0.15rem]" href="/signup">
              Sign up
            </Link>{" "}
          </p>

          <LoginForm />
        </div>
      </div>
      <div className="w-1/2 flex justify-end sm:hidden">
        <Image
          src="loginVector.svg"
          alt="login-vector"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default Login;
