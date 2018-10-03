import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import UIButton from '@components/common/UIButton';

const cx = classNames.bind(styles);

const Pagination = () => (

  <div className={cx('pagination')}>
    <UIButton disabled>
      이전 페이지
    </UIButton>
    <div className={cx('number')}>
      페이지 1
    </div>
    <UIButton>
      다음 페이지
    </UIButton>
  </div>
);

export default Pagination;
