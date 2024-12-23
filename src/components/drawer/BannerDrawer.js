import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectBanner from "../form/SelectBanner";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useBannerSubmit from "../../hooks/useBannerSubmit";
import { useTranslation } from "react-i18next";
import ShowHideButton from "components/table/ShowHideButton";
import BannerServices from "services/BannerServices";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const BannerDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    status,
    setStatus,
    file,
    setFile,
    preview,
    setPreview,
    editorDescription,
    setEditorDescription,
  } = useBannerSubmit(id);

  const { t } = useTranslation();
  const styles = {
    newDescription: {
      height: "400px",
      overflow: "scroll",
    },
  };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Edit Banner")}
            description={t("Edit Infomation Banner")}
          />
        ) : (
          <Title title={t("Add Banner")} description={t("Add Banner")} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Banner image")} required />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    setFile={setFile}
                    id={id}
                    file={file}
                    preview={preview}
                    setPreview={setPreview}
                    service={BannerServices}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Banner name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Banner name")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Banner description")} />
                  <div className="col-span-8 sm:col-span-4" style={styles.newDescription}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorDescription}
                      onInit={(editor) => {
                        editor.setData(editorDescription);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();

                        setEditorDescription(data);
                      }}
                    />
                    {/* <Textarea
                      className="text-justify border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("description")}
                      name="description"
                      placeholder={t("Description")}
                      rows="10"
                      spellCheck="false"
                    /> */}
                    <Error errorName={errors.description} />
                  </div>
                </div>

                {id && (
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Status")} />
                    <div className="col-span-8 sm:col-span-4">
                      <ShowHideButton
                        id={id}
                        status={status}
                        setStatus={setStatus}
                      />
                    </div>
                  </div>
                )}
              </div>

              <DrawerButton id={id} title={t("Banner")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default BannerDrawer;
