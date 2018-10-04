import React from 'react';
import App from "@components/app"
import PageTemplate from '@components/common/PageTemplate';
import ListWrapper from '@components/list/ListWrapper';
import PostList from '@components/list/PostList';
import Pagination from '@components/list/Pagination';

const ListPage = () => {
  return (
    <App>
      <PageTemplate>
        <ListWrapper>
          <PostList/>
          <Pagination/>
        </ListWrapper>
      </PageTemplate>
    </App>
    
  );
};

export default ListPage;