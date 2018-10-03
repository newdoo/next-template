import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorPane extends Component {

  render() {
    const { handleChange } = this;
    const { tags, title } = this.props;

    return (
      <div className={cx('editor-pane')}>
        <input 
          className={cx('title')} 
          placeholder="제목을 입력하세요" 
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input 
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
