/**
 * 基础使用示例
 */
import { HttpClientManager } from '../core'

// 创建客户端实例
const apiClient = HttpClientManager.createClient('example', {
  baseURL: '/api',
  timeout: 10000,
  showLoading: true,
  showError: true,
  requireAuth: true,
  getToken: () => localStorage.getItem('token'),
  onTokenExpired: () => {
    // Token过期，跳转登录页
    window.location.href = '/login'
  },
})

// GET 请求
export async function getUserList() {
  const response = await apiClient.get('/users', {
    page: 1,
    pageSize: 10,
  })
  return response.data
}

// GET 请求示例（带日志）
export async function getUserListWithLog() {
  const response = await apiClient.get('/users', {
    page: 1,
    pageSize: 10,
  })
  // 处理响应数据
  return response.data
}

// POST 请求
export async function createUser(data: any) {
  const response = await apiClient.post('/users', data, {
    showSuccess: true,
    successMessage: '创建成功',
  })
  return response.data
}

// PUT 请求
export async function updateUser(id: number, data: any) {
  const response = await apiClient.put(`/users/${id}`, data, {
    showSuccess: true,
  })
  return response.data
}

// DELETE 请求
export async function deleteUser(id: number) {
  const response = await apiClient.delete(`/users/${id}`, undefined, {
    showSuccess: true,
    successMessage: '删除成功',
  })
  return response.data
}

// 文件上传
export async function uploadFile(file: File, onProgress?: (progress: number) => void) {
  const response = await apiClient.upload('/upload', file, {
    onProgress: onProgress || ((_progress) => {
      // 上传进度回调
      // _progress: 0-100
    }),
  })
  return response.data
}

// 文件下载
export async function downloadFile(id: string, onProgress?: (progress: number) => void) {
  await apiClient.download(`/files/${id}`, undefined, {
    filename: 'download.pdf',
    onProgress: onProgress || ((_progress) => {
      // 下载进度回调
      // _progress: 0-100
    }),
  })
}
