#!/bin/bash

# 批量转换 Vue 文件的 <style scoped> 为 <style scoped lang="scss">
# 使用方法: ./scripts/convert-styles-to-scss.sh

echo "开始转换 Vue 文件样式为 SCSS..."

# 查找所有包含 <style scoped> 的 Vue 文件
files=$(find src -name "*.vue" -type f -exec grep -l "<style scoped>" {} \;)

count=0
for file in $files; do
  # 检查是否已经是 lang="scss"
  if grep -q '<style scoped lang="scss">' "$file"; then
    echo "跳过（已转换）: $file"
    continue
  fi

  # 转换 <style scoped> 为 <style scoped lang="scss">
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/<style scoped>/<style scoped lang="scss">/g' "$file"
  else
    # Linux
    sed -i 's/<style scoped>/<style scoped lang="scss">/g' "$file"
  fi

  echo "✓ 已转换: $file"
  ((count++))
done

echo ""
echo "转换完成！共转换 $count 个文件。"
