import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import { Link } from 'common/routes';

const cx = classNames.bind(styles);

const Footer = ({onLoginClick, logged}) => (
  <footer className={cx('footer')}>
    <Link route='home' passHref><a className={cx('brand')}>Next-Template</a></Link>
    <div onClick={onLoginClick} className={cx('admin-login')}>
      {logged ? '로그아웃' : '관리자 로그인'}
    </div>
  </footer>
);

export default Footer;
