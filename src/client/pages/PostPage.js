import React from 'react';
import App from "@components/app"
import PageTemplate from '@components/common/PageTemplate';
import Post from '@containers/post/Post';

import { withRouter } from 'next/router'

class PostPage extends React.Component {

  render() {

    const { id } = this.props.router.query;

    return (
      <App>
        <PageTemplate>
          <Post id={id}/>
        </PageTemplate>
      </App>
    );
  }
}

export default withRouter(PostPage);