import Link from "next/link";
import Head from "next/head";
import NavBar from "../components/NavBar";

const Index = ( {data} ) => {
  return (<div className="flex flex-col h-full w-full">
        <Head>
          <title>Flight Tracker</title>
        </Head>
        <NavBar />
        <div className="flex flex-col justify-center items-center h-full">
          <div className="mx-auto">
            <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl tracking-widest text-center antialiased text-highlighted">FLIGHT</h1>
            <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl tracking-widest text-center antialiased text-highlighted">TRACKER</h1>
            <div className="border-white border-b-2 pb-4 w-1/2 sm:w-1/2 md:w-2/3 mx-auto opacity-80" />
            <p className="mt-6 text-xl md:mt-12 md:text-2xl text-center text-slate-300 tracking-wide">Currently
                                                                                                      tracking <span className="text-sky-600 tracking-normal">{data.totalPlanes}</span> aircrafts
                                                                                                      with <span className="text-sky-600">{data.totalFlights}</span> flights
                                                                                                      and <span className="text-sky-600">{data.totalCheckpoints}</span> checkpoints
            </p>
            <div className="flex flex-col justify-center items-center min-w-full gap-2 sm:flex-row my-2">
              <Link href="/map">
                <button className="inline-block w-32 md:w-44 px-5 py-2 my-4 font-semibold rounded-3xl
                    focus:outline-none border-2  border-white
                    hover:bg-gradient-to-l hover:from-indigo-400 hover:to-indigo-900 hover:rounded-none hover:text-white hover:border-1 hover:border-indigo-900
                    transition-all duration-300 "
                >
                  MAP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>);
};

export async function getStaticProps() {
  const data = await fetch('https://fantasea.pl/api/v1/planes/stats/mainpage').then(res => res.json());
  return {
    props: {
      data
    }, revalidate: 3600, // 1hr in seconds
  }
}

export default Index;
