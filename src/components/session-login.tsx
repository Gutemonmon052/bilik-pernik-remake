import Link from 'next/link';
import * as React from 'react';


export function SessionLogin() {
  return (
    <div className='session-active'>
      <div className='session-active-title'>
        <h1>Anda Belum Masuk!</h1>
      </div>
      <div className='session-active-text'>
        <p>Sepertinya Anda belum memasukkan akun. Untuk melanjutkan, silakan kembali ke halaman masuk. Klik tombol di bawah ini untuk kembali ke awal perjalanan Anda!</p>
      </div>
      <div className='w-full h-fit flex items-center justify-center'>
        <Link href='/login'>
          <div className='btn btn-primary'>Masuk</div>
        </Link>
      </div>
    </div>
  );
}
