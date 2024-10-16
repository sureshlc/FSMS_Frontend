import React from "react";
import MainRouter from "../routes";
import styled from "styled-components";

const GraphComponent = ({ isRecentCollapsed }) => {
  // const { sideBarClickedData, setSimilar_interests } =
  //   useGlobalData();
  // const queryClient = useQueryClient();
  // const queryParams = useQueryParams();
  // const country =queryParams.getQueryParam("Region/Country");
  // const item =queryParams.getQueryParam('Commodity');
  // const  dropDownSelectedData ={"Region/Country":country,"Commodity":item};
  //   const categoryData = queryClient.getQueryData([
  //     "category",
  //     sideBarClickedData?.name,
  //   ]);

  //   // summary data
  //   const { data: categorySummary } = useQuery({
  //     queryKey: [
  //       "categorySummary",
  //       sideBarClickedData?.name,
  //       dropDownSelectedData?.Commodity,
  //       dropDownSelectedData["Region/Country"],
  //     ],
  //     queryFn: () =>
  //       fetchCategorySummary(
  //         sideBarClickedData?.name,
  //         dropDownSelectedData?.Commodity,
  //         dropDownSelectedData["Region/Country"]
  //       ),
  //     select: (response) => response?.data?.data,
  //     refetchOnWindowFocus: false,
  //     enabled: !!categoryData,
  //   });

  //   useEffect(() => {
  //     if (categorySummary) {
  //       setSimilar_interests(categorySummary);
  //     }
  //   }, [categorySummary, setSimilar_interests]);

  return (
    <GraphContainer className={isRecentCollapsed ? "expand" : ""}>
      <MainRouter />
    </GraphContainer>
  );
};

export default GraphComponent;
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* margin-right: 3.7rem; */
  flex-direction: column;
  /* padding-left: 1rem; */
  /* padding: 1rem; */

  /* padding-left: 0rem; */
  transition: all 0.4s ease-out;
  &.expand {
    width: 93%;
    padding-left: 2.4rem;
    transition: all 0.4s ease-out;
  }
`;
