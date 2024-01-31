import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-[10%] w-full flex items-center px-14 overflow-y-hidden sm:px-7 sm:h-20">
      <ul className="flex gap-5">
        <li>
          <Link href="https://www.facebook.com">
            <svg
              className="cursor-pointer text-slate-800 transition-all hover:text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <g clipPath="url(#akarIconsFacebookFill0)">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M0 12.067C0 18.033 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666c.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067Z"
                    clipRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="akarIconsFacebookFill0">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </g>
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/in/guptasomnath">
            <svg
              className="cursor-pointer text-slate-800 transition-all hover:text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm1.102 4.297a1.195 1.195 0 1 0 0-2.39a1.195 1.195 0 0 0 0 2.39Zm1 7.516V6.234h-2v6.579h2ZM6.43 6.234h2v.881c.295-.462.943-1.084 2.148-1.084c1.438 0 2.219.953 2.219 2.766c0 .087.008.484.008.484v3.531h-2v-3.53c0-.485-.102-1.438-1.18-1.438c-1.079 0-1.17 1.198-1.195 1.982v2.986h-2V6.234Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com">
            <svg
              className="cursor-pointer text-slate-800 transition-all hover:text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M7.5 5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 0A4.5 4.5 0 0 0 0 4.5v6A4.5 4.5 0 0 0 4.5 15h6a4.5 4.5 0 0 0 4.5-4.5v-6A4.5 4.5 0 0 0 10.5 0h-6ZM4 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0ZM11 4h1V3h-1v1Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/somnath_gupta_g">
            <svg
              className="cursor-pointer text-slate-800 transition-all hover:text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 14 14"
            >
              <path
                fill="currentColor"
                d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7s-7-3.13-7-7s3.13-7 7-7ZM5.72 10.69c3.1 0 4.8-2.57 4.8-4.8v-.22c.33-.24.62-.54.84-.88c-.3.13-.63.22-.97.27c.35-.21.62-.54.74-.93c-.33.19-.69.33-1.07.41c-.31-.33-.75-.53-1.23-.53c-.93 0-1.69.76-1.69 1.69c0 .13.01.26.05.38c-1.4-.07-2.65-.74-3.48-1.76c-.14.25-.23.54-.23.85c0 .58.3 1.1.75 1.4c-.28 0-.54-.08-.76-.21v.02c0 .82.58 1.5 1.35 1.66c-.14.04-.29.06-.44.06c-.11 0-.21-.01-.32-.03c.21.67.84 1.16 1.57 1.17c-.58.45-1.31.72-2.1.72c-.14 0-.27 0-.4-.02c.74.48 1.63.76 2.58.76"
                className="cls-1"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/@apphelper9794">
            <svg
              className="cursor-pointer text-slate-800 transition-all hover:text-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10 2.3C.172 2.3 0 3.174 0 10s.172 7.7 10 7.7s10-.874 10-7.7s-.172-7.7-10-7.7zm3.205 8.034l-4.49 2.096c-.393.182-.715-.022-.715-.456V8.026c0-.433.322-.638.715-.456l4.49 2.096c.393.184.393.484 0 .668z"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
