import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

const UploadManyImages = ({ id, imageFiles, setImageFiles, previews, setPreviews, service, required}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: 500000,
    onDrop: (acceptedFiles) => {
      const updatedImages = acceptedFiles.map((file) => {
        setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
        return file
      });
      setImageFiles((prevImages) => [...prevImages, ...updatedImages]);
    },
  });

  useEffect(() => {
    return () => { previews.forEach((preview) => URL.revokeObjectURL(preview)); };
  }, [previews]);

  const handleRemoveImage = async (index) => {
    console.log(index)
    const removedImage = imageFiles[index];
    const removedImagePreview = previews[index];
    setImageFiles((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
    URL.revokeObjectURL(removedImagePreview);
    if (id) await service.removeImageInList(id, index)
  };


  return (
    <div className="w-full text-center">
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

      <aside className="grid grid-cols-5 mt-4 w-full gap-2">
        {previews.map((item, i) => (
          <div key={i}>
            <img
              className="inline-flex border-2 border-gray-200 w-24 max-h-24 h-24 object-fill rounded-md"
              src={item}
            />
            <button
              type="button"
              className="text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(i)}
            >
              <FiXCircle />
            </button>
          </div>)
        )}
      </aside>
    </div>
  );
};

export default UploadManyImages;
