export const DEFAULT = {
  "Region/Country": "All Mashreq Countries",
  Commodity: "Rice",
  Year: "2020",
  "Graph-type": "primary_graph",
};

export const YEAR_ENTITY = "Year";
export const COUNTRY_ENTITY = "Region/Country";
export const ITEM_ENTITY = "Commodity";
export const GRAPH_TYPE_ENTITY = "Graph-type";
export const SIMILAR_INTEREST_ENTITY = "similar_interest";

export const getDefaultValue = (entity) => {
  return DEFAULT[entity];
};
