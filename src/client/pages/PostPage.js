import React from 'react';
import App from "@components/app"
import PageTemplate from '@components/common/PageTemplate';
import Post from '@containers/post/Post';

const PostPage = props => {

  const { id } = props.url.query;

  return (
    <App>
      <PageTemplate>
        <Post id={id}/>
      </PageTemplate>
    </App>
    
  );
};

export default PostPage;