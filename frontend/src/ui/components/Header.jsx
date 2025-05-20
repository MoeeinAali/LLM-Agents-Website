'use client';

import Navbar, { NavbarPlaceholder } from './Navbar';
import Rectangle from '../../../public/source/Rectangle.png';
import useTimer from '../hooks/timer';

export default function Header({ isAuthenticated = false }) {
  const timer = useTimer();

  return (
    <header>
      <div
        className="items-center bg-cover bg-center bg-no-repeat pb-56"
        style={{ backgroundImage: `url(${Rectangle.src})` }}
      >
        <Navbar isAuthenticated={isAuthenticated} />
        <NavbarPlaceholder />
        <div className="h-8 lg:h-16" />
        <div className="mx-auto flex px-6 max-lg:flex-col lg:max-w-[1200px] lg:flex-row">
          <div>
            <p className="max-lg:leading-15 font-bold not-italic text-white max-lg:pb-6 max-lg:text-6xl max-lg:tracking-[-1.2px] lg:pb-10 lg:text-[108px] lg:leading-[106px] lg:tracking-[-2.16px]">
              LLM Agents Hackathon
            </p>
            <div className="font-semibold not-italic leading-[normal] text-white max-lg:text-[21px] max-lg:leading-[30px] max-lg:tracking-[-0.12px] lg:text-2xl lg:tracking-[-0.18px]">
              <p className="">UNCOVERING THE FUTURE</p>
              <div className="flex max-lg:mt-5 max-lg:flex-row max-lg:items-start max-lg:gap-4 max-lg:self-stretch lg:flex-col">
                <div className="flex max-lg:flex-[1_0_0] max-lg:flex-col max-lg:gap-1.5 lg:mt-2 lg:flex-row">
                  <img
                    className="inline-block h-6 w-6 lg:mr-2"
                    src="/source/location.svg"
                  />
                  <p className="max-lg:w-37 text-left font-normal not-italic text-[rgba(255,255,255,0.80)] max-lg:h-16 max-lg:self-stretch max-lg:text-sm max-lg:leading-[21px] lg:text-xl lg:leading-[normal]">
                    Sharif University of Technology - Tehran, Iran
                  </p>
                </div>
                <div className="flex max-lg:flex-[1_0_0] max-lg:flex-col max-lg:gap-1.5 lg:mt-2 lg:flex-row">
                  <img
                    className="inline-block h-6 w-6 lg:mr-2"
                    src="/source/Calendar.svg"
                  />
                  <p className="max-lg:w-37 max-lg:h-10.5 font-normal not-italic text-[rgba(255,255,255,0.80)] max-lg:self-stretch max-lg:text-sm max-lg:leading-[21px] lg:text-xl lg:leading-[normal]">
                    May 28th, 2025 - May 30th, 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start font-bold not-italic leading-[normal] text-white max-lg:mb-9 max-lg:items-start max-lg:justify-between max-lg:pt-7 lg:gap-[52px] lg:pt-[52px] lg:text-5xl lg:tracking-[-0.96px]">
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 tabular-nums max-lg:text-xl">
                  {timer.days.toString().padStart(2, '0')}
                </div>
                <p className="text-base font-normal uppercase not-italic text-white lg:leading-[normal] lg:tracking-[0.32px]">
                  DAYS
                </p>
              </div>
              <div className="font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:text-5xl lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 tabular-nums max-lg:text-xl">
                  {timer.hours.toString().padStart(2, '0')}
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  HOURS
                </p>
              </div>
              <div className="font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:text-5xl lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 tabular-nums max-lg:text-xl">
                  {timer.minutes.toString().padStart(2, '0')}
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  MINUTES
                </p>
              </div>
              <div className="font-bold not-italic leading-[normal] text-white max-lg:text-[32px] max-lg:leading-[normal] max-lg:tracking-[-0.64px] lg:text-5xl lg:tracking-[-0.96px]">
                :
              </div>
              <div className="flex flex-col items-center justify-center text-white max-lg:gap-1 lg:gap-3">
                <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-[rgba(255,255,255,0.30)] px-4 pb-3 pt-2 tabular-nums max-lg:text-xl">
                  {timer.seconds.toString().padStart(2, '0')}
                </div>
                <p className="text-base font-normal uppercase not-italic leading-[normal] text-white lg:tracking-[0.32px]">
                  SECONDS
                </p>
              </div>
            </div>
          </div>

          <div className="max-lg:grid-rows-auto grid grid-cols-1 items-start gap-x-16 gap-y-6 text-end max-lg:grid-cols-2 max-lg:text-start">
            <div className="pr shrink-0 max-lg:w-1/2">
              <p className="text-6xl font-bold leading-snug tracking-tight text-white max-lg:text-[40px]">
                300+
              </p>
              <p className="text-white text-opacity-80 max-lg:text-sm">
                Participants
              </p>
            </div>
            <div className="shrink-0 max-lg:w-1/2">
              <p className="text-6xl font-bold leading-snug tracking-tight text-white max-lg:text-[40px]">
                5+
              </p>
              <p className="text-white text-opacity-80 max-lg:text-sm">
                Presentations
              </p>
            </div>
            <div className="shrink-0 max-lg:w-1/2">
              <p className="text-6xl font-bold leading-snug tracking-tight text-white max-lg:text-[40px]">
                2+
              </p>
              <p className="text-white text-opacity-80 max-lg:text-sm">
                Days Hackathon
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto -mt-36 mb-24 flex w-4/5 flex-col items-center justify-center gap-4 rounded-2xl bg-white px-[52px] py-10 text-center shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)] md:gap-8">
        <div className="text-xl font-medium uppercase not-italic leading-normal tracking-[0.8px] text-[#1F2B3D]">
          Presentations from 15+ top level companies and masters
        </div>
        <div className="grid grid-cols-4 items-center justify-center gap-8 self-stretch md:grid-cols-8 md:gap-x-16 md:gap-y-4">
          <a href="https://www.sharif.ir/">
            <img
              src="/source/logos/sharif.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.mit.edu/">
            <img
              src="/source/logos/mit.svg"
              className="m-auto m-auto w-full w-full max-w-[75px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.sharif.ir/">
            <img
              src="/source/logos/riml.svg"
              className="m-auto m-auto w-full w-full max-w-[70px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.sharif.ir/">
            <img
              src="/source/logos/saic.svg"
              className="m-auto m-auto w-full w-full max-w-[70px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.sharif.ir/">
            <img
              src="/source/logos/ieee.svg"
              className="m-auto m-auto w-full w-full max-w-[50px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://divar.ir/">
            <img
              src="/source/logos/divaar.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.jaryan.net/">
            <img
              src="/source/logos/jaryan.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.yektanet.com/">
            <img
              src="/source/logos/yektanet.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://torob.com/">
            <img
              src="/source/logos/torob.svg"
              className="m-auto m-auto w-full w-full max-w-[55px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://metisai.ir/">
            <img
              src="/source/logos/metis.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://sotoon.ir/">
            <img
              src="/source/logos/sotoon.svg"
              className="m-auto m-auto w-full w-full max-w-[45px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://zharfa.tech/">
            <img
              src="/source/logos/zarfatech.svg"
              className="m-auto m-auto w-full w-full max-w-[61px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://khodro45.com/">
            <img
              src="/source/logos/khodro45.svg"
              className="m-auto m-auto w-full w-full max-w-[75px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://www.jabama.com/">
            <img
              src="/source/logos/jabama.svg"
              className="m-auto m-auto w-full w-full max-w-[85px] opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
