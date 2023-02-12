import request from './request'

export const getUsers = () => {
  return request({
    url: '/users',
    method: 'get',
  })
}

export const addUser = (data) => {
  return request({
    url: '/users/add',
    method: 'post',
    data,
  })
}
