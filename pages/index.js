import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Men'sCloset.com - Wear the Pride!</title>
        <meta name="description" content="CodesWear.com - Wear the code!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
      <Image
        src={'/home.jpg'}
        alt="Picture of the author"
        width="1730"
        height="567.5">
    </Image>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Wear the Richness with menscloset.com
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            "Clothes and manners do not make the man; but when he is made, they greatly improve his appearance."
            </p>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            "Style is the perfection of a point of view."
            </p>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            "Being perfectly well-dressed gives one a tranquility that no religion can bestow."
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
