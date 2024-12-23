// import React, { useState, useEffect } from "react";
// import { Select } from "@windmill/react-ui";

// import IconServices from "../../services/IconServices";
// import { useTranslation } from "react-i18next";
// import useAsync from "../../hooks/useAsync";
// import { icons } from "react-icons/lib";

// const SelectIcon = ({
//   setIcons,
//   register,
//   name,
//   label,
//   defaultValue,
//   disabled,
// }) => {
//   console.log("name", name);
//   const { t } = useTranslation();

//   const { data: response, loading } = useAsync(IconServices.getAll);

//   useEffect(() => {
//     if (response.data) {
//       setIcons(response.data);
//     }
//   }, [response]);

//   console.log("selectedIcon", response.data);

//   return (
//     <>
//      
//     </>
//   );
// };

// export default SelectIcon;
