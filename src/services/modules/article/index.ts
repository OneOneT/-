import IRequest from '@/services'

export const getArticleList = (queryInfo: any) => {
  return IRequest.post({
    url: '/article/list',
    data: queryInfo
  })
}

export const getArticleListByUserId = (userid: number, queryInfo: any) => {
  return IRequest.post({
    url: `/article/${userid}`,
    data: queryInfo
  })
}

export const getArticleDetail = (id: number) => {
  return IRequest.get({
    url: `article/detail/${id}`
  })
}

/**
 * title ==> 标题,
 * article_summary ==> 描述
 * content_md ==> md
 * content_Html ==>富文本
 * **/
export const createArticle = (queryInfo: any) => {
  return IRequest.post({ url: '/article/create', data: queryInfo })
}

export const deleteArticle = (id: number) => {
  return IRequest.delete({
    url: `/article/${id}`
  })
}

export const updateArticle = (id: number, queryInfo: any) => {
  return IRequest.patch({
    url: `/article/${id}`,
    data: queryInfo
  })
}
