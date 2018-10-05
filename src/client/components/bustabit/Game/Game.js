import React from 'react';
import styles from './Game.scss';
import classNames from 'classnames/bind';

import { Link } from '@common/routes';
import UIButton from '@components/common/UIButton';

const cx = classNames.bind(styles);



const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link route='home' passHref><a>Next-Template</a></Link>
      </div>
      <div className={cx('right')}>
        <UIButton theme="outline" radius="5px" link="editor">새 포스트</UIButton>
      </div>
    </div>
  </header>
);

export default Header;