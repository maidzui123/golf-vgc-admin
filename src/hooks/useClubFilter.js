/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "context/SidebarContext";
import ClubServices from "services/ClubServices";
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

const useClubFilter = (data) => {
    const ajv = new Ajv({ allErrors: true });
    const [dataTable, setDataTable] = useState([]); //tableTable for showing on table according to filtering
    const { setLoading, setIsUpdate, searchText } = useContext(SidebarContext);
    const [currentPage, setCurrentPage] = useState(1);

    const [newClubs] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [filename, setFileName] = useState("");
    const [isDisabled, setIsDisable] = useState(false);
    const [objectSearch, setObjectSearch] = useState({
        description: "",
        fee: "",
        name: "",
        rules: "",
      })

    const resultsPerPage = 10;
 

    let services = data

    //service data filtering
    const serviceData = useMemo(() => {  
        if (searchText) {
            services = data.filter((search) =>
                search?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.description?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.rules?.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return services;
    }, [data, searchText]);

    const handleOnDrop = (data) => {
        for (let i = 0; i < data.length; i++) {
            newClubs.push(data[i].data);
        }
    };

    const handleUploadClubs = () => {
        if (newClubs.length < 1) {
            notifyError("Please upload/select csv file first!");
        } else {
            // notifySuccess('CRUD operation disable for demo!');
            ClubServices.addAllClubs(newClubs)
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

    const handleUploadMultiple = (e) => {
        if (selectedFile.length > 1) {
            setLoading(true);
            let productDataValidation = selectedFile.map((value) =>
                ajv.validate(schema, value)
            );

            const isBelowThreshold = (currentValue) => currentValue === true;
            const validationData = productDataValidation.every(isBelowThreshold);
            // console.log('validationdata',validationData)

            if (validationData) {
                ClubServices.addAllClubs(selectedFile)
                    .then((res) => {
                        setIsUpdate(true);
                        setLoading(false);
                        notifySuccess(res.message);
                    })
                    .catch((err) => {
                        setLoading(false);
                        notifyError(err.message);
                    });
            } else {
                setLoading(false);
                notifyError("Please enter valid data!");
            }
        } else {
            setLoading(false);
            notifyError("Please select a valid json, csv & xls file first!");
        }
    };

    const handleRemoveSelectFile = (e) => {
        setFileName("");
        setSelectedFile([]);
        setTimeout(() => setIsDisable(false), 1000);
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
        filename,
        isDisabled,
        dataTable,
        handleSelectFile,
        serviceData,
        handleOnDrop,
        handleUploadClubs,
        handleRemoveSelectFile,
        handleUploadMultiple,
        resultsPerPage,
    };
};

export default useClubFilter;
