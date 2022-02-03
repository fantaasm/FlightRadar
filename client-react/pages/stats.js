import { Line } from '@nivo/line'
import { ChoroplethCanvas } from '@nivo/geo'
import countries from "../public/world_countries.json"
import { convertCountryToAlpha3Code } from "../utils/countryUtils";
import NavBar from "../components/NavBar";
import * as React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";

const Stats = ( {hourlyStats, regionStats} ) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(screen.width > 900 ? 900 : screen.width)
  }, []);


  const crossRegionPlanes = [
    {
      id: "EU",
      data: [
        {x: 0, y: 7},
        {x: 1, y: 5},
        {x: 2, y: 11},
        {x: 3, y: 9},
        {x: 4, y: 13},
        {x: 7, y: 16},
        {x: 9, y: 12},
      ]
    },
    {
      id: "NA",
      data: [
        {x: 0, y: 2},
        {x: 1, y: 4},
        {x: 2, y: 5},
        {x: 3, y: 6},
        {x: 4, y: 7},
        {x: 7, y: 8},
        {x: 9, y: 9},
      ],
    },
    {
      id: "Other",
      data: [
        {x: 0, y: 24},
        {x: 1, y: 18},
        {x: 2, y: 15},
        {x: 3, y: 12},
        {x: 4, y: 11},
        {x: 7, y: 7},
        {x: 9, y: 2},
      ],
    },
  ]

  const LineGraph = ( {data} ) => {
    return (
        <Line
            width={screenWidth}
            height={450}
            data={data}
            margin={{top: 50, right: 80, bottom: 80, left: 50}}
            xScale={{type: 'point'}}
            // colors={{ scheme: 'purpleRed_green' }}
            colors={{scheme: 'nivo'}}
            curve={"monotoneX"}
            enableSlices={"x"}
            lineWidth={4}
            xFormat=" >-"
            theme={{
              tooltip: {
                container: {
                  background: "#243c5a",
                  opacity: "85%",
                  borderRadius: "5%"
                }
              },
              axis: {
                ticks: {
                  text: {
                    fill: "#FFFFFF",
                    opacity: "85%"
                  }
                },
                legend: {
                  text: {
                    fill: "#FFFFFF",
                    opacity: "85%"
                  }
                }
              },
              legends: {
                title: {
                  text: {
                    fill: "#FFFFFF",
                    opacity: "85%"
                  }
                },
                text: {
                  fill: "#FFFFFF",
                  opacity: "85%"
                }

              },
              grid: {
                line: {
                  stroke: "gray",
                  strokeWidth: 0.2,
                  // strokeDasharray: "4 4"
                  // strokeDasharray: "2 2"
                }
              }
            }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'time of the day(UTC)',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'amount',
              legendOffset: -40,
              legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor="#7f0099"
            pointBorderWidth={3}
            pointBorderColor={{from: 'serieColor', modifiers: []}}
            pointLabelYOffset={-14}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}

        />
    )
  }

  const GeoMap = ( {data} ) => {
    return (<ChoroplethCanvas
            height={450}
            width={screenWidth}
            data={data}
            features={countries.features}
            margin={{top: 0, right: 0, bottom: 0, left: 0}}
            // colors="RdBu"
            colors="purples"
            domain={[0, 1000]}
            unknownColor="#000000"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.5, 0.7]}
            pixelRatio={2}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="rgba(0, 0, 0, .2)"
            borderWidth={0.5}
            borderColor="#000000"
            projectionScale={148}
            theme={{
              tooltip: {
                container: {
                  background: "#243c5a",
                  opacity: "85%",
                  borderRadius: "5%"
                }
              }
            }}
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -60,
                itemsSpacing: 0,
                itemWidth: 92,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 18
              }
            ]}
        />
    )
  }

  return (
      <div>
        <Head>
          <title>Stats - Flight Tracker</title>
        </Head>
        <NavBar />
        <div className={"w-full flex flex-col gap-12 mt-12 content-center justify-center"}>
          <div className={"mx-auto"}>
            <h1 className={"text-xl"}>Total unique aircraft recorded today</h1>
            <div className={"mt-4 bg-black shadow-xl dark-surface rounded-md"}>
              <LineGraph data={hourlyStats} />
            </div>
          </div>
          <div className={"mx-auto"}>
            <h1 className={"text-xl"}>Total unique aircraft across the regions recorded today</h1>
            <div className={"mt-4 bg-black shadow-xl dark-surface rounded-md"}>
              <LineGraph data={crossRegionPlanes} />
            </div>
          </div>
          <div className={"mx-auto mb-8"}>
            <h1 className={"text-xl"}>Total aircraft registered per country</h1>
            <div className={"mt-4 bg-black shadow-xl dark-surface rounded-md"}>
              <GeoMap data={regionStats} />
            </div>
          </div>
        </div>
      </div>
  )


}


export async function getStaticProps() {
  // const hourlyStatsJson = await fetch('https://fantasea.pl/api/v1/planes/stats/hourly').then(res => res.json());

  // [{"month":"February","day":2,"hour":0,"count":28600},{"month":"February","day":2,"hour":1,"count":25422}}
  // const hourlyStatsJson = await fetch('http://localhost:5000/api/v1/planes/stats/hourly?pastDays=1').then(res => res.json());
  const hourlyStatsJson = await fetch('https://fantasea.pl/api/v1/planes/stats/hourly?pastDays=1').then(res => res.json());
  // const regionStatsJson = await fetch('http://localhost:5000/api/v1/planes/stats/planesregistered').then(res => res.json());
  const regionStatsJson = await fetch('https://fantasea.pl/api/v1/planes/stats/planesregistered').then(res => res.json());


  const newArr    = groupBy(hourlyStatsJson, "day");
  let hourlyStats = [];
  for (let newArrKey in newArr) {
    hourlyStats.push(
        {
          id: newArr[newArrKey][0].month + " " + newArrKey,
          data: newArr[newArrKey].map(( arrObj ) => {
            return {
              x: arrObj.hour,
              y: arrObj.count
            }
          })
        }
    )

  }

  const regionStats = regionStatsJson.map(obj => {
    return {id: convertCountryToAlpha3Code(obj.country), value: obj.count}
  })

  return {
    props: {
      hourlyStats,
      regionStats
    },
    revalidate: 3600, // 1hr in seconds
  }
}


function groupBy( arr, property ) {
  return arr.reduce(function ( memo, x ) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

export default Stats;