import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import SimpleRevealByTyping from "../../components/SimpleRevealByTyping";
import TextFlicker, { TimeWindow, useTextFlickerSample } from "../../components/TextFlicker";
import "./SectionTwo.css";

const useMutatingElementTextFlicker = (textSamples: string[], sequence: TimeWindow[]): string => {
  const id = useRef(`mutating-element-text-flicker-${Math.floor(Math.random() * 1000)}`);
  const sample = useTextFlickerSample(textSamples, sequence);
  useEffect(() => {
    const mutatingElem = document.querySelector(`#${id.current}`);
    if (mutatingElem) {
      mutatingElem.innerHTML = sample;
    }
  }, [sample]);

  return id.current;
};

const MetricsSectionTwo: React.FC = () => {
  const [state] = useContext(AppContext);
  const [finishedTyping, setFinishedTyping] = useState(false);
  const { weatherInfo } = state;

  const weatherFlicker = useMutatingElementTextFlicker(
    [
      "climate",
      "outdoors",
      "outside",
      "forecast",
      "news",
      "time",
      "field",
      "crops",
      "window",
      "sky",
      "atmosphere",
      "clima",
      "tiempo",
      "atmósfera",
      "medio ambiente",
      "kya’j",
    ],
    [{ duration: 5000, minFlicker: 1000, maxFlicker: 2200 }]
  );
  const statusFlicker = useMutatingElementTextFlicker(
    ["a normal", "an unusual"],
    [{ duration: 5000, minFlicker: 1000, maxFlicker: 2200 }]
  );

  const typedOptions = useMemo(
    () => ({
      strings: [
        `Perhaps you checked the <span id="${weatherFlicker}">weather</span> this morning. ${weatherInfo?.temperature} degrees and ${weatherInfo?.description}. There’s a ${weatherInfo?.chanceOfRain}% chance of rain. Is that <span id="${statusFlicker}">a normal</span> amount of rain for ${weatherInfo?.regionName} in ${weatherInfo?.currentMonth}? Is this ${weatherInfo?.currentMonth} warmer than last? It's supposed to be warmer. But is it supposed to get rainier?^1000

Today the humidity is ${weatherInfo?.humidity}%, the dew point at ${weatherInfo?.dewPoint} degrees Fahrenheit, the pressure index at ${weatherInfo?.pressureIndex} in Hg, the UV index low, the visibility at ${weatherInfo?.visibilityDistance} miles, and a ${weatherInfo?.windSpeed} mile per hour wind from the ${weatherInfo?.windDirection}.^1000

But you don’t regularly check these before heading out. Really only temperature and precipitation are relevant to you and your one daily weather-conscious decision of choosing what to wear. After all, you control the climate. Your thermostat has one metric.^1000

Temperature.^1000

The temperature is not the weather.^1000`,
      ],
      typeSpeed: 5,
      showCursor: false,
      onComplete: () => setFinishedTyping(true),
    }),
    [weatherFlicker, statusFlicker, weatherInfo]
  );

  return (
    <div className="metrics-section-two">
      <SimpleRevealByTyping options={typedOptions} />
      {finishedTyping && (
        <p>
          <TextFlicker
            textSamples={[
              "Cold",
              "hot",
              "chilly",
              "scorching",
              "drizzle",
              "drizzling",
              "sleeting",
              "sleet",
              "slushy",
              "smog",
              "smoggy",
              "tornado",
              "raining",
              "rainy",
              "snow",
              "hail",
              "flurries",
              "fog",
              "foggy",
              "frost",
              "hurricane",
              "overcast",
              "thunder",
              "lightning",
              "rainbow",
              "sunny",
              "windy",
              "dark",
              "foggy",
              "dawn",
              "dusk",
              "stormy",
              "storm",
              "gale",
              "squall",
              "blizzard",
              "dry",
              "arid",
              "temperate",
              "humid",
              "clouds",
              "cloudy",
              "gust",
              "gusty",
              "tempest",
              "hurricane",
              "typhoon",
              "El Niño",
              "Santa Ana",
              "Nor’easter",
              "Calor",
              "frio",
              "sequia",
              "lluvia",
              "lluvioso",
              "soleada",
              "viento",
              "nublado",
              "nubes",
              "nieve",
              "neblina",
              "niebla",
              "tormenta",
              "huracán",
              "fresco",
              "canícula",
              "llovizna",
              "aguanieve",
              "granizo",
              "helada",
              "trueno",
              "relámpago",
              "arco iris",
              "ventoso",
              "amanecer",
              "anochecer",
              "tormentoso",
              "húmedo",
              "árido",
              "templado",

              "Kya’j",
              "jb’al",
              "muj",
              "q’ankyoq",
              "kyq’i’",
              "a’",
              "saqb’aqin",
              "chow’",
              "kyaq",
              "kresm",
              "ky’ajb’alan",
              "q’ij",
              "qlol",
              "maj qwel spiky’e",
              "maj qwoky yupj",
              "qasan ta’ chow’",
              "qasan ta’ kyaq",
              "ma tzul q’ij",
              "noqsan qlol",
            ].map((phrase) => `${phrase[0].toUpperCase()}${phrase.slice(1)}`)}
            sequence={[
              { duration: 4000, minFlicker: 40, maxFlicker: 100 },
              { duration: 8000, minFlicker: 1000, maxFlicker: 2200 },
              { duration: 9000, minFlicker: 40, maxFlicker: 100 },
              { duration: 16000, minFlicker: 1000, maxFlicker: 2200 },
              { duration: 11000, minFlicker: 350, maxFlicker: 350 },
              { duration: 7000, minFlicker: 1000, maxFlicker: 2200 },
            ]}
          />
          <br />
          is the weather.
        </p>
      )}
    </div>
  );
};
export default MetricsSectionTwo;
