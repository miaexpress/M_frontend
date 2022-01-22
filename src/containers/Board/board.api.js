import request from 'utils/request';

export function getPostsAPI() {
  return request.get('v1/posts?limit=100');
}

export function postPostsAPI(payload) {
  const formData = new FormData();
  formData.set('title', payload.title);
  formData.set('description', payload.description);
  payload.attachment && formData.set('attachment', payload.attachment);

  return request.post('v1/posts', formData);
}

export function putPostsAPI(payload) {
  const formData = new FormData();
  formData.set('title', payload.title);
  formData.set('description', payload.description);
  formData.set('checkbox', payload.checkbox);
  payload.attachment && formData.set('attachment', payload.attachment);

  return request.put(`v1/posts/${payload.id}`, formData);
}
