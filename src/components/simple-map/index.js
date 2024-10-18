import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import geoJSON from "../../constants/topo.json";
import { MapContainer, MapTooltipValueCon, MapTooltipWrp } from "./index.sc";
import * as d3 from "d3";
import PortalTooltip from "../../Graphs/tooltip";
import {
  Disclamercontainer,
  GradientLabel,
  GradientLabelBox,
  LabelContainer,
  LabelItem,
  LabelItemContainer,
  // MapHeaderContainer,
} from "../Layout/index.sc";
import Header from "../Header";
import { useNavigate } from "react-router";

const colorScale = d3
  .scaleOrdinal([
    "#9BD8F4",
    "#A8DDB5",
    "#F1C741",
    "#FB9323",
    "#EC2424",
    "#840000",
  ])
  .domain([1, 2, 3, 4, 5, 6]);

const label = [
  "#840000",
  "#EC2424",
  "#FB9323",
  "#F1C741",
  "#A8DDB5",
  "#9BD8F4",
];

const SimpleMap = ({ data: mapData = [], countryIsoCode, info }) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });

  const navigate = useNavigate();

  return (
    <MapContainer>
      {/* <MapHeaderContainer>
        <Header
          title="Food Security Clusters"
          secondaryTitle=""
          countryIsoCode={countryIsoCode}
          info={info}
          alert={alert}
          iconFill="#fff"
        />
      </MapHeaderContainer> */}
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup zoom="8" center={[35, 30]}>
          <Geographies geography={geoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = mapData.find((s) => s.id === geo?.properties?.iso3cd);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d?.rank) : "#ffffff"}
                    stroke="#4974C2"
                    strokeWidth="0.2"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e) => {
                      setEnableTooltip(true);
                      setToolTipPos({
                        ...toolTipPos,
                        left: e?.clientX,
                        top: e?.clientY - 10,
                      });
                      setTooltipContent(
                        `${geo.properties.maplab || geo.properties.romnam}`
                      );
                    }}
                    onMouseMove={(e) => {
                      setToolTipPos({
                        ...toolTipPos,
                        left: e?.clientX,
                        top: e?.clientY - 10,
                      });
                    }}
                    onMouseLeave={(e) => {
                      setEnableTooltip(false);
                      setToolTipPos({
                        ...toolTipPos,
                        left: e?.originalEvent?.clientX,
                        top: e?.originalEvent?.clientY - 10,
                      });
                      setTooltipContent("");
                    }}
                    onClick={(e) => {
                      const clickedArea = d?.area;
                      const clickedISO3 = d?.id;
                      if (clickedArea && clickedISO3) {
                        navigate(
                          `/food-security?countryFilter=${clickedArea}&countryId=${clickedISO3}`
                        );
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {/* <LabelContainer className="">
        <LabelTitle>Food Security Clusters</LabelTitle>
        <GradientLabel>
          {label.map((item) => (
            <GradientLabelBox key={item} background={item} />
          ))}
        </GradientLabel> */}
      {/* <LabelItemContainer>
          <LabelItem>Mid/Nil</LabelItem>
          <LabelItem>Moderate</LabelItem>
          <LabelItem>High</LabelItem>
          <LabelItem>Severe</LabelItem>
        </LabelItemContainer>
      </LabelContainer> */}
      <Disclamercontainer>
        <span>
          Disclaimer : The boundaries and names shown and the designations used
          on these map(s) do not imply the expression of any opinion whatsoever
          on the part of FAO concerning the legal status of any country,
          territory, city or area or of its authorities, or concerning the
          delimitation of its frontiers and boundaries. Dashed lines on maps
          represent approximate border lines for which there may not yet be full
          agreement.
        </span>
      </Disclamercontainer>
      {enableTooltip && tooltipContent !== "null" && (
        <PortalTooltip
          isOpen={true}
          pos={toolTipPos}
          align={toolTipPos.left > window.innerWidth / 2 ? "left" : "right"}
          vAlign={"top"}
        >
          <MapTooltipWrp>
            <MapTooltipValueCon>
              <span>{tooltipContent}</span>
            </MapTooltipValueCon>
          </MapTooltipWrp>
        </PortalTooltip>
      )}
    </MapContainer>
  );
};

export default SimpleMap;
