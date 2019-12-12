import React, { Component } from 'react';
import { Form, Button, Tag, Tooltip, Input, Icon } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class IntroForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['HTML5', 'CSS3', 'Graphics Design'],
      inputVisible: false,
      inputValue: ''
    };
  }

  handleClose = removedTag => {
    const { tags } = this.state;
    const filterTags = tags.filter(tag => tag !== removedTag);
    this.setState({ tags: filterTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  };

  render() {
    const { form } = this.props;
    const { inputVisible, tags, inputValue } = this.state;
    const { getFieldDecorator } = form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Price" style={{ width: 350 }}>
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: 'Please input your price per hours'
              }
            ]
          })(<Input suffix="₫" addonAfter="* 1000VND" />)}
        </Form.Item>
        <Form.Item label="Skill">
          <div>
            {tags.map(tag => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} onClose={() => this.handleClose(tag)} closable>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </div>
        </Form.Item>
        <Form.Item label="Introduction">
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'undo',
                'redo'
              ]
            }}
            data="<p>Tell something about yourself</p>"
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'intro_form' })(IntroForm);
