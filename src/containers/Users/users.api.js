import request from 'utils/request';

export function getUsersAPI() {
  // return request.get('v1/users?limit=100');
  return request.get('v1/users');
}

export function postUsersAPI(payload) {

  console.log("payload",payload)
  // const formData = new FormData();
  // formData.set('accountId', payload.accountId);
  // formData.set('name', payload.name);
  // formData.set('email', payload.email);
  // formData.set('password', payload.password);
  // formData.set('permissions', 'user');
  return request.post('v1/addUser', payload);
}

export function putUsersAPI(payload) {
  const formData = new FormData();
  formData.set('accountId', payload.accountId);
  formData.set('name', payload.name);
  formData.set('email', payload.email);
  formData.set('password', payload.password);
  return request.put(`v1/posts/${payload.id}`, formData);
}
