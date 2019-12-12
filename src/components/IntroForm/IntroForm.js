import React, { Component } from 'react';
import { Form, Button, Tag, Tooltip, Input, Icon } from 'antd';

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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
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
      <Form
        labelCol={formItemLayout.labelCol}
        wrapperCol={formItemLayout.wrapperCol}
        onSubmit={this.handleSubmit}
        style={{
          width: '450px'
        }}
      >
        <Form.Item label="Skill">
          {getFieldDecorator('tags', {
            rules: [
              {
                required: true,
                message: 'Please input your address!'
              }
            ]
          })(
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
          )}
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
