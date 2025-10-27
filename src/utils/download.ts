/**
 * 下载导出工具函数
 */

/**
 * 下载文件
 * @param url - 文件 URL
 * @param filename - 文件名（可选）
 * @example
 * downloadFile('https://example.com/file.pdf', 'document.pdf')
 * downloadFile('/api/export/data.xlsx')
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  if (filename)
    link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 下载 Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

/**
 * 下载文本文件
 */
export function downloadText(text: string, filename: string, type = 'text/plain'): void {
  const blob = new Blob([text], { type })
  downloadBlob(blob, filename)
}

/**
 * 下载 JSON 文件
 */
export function downloadJson(data: any, filename: string): void {
  const json = JSON.stringify(data, null, 2)
  downloadText(json, filename, 'application/json')
}

/**
 * 下载 CSV 文件
 * @param data - 数据数组
 * @param filename - 文件名
 * @param headers - 表头数组（可选）
 * @example
 * const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * downloadCsv(users, 'users.csv', ['name', 'age'])
 */
export function downloadCsv(data: any[], filename: string, headers?: string[]): void {
  let csv = ''

  // 添加表头
  if (headers && headers.length > 0)
    csv += `${headers.join(',')}\n`

  // 添加数据行
  data.forEach((row) => {
    const values = headers
      ? headers.map(header => row[header] ?? '')
      : Object.values(row)
    csv += `${values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')}\n`
  })

  downloadText(csv, filename, 'text/csv;charset=utf-8;')
}

/**
 * 下载 Excel 文件（需要配合后端或使用 xlsx 库）
 */
export function downloadExcel(data: any[], filename: string): void {
  console.warn('请使用 xlsx 库实现 Excel 导出功能')
  // 这里只是示例，实际需要使用 xlsx 库
  downloadCsv(data, filename.replace('.xlsx', '.csv'))
}

/**
 * 下载图片
 */
export function downloadImage(url: string, filename?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.blob())
      .then((blob) => {
        const name = filename || url.split('/').pop() || 'image.png'
        downloadBlob(blob, name)
        resolve()
      })
      .catch(reject)
  })
}

/**
 * 下载 Base64 图片
 */
export function downloadBase64Image(base64: string, filename: string): void {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i++)
    uInt8Array[i] = raw.charCodeAt(i)

  const blob = new Blob([uInt8Array], { type: contentType })
  downloadBlob(blob, filename)
}

/**
 * 导出表格为 HTML
 */
export function exportTableToHtml(tableElement: HTMLTableElement, filename: string): void {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${filename}</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  ${tableElement.outerHTML}
</body>
</html>
  `
  downloadText(html, filename, 'text/html')
}

/**
 * 批量下载文件
 */
export async function downloadMultiple(urls: string[], filenames?: string[]): Promise<void> {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const filename = filenames?.[i]
    await downloadImage(url, filename)
    // 添加延迟避免浏览器阻止
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}
