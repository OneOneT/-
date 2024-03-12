import React, { memo, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchArticleDetail,
  fetchCreateArticle,
  fetchUpdateArticle
} from '@/store/moudles/article'
import { useAppDispatch, useAppSelector } from '@/store'
import { message } from 'antd'
import Public, { IPublicFormValues } from './cpns/public'
import ContentHtml, { IContetHtmlRef } from './cpns/content-html'
import ContentMd, { IContentMdRef } from './cpns/content-md'
import EditorHead, { IEditorHeadRef } from './cpns/editor-head'
import { EditorWrapper } from './style'
import '@wangeditor/editor/dist/css/style.css'

interface IEditorProps {
  children?: ReactNode
}

const Editor: React.FunctionComponent<IEditorProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { articleInfo } = useAppSelector(
    (state) => ({
      articleInfo: state.article.articleInfo
    }),
    shallowEqual
  )

  const { id } = useParams()

  const editorHeadRef = useRef<IEditorHeadRef>(null)
  const contentMdRef = useRef<IContentMdRef>(null)
  const contentHtmlRef = useRef<IContetHtmlRef>(null)

  const [isNew, setIsNew] = useState(true)
  const [isMd, setIsMd] = useState(false)
  const [mdContent, setMdContent] = useState('')
  const [htmlContent, setHtmlContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [initialFormValues, setInitialFormValues] = useState<IPublicFormValues>(
    {
      article_summary: '',
      category: '',
      tags: []
    }
  )

  useEffect(() => {
    fetchArticle()
  }, [id])

  useEffect(() => {
    init()
  }, [articleInfo])

  const fetchArticle = async () => {
    if (!id) return
    await dispatch(fetchArticleDetail(Number(id)))
  }

  // 更新文章初始化
  const init = () => {
    if (articleInfo.id) {
      setIsNew(false)

      setTitle(articleInfo.title)
      setCategory(articleInfo.category?.id)
      if (articleInfo.articleDetail?.content_md) {
        setIsMd(true)
        setMdContent(articleInfo.articleDetail?.content_md)
      } else {
        setHtmlContent(articleInfo.articleDetail?.content_html)
      }

      setInitialFormValues({
        article_summary: articleInfo.article_summary,
        category: articleInfo.category?.id,
        tags: articleInfo.tags?.map((item: any) => {
          return item.id
        })
      })
    }
  }

  const changeTitle = (e: any) => {
    setTitle(e.currentTarget.value)
  }

  const haneleType = () => {
    setIsMd(!isMd)
  }

  const handlePublick = () => {
    if (!title) return message.error('标题不能为空')

    // 打开面板
    setOpen(true)
  }

  const hanleCreate = async (values: IPublicFormValues) => {
    setConfirmLoading(true)

    const queryInfo = { title, ...values }
    if (isMd) {
      Object.assign(queryInfo, { content_md: contentMdRef.current?.getText() })
    } else {
      Object.assign(queryInfo, {
        content_html: contentHtmlRef.current?.getHtml()
      })
    }

    if (isNew) {
      // 创建操作
      const res = await dispatch(fetchCreateArticle(queryInfo))
      const { insertId } = res?.payload as any

      // 路由跳转
      navigate(`/article/${insertId}`)
    } else {
      // 更新
      await dispatch(fetchUpdateArticle({ id, queryInfo }))

      // 路由跳转
      navigate(`/article/${id}`)
    }

    setConfirmLoading(false)
    setOpen(false)
  }

  return (
    <EditorWrapper>
      <EditorHead
        ref={editorHeadRef}
        titleData={title}
        isMd={isMd}
        changeTitle={changeTitle}
        typeClick={() => haneleType()}
        pubiclClick={() => handlePublick()}
      />

      {isMd ? (
        <ContentMd ref={contentMdRef} initConetnt={mdContent} />
      ) : (
        <ContentHtml ref={contentHtmlRef} initContent={htmlContent} />
      )}

      <Public
        initialFormValues={initialFormValues}
        category={category}
        open={open}
        confirmLoading={confirmLoading}
        changeCategory={(categoryId) => setCategory(categoryId)}
        onCreate={hanleCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </EditorWrapper>
  )
}

export default memo(Editor)
