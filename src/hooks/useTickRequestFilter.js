import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "context/SidebarContext";
import TickRequestServices from "services/TickRequestServices";
import { notifyError, notifySuccess } from "utils/toast";

const useTickRequestFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { searchText } = useContext(SidebarContext);

  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const [newTickRequests] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);

  let services = data

  const serviceData = useMemo(() => {
    if (searchText) {
      services = data?.filter(search =>
        search?.customer_id?.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        search?.customer_id?.last_name?.toLowerCase().includes(searchText.toLowerCase()))
    }
    return services;
  }, [data, searchText]);

  const handleOnDrop = (data) => {
    for (let i = 0; i < data.length; i++) {
      newTickRequests.push(data[i].data);
    }
  };

  const handleUploadTickRequests = () => {
    if (newTickRequests.length < 1) {
      notifyError("Please upload / select csv file first!");
    } else {
      TickRequestServices.addAllTickRequests(newTickRequests)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  const handleSelectFile = async (e) => {
    e.preventDefault();

    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        const text = JSON.parse(e.target.result);

        const productData = text.map((value) => {
          return {
            categories: value.categories,
            image: value.image,
            barcode: value.barcode,
            tag: value.tag,
            variants: value.variants,
            status: value.status,
            prices: value.prices,
            isCombination: value.isCombination,
            title: value.title,
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: value.category,
            stock: value.stock,
            description: value.description,
          };
        });

        setSelectedFile(productData);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        // console.log('json',json)
        const productData = json.map((value) => {
          return {
            categories: JSON.parse(value.categories),
            image: JSON.parse(value.image),
            barcode: value.barcode,
            tag: JSON.parse(value.tag),
            variants: JSON.parse(value.variants),
            status: value.status,
            prices: JSON.parse(value.prices),
            isCombination: JSON.parse(value.isCombination),
            title: JSON.parse(value.title),
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: JSON.parse(value.category),
            stock: JSON.parse(value.stock),
            description: JSON.parse(value.description),
          };
        });

        setSelectedFile(productData);
      };

      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);

      const rABS = !!fileReader.readAsBinaryString;

      fileReader.onload = function (event) {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        /* Convert array of arrays */
        const json = XLSX.utils.sheet_to_json(ws);

        const productData = json.map((value) => {
          return {
            categories: JSON.parse(value.categories),
            image: JSON.parse(value.image),
            barcode: value.barcode,
            tag: JSON.parse(value.tag),
            variants: JSON.parse(value.variants),
            status: value.status,
            prices: JSON.parse(value.prices),
            isCombination: JSON.parse(value.isCombination),
            title: JSON.parse(value.title),
            productId: value.productId,
            slug: value.slug,
            sku: value.sku,
            category: JSON.parse(value.category),
            stock: JSON.parse(value.stock),
            description: JSON.parse(value.description),
          };
        });
        setSelectedFile(productData);
      };

      if (rABS) {
        fileReader.readAsBinaryString(file);
      } else {
        fileReader.readAsArrayBuffer(file);
      }
    }
  };

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
    dataTable,
    filename,
    isDisabled,
    handleSelectFile,
    serviceData,
    handleOnDrop,
    handleUploadTickRequests,
  };
};

export default useTickRequestFilter;
