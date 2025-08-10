import { isAuthenticated } from '../../../lib/auth';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import MarkdownRenderer from '../../../ui/components/MarkdownRenderer';
import Timer from '../../../ui/components/Timer';
import Footer from '../../../ui/components/Footer';
import { Position } from '../../../lib/types';
import React from 'react';
import Link from 'next/link';

export default async function CareerDetail({ id }: { id: string }) {
  const authenticated = await isAuthenticated();

  const res = await fetch(
    `${process.env.API_ORIGIN}/api/career/positions/${id}/`,
  );

  const data: Position = await res.json();

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px] shadow-2xl">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="min-h-screen w-full flex-col gap-2">
              {res.ok ? (
                <>
                  <p className="text-[24px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                    {data.brand.name}
                  </p>
                  <p className="text-[64px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                    {data.title}
                  </p>
                  <hr className="my-6 border-black" />
                  <MarkdownRenderer
                    className={''}
                    content={data.markdown}
                  />

                  <Link href={'/dashboard/career'}>
                    <button className="mx-auto flex h-[64px] items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-8 py-0 text-xl font-bold not-italic leading-[normal] tracking-[-0.2px] text-white">
                      Apply this Position
                    </button>
                  </Link>
                </>
              ) : (
                <p>Position not found!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Timer />; ; ;
      <Footer />; ; ;
    </>
  );
}
