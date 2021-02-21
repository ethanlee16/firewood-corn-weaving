import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import SimpleRevealByTyping from "../../components/SimpleRevealByTyping";
import "./SectionTwo.css";

const MetricsSectionTwo: React.FC = () => {
  const [state] = useContext(AppContext);
  const { weatherInfo } = state;

  return (
    <div className="metrics-section-two">
      <SimpleRevealByTyping
        options={{
          strings: [
            `Perhaps you checked the weather this morning. ${weatherInfo?.temperature} degrees and ${weatherInfo?.description}. There’s a ${weatherInfo?.chanceOfRain}% chance of rain tomorrow. It normally rains ${weatherInfo?.averageRainfall} inches in ${weatherInfo?.regionName} during ${weatherInfo?.currentMonth}. That’s less than before. Or is it more than before? But it is warmer than you remember other ${weatherInfo?.currentMonth}s, you are fairly certain of that. It is, after all, warmer everywhere. But is it rainier or drier?^1000

Today the humidity is ${weatherInfo?.humidity}%, the dew point at ${weatherInfo?.dewPoint} degrees Fahrenheit, the pressure index at ${weatherInfo?.pressureIndex} in Hg, the UV index low, the visibility at ${weatherInfo?.visibilityDistance} miles, and a ${weatherInfo?.windSpeed} mile per hour wind from the ${weatherInfo?.windDirection}.^1000

But you don’t regularly check these before heading to work. Really only temperature and precipitation are relevant to you and your one daily weather-conscious decision of choosing what to wear. After all you control the climate. Your thermostat has one metric.^1000

Temperature.^1000

The temperature is not the weather.`,
          ],
          typeSpeed: 10,
          showCursor: false,
        }}
      />
    </div>
  );
};
export default MetricsSectionTwo;
