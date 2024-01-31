"use client"

import Image from "next/image";

const AboutDialog = () => {
  return (
        <div className="w-full h-full flex flex-col items-center">
          <div className="h-32 w-32 bg-white rounded-full overflow-hidden flex items-center justify-center">
            <Image src="/moymathLogo.jpeg" alt="" height={250} width={250} />
          </div>
          <h3 className="font-semibold text-lg pt-3">Moymath Online Academy</h3>
          <p className="px-8 pt-1 text-center text-sm">
            Mission Statement: Creating new ideas and implementing them is our
            major concern. Upgrading us, to support our next generation by
            training them to earn values, ethics, and power of enthusiasm is our
            key motto.
          </p>

          <ul className="w-full px-8 py-8">
            <li className="flex items-center">
              <div className="h-[50px] w-[50px] bg-slate-300 rounded-full overflow-hidden">
                <Image src="/moy.jpg" alt="" height={50} width={50} />
              </div>
              <div className="pl-4">
                <h4 className="font-semibold">Hiranmoy gupta</h4>
                <p className="text-sm text-gray-600">Founder of Moymath</p>
              </div>
            </li>
          </ul>
        </div>
  );
};

export default AboutDialog;
