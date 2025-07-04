'use client'
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';


export default function QRComponent() {
  return (
    <div className={`flex gap-1`}>
      <div className="flex flex-col justify-between gap-1">
        <Link
          href="https://play.google.com/store/apps/details?id=lms360.edu.vn" target='_blank'>
          {/* <div className="bg-white border border-gray-300 rounded-xl flex items-center justify-center px-4 py-1">
            <img src="/icons/Google Play.svg" alt="logo" className="size-8" />
            <div className="flex flex-col">
              <p className="text-brandBlue text-[10px]">Tải ứng dụng trên</p>
              <p className="text-brandBlue text-[10px] font-bold">Google Play</p>
            </div>
          </div> */}
          <img src="/images/google-play-download.png" alt="logo" className="h-10 w-auto" />
        </Link>
        <Link href="https://apps.apple.com/vn/app/lms360/id6475024661?l=vi" className="bg-white shadow" target='_blank'>
          {/* <div className="bg-white shadow-2xl border border-gray-300 rounded-xl flex items-center justify-center px-4 py-1">
            <img src="/icons/App Store.svg" alt="logo" className="size-8" />
            <div className="flex flex-col">
              <p className="text-brandBlue text-[10px]">Tải ứng dụng trên</p>
              <p className="text-brandBlue text-[10px] font-bold">App Store</p>
            </div>
          </div> */}
          <img src="/images/app-store-download.png" alt="logo" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="">
        <QRCodeSVG

          size={85}
          className="border rounded-md"
          style={{ padding: 2 }}
        />
      </div>
    </div>
  );
}