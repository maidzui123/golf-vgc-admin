import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import cloudinary from "cloudinary/lib/cloudinary";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

//internal import
import useAsync from "hooks/useAsync";
import SettingServices from "services/SettingServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

const Uploader = ({
  id,
  file,
  setFile,
  preview,
  setPreview,
  service,
  handleDeleteImage
}) => {

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    maxSize: 500000,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const handleRemoveImage = async () => {
    setFile(null);
    setPreview(null);
    URL.revokeObjectURL(preview);
    if (id) await service.removeImage(id)
  };

  return (
    <div className="w-full text-center">
      <aside className="flex flex-col items-center mt-4 w-full gap-2">
        <div>
          {preview &&
            <div className="flex flex-col items-center mb-4">
              <img
                className="inline-flex border-2 border-gray-200 w-60 h-40 object-fill rounded-md"
                src={preview}
              />
              <button
                type="button"
                className="text-red-500 focus:outline-none mt-2"
                onClick={() => handleRemoveImage()}
              >
                <FiXCircle />
              </button>
            </div>
          }
        </div>
      </aside >

      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-green-500" />
        </span>
        <p className="text-sm mt-2">{t("Drag Your Image")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>
    </div >
  );
};

export default Uploader;
