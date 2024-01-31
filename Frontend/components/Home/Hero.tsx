import Image from 'next/image';
import { Josefin_Sans } from "next/font/google";
import Link from 'next/link';

const josefin_sans = Josefin_Sans({ subsets: ["latin"] });

const Hero = () => {
  return (
    <section className="flex items-center w-full h-[80%] px-14 sm:h-auto sm:flex-wrap-reverse sm:justify-center sm:px-7 bgtab:px-5">
      <div>
          <div className={josefin_sans.className}>
            <p className="text-3xl font-body tracking-[0.1rem] text-slate-700 sm:text-2xl sm:pt-5">
              Let's
            </p>
            <p className="text-[#713ABE] font-body text-6xl font-semibold tracking-[0.2rem] pt-3 sm:text-5xl">
              E-learning
            </p>
            <p className="font-body text-5xl text-slate-700 sm:text-4xl">
              at your home
            </p>
          </div>
          <p className="w-[60%] pt-3 text-gray-500 text-base sm:w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            ratione velit voluptas id facilis doloremque provident eius corporis
            nemo rem, amet adipisci exercitationem ipsam unde natus harum
            repellat ut soluta.
          </p>
          <div className="pt-6 sm:flex sm:justify-center">
            <button className="text-sm px-8 py-[0.500rem] bg-[#1f3432] border text-white rounded-lg font-semibold transition-all hover:bg-blue-500 shadow-md">
              <Link href="/courses">Explore Courses</Link>
            </button>
          </div>
        </div>

        <div>
          <Image
            src="undraw_learning_sketching_nd4f.svg"
            alt="image"
            width={600}
            height={350}
          />
        </div>
      </section>
  )
}

export default Hero