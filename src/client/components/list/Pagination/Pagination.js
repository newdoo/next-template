import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import UIButton from '@components/common/UIButton';

const cx = classNames.bind(styles);

const Pagination = ({page, lastPage, tag}) => {
  const createPagePath = (page) => {
    return tag ? `/tag/${tag}/${page}` : `ListPage2`;
  }
  const createpageParams = (page) => {
    return tag ? `/tag/${tag}/${page}` : {page:page};
  }

  return (
    <div className={cx('pagination')}>
      <UIButton disabled={page === 1} link={createPagePath(page-1)} params={createpageParams(page-1)}>
        이전 페이지
      </UIButton>
      <div className={cx('number')}>
        페이지 {page}
      </div>
      <UIButton disabled={page===lastPage} link={createPagePath(page+1)} params={createpageParams(page+1)}>
        다음 페이지
      </UIButton>
    </div>
  );
};

export default Pagination;
