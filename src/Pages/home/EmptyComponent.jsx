import React, { useEffect } from "react";
import { useGlobalData } from "../../hooks/GlobalContext";

const EmptyComponent = () => {
  const { setSideBarClickedData, setDropdownFilterData } = useGlobalData();
  useEffect(() => {
    setSideBarClickedData({
      name: "",
    });
    setDropdownFilterData();
  }, [setSideBarClickedData, setDropdownFilterData]);

  return <div>Add home page here</div>;
};

export default EmptyComponent;
