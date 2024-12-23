import { React, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectNews from "../form/SelectNews";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useNewsSubmit from "../../hooks/useNewsSubmit";
import { useTranslation } from "react-i18next";
import Status from "components/table/Status";

import CKEditorComponent from "components/form/ckEditor";
import UploadManyImages from "components/image-uploader/UploadManyImages";
import NewsServices from "services/NewsServices";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewsDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageFiles,
    setImageFiles,
    previews,
    setPreviews,
    editorDescription,
    setEditorDescription,
  } = useNewsSubmit(id);
  const { t } = useTranslation();
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const styles = {
    newDescription: {
      height: "400px",
      overflow: "scroll"
    }
  };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Edit News")}
            description={t("Edit Information News")}
          />
        ) : (
          <Title title={t("Add News")} description={t("Add News")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Upload Image")} />
                  <div className="col-span-8 sm:col-span-4">
                    <UploadManyImages
                      id={id}
                      imageFiles={imageFiles}
                      setImageFiles={setImageFiles}
                      previews={previews}
                      setPreviews={setPreviews}
                      service={NewsServices}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Title News")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("title", {
                        required: t("Title is required!"),
                      })}
                      name="title"
                      placeholder={t("Title")}
                      rows="2"
                      spellCheck="false"
                    />
                    <Error errorName={errors.title} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Description")} />
                  <div className="col-span-8 sm:col-span-4 h-40" style={styles.newDescription}>
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
                    <Error errorName={errors.description} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("News")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default NewsDrawer;
