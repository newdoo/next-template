import React from 'react';
import styles from './EditorHeader.scss';
import classNames from 'classnames/bind';
import UIButton from '@components/common/UIButton';

const cx = classNames.bind(styles);

const EditorHeader = ({onGoBack, onSubmit, isEdit}) => {
  return (
    <div className={cx('editor-header')}>
      <div className={cx('back')}>
        <UIButton onClick={onGoBack} theme="outline">뒤로가기</UIButton>
      </div>
      <div className={cx('submit')}>
        <UIButton onClick={onSubmit} theme="outline">{isEdit ? '수정' : '작성'}하기</UIButton>
      </div>
    </div>
  );
};

export default EditorHeader;
