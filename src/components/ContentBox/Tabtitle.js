import { TrendDirection } from "../../assets/icons";
import NoChangeArrow from "../../assets/icons/components/NochangeArrow";
import { InfoItem, InfoTitle, InfoTitleCon } from "./index.sc";

export const TabTitle = ({ item }) => {
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
