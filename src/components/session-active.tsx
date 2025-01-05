import Link from 'next/link';
import * as React from 'react';


export function SessionActive() {
  return (
    <div className='session-active'>
      <div className='session-active-title'>
        <h1>Sesi Anda Telah Aktif!</h1>
      </div>
      <div className='session-active-text'>
        <p>Sepertinya Anda sudah memiliki sesi yang aktif. Untuk melanjutkan, silakan kembali ke halaman beranda dan nikmati layanan kami. Klik tombol di bawah ini untuk kembali ke awal perjalanan Anda!</p>
      </div>
      <div className='w-full h-fit flex items-center justify-center'>
        <Link href='/'>
          <div className='btn btn-primary'>Beranda</div>
        </Link>
      </div>
    </div>
  );
}
