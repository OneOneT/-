import IRequest from '@/services'

const URL = '/comment'

export const getArticleComment = (id: number, queryInfo?: any) => {
  return IRequest.post({
    url: `${URL}/${id}`,
    data: queryInfo
  })
}

export const createArtComment = (queryInfo: any) => {
  return IRequest.post({
    url: `${URL}/create`,
    data: queryInfo
  })
}

export const deleteArtComment = (id: number) => {
  return IRequest.delete({
    url: `${URL}/${id}`
  })
}
