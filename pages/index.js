import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CodesWear.com - Wear the code!</title>
        <meta name="description" content="CodesWear.com - Wear the code!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      hey this is codeswear
      <div className="mx-4">This is me</div>
      <div className="mx-4 bg-slate-500 ">This is me 2</div>
      <div className="mx-60 bg-green-500">My bro</div>
    </div>
  )
}
