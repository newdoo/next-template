import React from 'react';
import App from "@components/app"
import PageTemplate from '@components/common/PageTemplate';
import ListWrapper from '@components/list/ListWrapper';
import ListContainer from '@containers/list/ListContainer';

import { withRouter } from 'next/router'

class ListPage extends React.Component {

  render() {

    const { page = 1, tag } = this.props.router.query;

    return (
      <App>
      <PageTemplate>
        <ListWrapper>
          <ListContainer
            page={parseInt(page, 10)}
            tag={tag}
          />
        </ListWrapper>
      </PageTemplate>
    </App>
    );
  }
}

export default withRouter(ListPage);