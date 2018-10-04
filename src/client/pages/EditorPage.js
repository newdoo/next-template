import React from 'react';
import App from "@components/app"
import EditorTemplate from '@components/editor/EditorTemplate';
import EditorHeader from '@components/editor/EditorHeader';
import PreviewPane from '@components/editor/PreviewPane';
import EditorPaneContainer from '@containers/editor/EditorPaneContainer';
import PreviewPaneContainer from '@containers/editor/PreviewPaneContainer';

const EditorPage = () => {
  return (
    <App>
      <EditorTemplate
        header={<EditorHeader/>}
        editor={<EditorPaneContainer/>}
        preview={<PreviewPaneContainer/>}
      />
    </App>
  );
};

export default EditorPage;