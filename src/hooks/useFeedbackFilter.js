/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import { useContext, useEffect, useMemo, useState } from "react";
import { SidebarContext } from "context/SidebarContext";

const useFeedbackFilter = (data) => {
    const ajv = new Ajv({ allErrors: true });
    const { setLoading, setIsUpdate, searchText } = useContext(SidebarContext);
    const [newFeedbacks, setNewFeedback] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    /* The code block you provided is a custom hook called `useFeedbackFilter`. */
    let services = data

    const serviceData = useMemo(() => {
        if (searchText) {
            services = data?.filter((search) =>
                search?.unsigned_name?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.description?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.rules?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.created_by?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                search?.fee?.toLowerCase().includes(searchText.toLowerCase()));
        }
        return services
    }, [searchText, data])

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
        serviceData,
        dataTable,
    };
};

export default useFeedbackFilter;
