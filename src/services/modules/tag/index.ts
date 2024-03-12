import IRequest from '@/services'

export const getTagList = (queryInfo: any) => {
  return IRequest.post({
    url: '/tag/list',
    data: queryInfo
  })
}
