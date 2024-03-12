import IRequest from '@/services'

const URL = '/category'

export const getCategoryById = (id: number) => {
  return IRequest.get({
    url: `${URL}/${id}`
  })
}

export const getCategoryList = (queryInfo: any) => {
  return IRequest.post({
    url: `${URL}/list`,
    data: queryInfo
  })
}

export const getCategoryArticleList = (id: number, queryInfo: any) => {
  return IRequest.post({
    url: `${URL}/${id}`,
    data: queryInfo
  })
}
