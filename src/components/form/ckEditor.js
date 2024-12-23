// CKEditor.js
import React, { useState, useEffect } from 'react';
import CKEditor from 'ckeditor';
const CKEditorComponent = ({ value, onChange, register, name }) => {
  const [editorData, setEditorData] = useState(value);

  useEffect(() => {
   
    setEditorData(value);
  }, [value]);

  return (
    <div>
      <CKEditor

        data={editorData}
        onChange={(e) => {
          const newData = e.editor.getData();
          onChange(newData); 
        }}
      />
      <textarea
        name={name}
        ref={register} 
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CKEditorComponent;
