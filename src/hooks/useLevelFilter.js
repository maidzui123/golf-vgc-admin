/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "context/SidebarContext";
import LevelServices from "services/LevelServices";
import { notifyError, notifySuccess } from "utils/toast";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    categories: { type: "array" },
    image: { type: "array" },
    tag: { type: "array" },
    variants: { type: "array" },
    show: { type: "array" },
    status: { type: "string" },
    prices: { type: "object" },
    isCombination: { type: "boolean" },
    title: { type: "object" },
    productId: { type: "string" },
    slug: { type: "string" },
    category: { type: "object" },
    stock: { type: "number" },
    description: { type: "object" },
  },
  required: ["categories", "category", "prices", "title"],
};

const useLevelFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate, searchText } = useContext(SidebarContext);

  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);
  const [newFeedbacks, setNewFeedback] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  //service data filtering
  // const serviceData = data;

  //  console.log('selectedFile',selectedFile)

  let services = data;

  const serviceData = useMemo(() => {
    if (searchText) {
      services = data?.filter(
        (search) =>
          search?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          search?.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return services;
  }, [searchText, data]);

  useEffect(() => {
    setDataTable(
      serviceData?.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [serviceData, currentPage, resultsPerPage]);

  return {
    data,
    filename,
    isDisabled,
    serviceData,
    dataTable,
  };
};

export default useLevelFilter;
