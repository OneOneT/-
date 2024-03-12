import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { CatItemWrapper, PublicWrapper } from './style'
import { Form, Input, Modal, Select } from 'antd'
import { fetchCategoryList } from '@/store/moudles/category'
import { fetchTagList } from '@/store/moudles/tag'
import { useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'
import { shallowEqual } from 'react-redux'

export interface IPublicFormValues {
  article_summary: string
  category: string
  tags: any[]
}

interface IPublicProps {
  children?: ReactNode
  initialFormValues: IPublicFormValues
  category: string
  open: boolean
  confirmLoading: boolean
  changeCategory: (categoryId: string) => void
  onCreate: (values: IPublicFormValues) => void
  onCancel: () => any
}

const Public: React.FunctionComponent<IPublicProps> = ({
  initialFormValues,
  category = '',
  open,
  onCreate,
  onCancel,
  changeCategory,
  confirmLoading
}) => {
  const dispatch = useAppDispatch()
  const { categoryList, tagList } = useAppSelector(
    (state) => ({
      categoryList: state.category.categorylist,
      tagList: state.tag.taglist
    }),
    shallowEqual
  )
  useEffect(() => {
    dispatch(fetchCategoryList())
    dispatch(fetchTagList())
  }, [])

  const [form] = Form.useForm()

  const hanleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)

        // form.resetFields()

        onCreate(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <PublicWrapper>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        title="发表文章"
        okText="确认并发布"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => hanleOk()}
      >
        <div className="container">
          <Form
            form={form}
            name="public"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={initialFormValues}
          >
            <Form.Item
              label="分类"
              name="category"
              rules={[{ required: true, message: '请添加分类!' }]}
            >
              <CatItemWrapper>
                {categoryList.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={classNames(
                        `cat-item ${item.id === category ? 'active' : ''}`
                      )}
                      onClick={() => {
                        // setCategory(item.id)
                        changeCategory(item.id)
                        form.setFieldsValue({ category: item.id })
                      }}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </CatItemWrapper>
            </Form.Item>

            <Form.Item
              label="添加标签"
              name="tags"
              rules={[{ required: true, message: '请添加标签!' }]}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="请搜索添加标签"
                mode="multiple"
                maxCount={2}
                options={tagList.map((item) => {
                  return { value: item.id, label: item.name }
                })}
              />
            </Form.Item>

            <Form.Item
              label="编辑摘要"
              name="article_summary"
              rules={[{ required: true, message: '请输入内容摘要' }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </PublicWrapper>
  )
}

export default memo(Public)
