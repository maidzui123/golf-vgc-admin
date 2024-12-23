import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectPage from "../form/SelectPage";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import usePageSubmit from "../../hooks/usePageSubmit";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PageDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    editorDescription,
    setEditorDescription,
  } = usePageSubmit(id);
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Page")} description={t("Updated Page")} />
        ) : (
          <Title title={t("Add Page")} description={t("Add Page")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Page name")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Title")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Title")}
                      name="title"
                      type="text"
                      placeholder={t("Page title")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.title} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Description")} />
                  <div className="col-span-8 sm:col-span-4">
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorDescription}
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorDescription(data);
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                    <Error errorName={errors.description} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("Page")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default PageDrawer;
