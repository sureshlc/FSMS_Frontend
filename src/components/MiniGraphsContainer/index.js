import { Line } from "react-chartjs-2";
import {
  GraphWraper,
  InfoItem,
  InfoMiniGraphCon,
  InfoTitle,
  InfoTitleCon,
  InfoWrapper,
  TabTitleContainer,
} from "./index.sc";
import { TrendDirection } from "../../assets/icons";
import NoChangeArrow from "../../assets/icons/components/NochangeArrow";

const TabTitle = ({ item }) => {
  return (
    <InfoItem>
      <InfoTitleCon>
        {/* <InfoIcon bgColor={getColorBasedOnSeverity(item?.value)}>          
        </InfoIcon> */}
        {item?.change !== 0 ? (
          <TrendDirection
            value={item?.change}
            color={item.isGreen ? "#48C84E" : "#EE4142"}
          />
        ) : (
          <NoChangeArrow />
        )}
        <InfoTitle className={`tab-title}`}>{item?.iso3_code}</InfoTitle>
      </InfoTitleCon>
      {/* <InfoValue>{item?.value}</InfoValue> */}
    </InfoItem>
  );
};

const MiniGraphContainer = ({ data = [] }) => {
  const optionsChart = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <InfoWrapper>
      {data.map((item, index) => {
        const lineChartData = {
          labels: item?.trendData?.map((trend) => trend.year),
          datasets: [
            {
              label: "labels",
              data: item?.trendData?.map((trend) => trend.value),
              fill: false,
              backgroundColor: "rgb(255, 255, 255)",
              borderColor:
                item.change === 0
                  ? "#999"
                  : item.isGreen
                  ? "#48C84E"
                  : "#EE4242",
              borderWidth: 1.3,
              pointStyle: "circle",
              pointRadius: 0,
              tension: 0.5,
            },
          ],
        };

        return (
          <InfoMiniGraphCon key={index}>
            <TabTitleContainer>
              <TabTitle key={index} item={item} />
            </TabTitleContainer>
            <GraphWraper>
              <Line data={lineChartData} options={optionsChart} />
            </GraphWraper>
          </InfoMiniGraphCon>
        );
      })}
    </InfoWrapper>
  );
};

export default MiniGraphContainer;
