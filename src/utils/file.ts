/**
 * 文件处理工具函数
 */

/**
 * 获取文件扩展名
 * @param filename - 文件名
 * @returns 小写的扩展名（不含点）
 * @example
 * getFileExtension('document.pdf') // 'pdf'
 * getFileExtension('image.PNG') // 'png'
 * getFileExtension('archive.tar.gz') // 'gz'
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot === -1 ? '' : filename.slice(lastDot + 1).toLowerCase()
}

/**
 * 获取文件名（不含扩展名）
 */
export function getFileName(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot === -1 ? filename : filename.slice(0, lastDot)
}

/**
 * 判断文件类型
 */
export function getFileType(filename: string): 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other' {
  const ext = getFileExtension(filename)

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico']
  const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm']
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a']
  const documentExts = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md']
  const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2']

  if (imageExts.includes(ext))
    return 'image'
  if (videoExts.includes(ext))
    return 'video'
  if (audioExts.includes(ext))
    return 'audio'
  if (documentExts.includes(ext))
    return 'document'
  if (archiveExts.includes(ext))
    return 'archive'
  return 'other'
}

/**
 * 文件转 Base64 字符串
 * @param file - 文件对象
 * @returns Base64 字符串的 Promise
 * @example
 * const file = document.querySelector('input[type="file"]').files[0]
 * const base64 = await fileToBase64(file)
 * console.log(base64) // 'data:image/png;base64,iVBORw0KG...'
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * Base64 转 Blob
 */
export function base64ToBlob(base64: string, type?: string): Blob {
  const parts = base64.split(';base64,')
  const contentType = type || parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i++)
    uInt8Array[i] = raw.charCodeAt(i)

  return new Blob([uInt8Array], { type: contentType })
}

/**
 * Base64 转 File
 */
export function base64ToFile(base64: string, filename: string): File {
  const blob = base64ToBlob(base64)
  return new File([blob], filename, { type: blob.type })
}

/**
 * 图片压缩
 * @param file - 图片文件
 * @param options - 压缩选项
 * @param options.maxWidth - 最大宽度（默认 1920）
 * @param options.maxHeight - 最大高度（默认 1080）
 * @param options.quality - 压缩质量 0-1（默认 0.8）
 * @returns 压缩后的文件 Promise
 * @example
 * const file = document.querySelector('input[type="file"]').files[0]
 * const compressed = await compressImage(file, {
 *   maxWidth: 1920,
 *   maxHeight: 1080,
 *   quality: 0.8
 * })
 * console.log('原大小:', file.size, '压缩后:', compressed.size)
 */
export function compressImage(
  file: File,
  options: {
    maxWidth?: number
    maxHeight?: number
    quality?: number
  } = {},
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        let { width, height } = img

        // 计算缩放比例
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        // 创建 canvas
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)

        // 转换为 Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            }
            else {
              reject(new Error('压缩失败'))
            }
          },
          file.type,
          quality,
        )
      }
      img.onerror = () => reject(new Error('图片加载失败'))
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
  })
}

/**
 * 验证文件大小
 */
export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize * 1024 * 1024
}

/**
 * 验证文件类型
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const ext = getFileExtension(file.name)
  return allowedTypes.includes(ext)
}
