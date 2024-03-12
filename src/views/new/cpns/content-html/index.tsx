import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import type { ReactNode } from 'react'
import { ContentHtmlWrapper } from './style'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Editor as EditorReact, Toolbar } from '@wangeditor/editor-for-react'

export interface IContetHtmlRef {
  getHtml: () => string
}

interface IContentHtmlProps {
  children?: ReactNode
  initContent: string
}

const ContentHtml: React.ForwardRefRenderFunction<
  IContetHtmlRef,
  IContentHtmlProps
> = ({ initContent }, ref) => {
  useImperativeHandle(ref, () => ({
    getHtml() {
      return html
    }
  }))

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 编辑器内容
  const [html, setHtml] = useState('')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...'
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(() => {
    if (!initContent.length) return
    console.log(initContent)

    editor!.setHtml(`${initContent}`)
  }, [initContent])

  const changeContent = (editor: IDomEditor) => {
    setHtml(editor.getHtml())
  }

  return (
    <ContentHtmlWrapper>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />

        <EditorReact
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            changeContent(editor)
          }}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>

      {/* <div className="show">
        <div style={{ marginTop: '15px' }}>{html}</div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div> */}
    </ContentHtmlWrapper>
  )
}

export default memo(forwardRef(ContentHtml))
