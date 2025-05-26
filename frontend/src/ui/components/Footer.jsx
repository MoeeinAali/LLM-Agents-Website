import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white pb-7 pt-14 text-gray-700">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-start gap-x-10 gap-y-4 max-md:flex-col">
          {/*<Link href="/">*/}
          {/*  <Image*/}
          {/*    src="/source/wss_footer.svg"*/}
          {/*    alt="Winter Seminar Series"*/}
          {/*    width="71"*/}
          {/*    height="47"*/}
          {/*    className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"*/}
          {/*  />*/}
          {/*</Link>*/}
          <a href="https://www.sharif.edu/" target="_blank">
            <Image
              src="/source/sut_footer.svg"
              alt="Sharif University of Technology"
              width="60"
              height="60"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://t.me/RIMLLab/" target="_blank">
            <Image
              src="/source/logos/riml.svg"
              alt="RIML Lab."
              width="65"
              height="65"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://t.me/IEEE_SharifUT" target="_blank">
            <Image
              src="/source/logos/ieee.svg"
              alt="RIML Lab."
              width="45"
              height="45"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
          <a href="https://t.me/ai_sharif" target="_blank">
            <Image
              src="/source/logos/saic.svg"
              alt="Sharif Artificial Intelligence Chapter"
              width="180"
              height="180"
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
            />
          </a>
        </div>
        <div className="my-8 flex items-center justify-between gap-y-4 max-md:flex-col">
          <div className="max-md:text-center">
            <p className="max-w-prose text-sm">
              The event is held by the Sharif Artificial Intelligence Chapter
              (SAIC) of Sharif University of Technology
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/AI_Sharif"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/telegram.svg"
                alt="Telegram"
                width="56"
                height="56"
              />
            </a>
            {/*<a*/}
            {/*  href="https://www.instagram.com/wss_sut"*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/source/socials/instagram.svg"*/}
            {/*    alt="Instagram"*/}
            {/*    width="56"*/}
            {/*    height="56"*/}
            {/*  />*/}
            {/*</a>*/}
            <a
              href="https://www.linkedin.com/company/ai-sharif/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/linkedin.svg"
                alt="LinkedIn"
                width="56"
                height="56"
              />
            </a>
            <a
              href="https://www.youtube.com/@RIMLLAB/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/socials/youtube.svg"
                alt="Youtube"
                width="56"
                height="56"
              />
            </a>
            {/*<a*/}
            {/*  href="https://twitter.com/wss_sut"*/}
            {/*  target="_blank"*/}
            {/*  rel="noopener noreferrer"*/}
            {/*>*/}
            {/*  <Image*/}
            {/*    src="/source/socials/twitter.svg"*/}
            {/*    alt="Twitter"*/}
            {/*    width="56"*/}
            {/*    height="56"*/}
            {/*  />*/}
            {/*</a>*/}
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 items-start gap-7 sm:grid-cols-2 md:grid-cols-4">
          <a
            href="https://maps.app.goo.gl/oGLAVseFLrysarjG6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start gap-2"
          >
            <img
              src="/source/footer-location.svg"
              alt="Location"
              width="48"
              height="48"
            />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Location
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                Sharif University of Technology
              </p>
            </div>
          </a>
          <a
            href="https://maps.app.goo.gl/oGLAVseFLrysarjG6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/more.svg" alt="Location" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Address
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                Azadi Street, Tehran, Iran
              </p>
            </div>
          </a>
          <a
            href="mailto:riml.lab2018@gmail.com"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/email.svg" alt="Email" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Mail
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                riml.lab2018@gmail.com
              </p>
            </div>
          </a>
          <a
            href="tel:+982166165786"
            className="flex items-center justify-start gap-2"
          >
            <img src="/source/call.svg" alt="Phone" width="48" height="48" />
            <div className="space-y-1">
              <p className="flex items-center justify-start text-sm text-lightslategray">
                Tel
              </p>
              <p className="flex items-center justify-start text-sm font-semibold">
                +98 (21) 66 16 57 86
              </p>
            </div>
          </a>
        </div>
        <div className="flex-row-reverse items-center justify-between">
          <p className="text-center text-sm">
            {`© 2024-${new Date().getFullYear()}, All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}
