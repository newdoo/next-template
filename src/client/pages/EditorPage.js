import React from 'react';
import App from "@components/app"
import EditorTemplate from '@components/editor/EditorTemplate';
import EditorHeaderContainer from '@containers/editor/EditorHeaderContainer';
import EditorPaneContainer from '@containers/editor/EditorPaneContainer';
import PreviewPaneContainer from '@containers/editor/PreviewPaneContainer';


const EditorPage = () => {
  return (
    <App>
      <EditorTemplate
        header={<EditorHeaderContainer/>}
        editor={<EditorPaneContainer/>}
        preview={<PreviewPaneContainer/>}
      />
    </App>
  );
};

export default EditorPage;