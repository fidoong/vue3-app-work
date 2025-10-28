#!/usr/bin/env tsx
/**
 * Bundle 分析脚本
 * 分析构建产物，生成详细报告
 */

import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

interface FileInfo {
  name: string
  size: number
  sizeKB: string
  type: 'js' | 'css' | 'other'
}

interface BundleStats {
  totalSize: number
  totalSizeKB: string
  jsSize: number
  jsSizeKB: string
  cssSize: number
  cssSizeKB: string
  files: FileInfo[]
  largeFiles: FileInfo[]
}

function formatSize(bytes: number): string {
  return (bytes / 1024).toFixed(2)
}

function getFileType(filename: string): 'js' | 'css' | 'other' {
  if (filename.endsWith('.js'))
    return 'js'
  if (filename.endsWith('.css'))
    return 'css'
  return 'other'
}

function analyzeDirectory(dir: string): FileInfo[] {
  const files: FileInfo[] = []

  function walk(currentDir: string) {
    const items = readdirSync(currentDir)

    for (const item of items) {
      const fullPath = join(currentDir, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      }
      else if (stat.isFile()) {
        const relativePath = fullPath.replace(`${dir}/`, '')
        files.push({
          name: relativePath,
          size: stat.size,
          sizeKB: formatSize(stat.size),
          type: getFileType(item),
        })
      }
    }
  }

  walk(dir)
  return files
}

function generateReport(stats: BundleStats) {
  console.log('\n📦 Bundle 分析报告\n')
  console.log('='.repeat(60))

  // 总体统计
  console.log('\n📊 总体统计:')
  console.log(`  总大小: ${stats.totalSizeKB} KB`)
  console.log(`  JS 大小: ${stats.jsSizeKB} KB (${((stats.jsSize / stats.totalSize) * 100).toFixed(1)}%)`)
  console.log(`  CSS 大小: ${stats.cssSizeKB} KB (${((stats.cssSize / stats.totalSize) * 100).toFixed(1)}%)`)
  console.log(`  文件数量: ${stats.files.length}`)

  // 大文件警告
  if (stats.largeFiles.length > 0) {
    console.log('\n⚠️  大文件警告 (> 200KB):')
    stats.largeFiles.forEach((file) => {
      console.log(`  ${file.name}: ${file.sizeKB} KB`)
    })
  }

  // 文件列表
  console.log('\n📄 文件列表:')

  // JS 文件
  const jsFiles = stats.files.filter(f => f.type === 'js').sort((a, b) => b.size - a.size)
  if (jsFiles.length > 0) {
    console.log('\n  JavaScript:')
    jsFiles.forEach((file) => {
      const indicator = file.size > 200 * 1024 ? '⚠️ ' : '  '
      console.log(`  ${indicator}${file.name}: ${file.sizeKB} KB`)
    })
  }

  // CSS 文件
  const cssFiles = stats.files.filter(f => f.type === 'css').sort((a, b) => b.size - a.size)
  if (cssFiles.length > 0) {
    console.log('\n  CSS:')
    cssFiles.forEach((file) => {
      console.log(`    ${file.name}: ${file.sizeKB} KB`)
    })
  }

  // 性能建议
  console.log('\n💡 优化建议:')

  if (stats.jsSize > 500 * 1024) {
    console.log('  • JS 总大小超过 500KB，考虑进一步代码分割')
  }

  if (stats.largeFiles.length > 0) {
    console.log('  • 存在大文件，考虑拆分或懒加载')
  }

  if (stats.files.length > 30) {
    console.log('  • 文件数量较多，考虑合并小文件')
  }

  const entryFile = jsFiles.find(f => f.name.includes('index'))
  if (entryFile && entryFile.size > 200 * 1024) {
    console.log('  • 入口文件过大，检查是否有不必要的依赖')
  }

  console.log(`\n${'='.repeat(60)}\n`)
}

function main() {
  const distDir = join(process.cwd(), 'dist/assets')

  try {
    const files = analyzeDirectory(distDir)

    const stats: BundleStats = {
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
      totalSizeKB: '',
      jsSize: files.filter(f => f.type === 'js').reduce((sum, f) => sum + f.size, 0),
      jsSizeKB: '',
      cssSize: files.filter(f => f.type === 'css').reduce((sum, f) => sum + f.size, 0),
      cssSizeKB: '',
      files,
      largeFiles: files.filter(f => f.size > 200 * 1024),
    }

    stats.totalSizeKB = formatSize(stats.totalSize)
    stats.jsSizeKB = formatSize(stats.jsSize)
    stats.cssSizeKB = formatSize(stats.cssSize)

    generateReport(stats)
  }
  catch (error) {
    console.error('❌ 分析失败:', error)
    console.log('\n请先运行构建命令: pnpm build')
    process.exit(1)
  }
}

main()
