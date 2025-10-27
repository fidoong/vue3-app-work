<script setup lang="ts">
import { useTheme } from '~/components/theme'

const { isDark, currentPreset, themeColors } = useTheme()
</script>

<template>
  <div class="page-container">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">
          欢迎使用主题系统
        </h1>
        <p class="page-description">
          点击右下角的 🎨 按钮打开主题设置
        </p>
      </div>

      <ASpace
        direction="vertical"
        :size="16"
        style="width: 100%"
      >
        <!-- 当前主题信息 -->
        <ACard title="当前主题">
          <p>模式: {{ isDark ? '暗色' : '亮色' }}</p>
          <p>预设: {{ currentPreset.name }}</p>
          <p>主色: {{ themeColors.primary }}</p>
        </ACard>

        <!-- Ant Design Vue 组件测试 -->
        <ACard title="Ant Design Vue 组件">
          <ASpace>
            <AButton type="primary">
              主要按钮
            </AButton>
            <AButton type="default">
              默认按钮
            </AButton>
            <AButton type="dashed">
              虚线按钮
            </AButton>
            <AButton type="link">
              链接按钮
            </AButton>
          </ASpace>
        </ACard>

        <!-- 颜色测试 -->
        <ACard title="主题颜色">
          <ASpace>
            <AButton type="primary">
              Primary
            </AButton>
            <AButton
              type="primary"
              danger
            >
              Danger
            </AButton>
            <ATag color="success">
              Success
            </ATag>
            <ATag color="warning">
              Warning
            </ATag>
            <ATag color="error">
              Error
            </ATag>
          </ASpace>
        </ACard>

        <!-- 表单组件 -->
        <ACard title="表单组件">
          <AForm layout="vertical">
            <AFormItem label="输入框">
              <AInput placeholder="请输入内容" />
            </AFormItem>
            <AFormItem label="选择器">
              <ASelect
                placeholder="请选择"
                :options="[
                  { label: '选项1', value: '1' },
                  { label: '选项2', value: '2' },
                ]"
              />
            </AFormItem>
            <AFormItem label="开关">
              <ASwitch />
            </AFormItem>
          </AForm>
        </ACard>

        <!-- Tabs 组件测试 -->
        <ACard title="选项卡组件">
          <ATabs>
            <ATabPane
              key="1"
              tab="选项卡 1"
            >
              <p>这是选项卡 1 的内容</p>
            </ATabPane>
            <ATabPane
              key="2"
              tab="选项卡 2"
            >
              <p>这是选项卡 2 的内容</p>
            </ATabPane>
            <ATabPane
              key="3"
              tab="选项卡 3"
            >
              <p>这是选项卡 3 的内容</p>
            </ATabPane>
          </ATabs>
        </ACard>
      </ASpace>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  padding: var(--spacing-xxl);
  min-height: 100vh;
  background: var(--color-bg-layout);
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--spacing-xxl);
  padding: var(--spacing-xxl);
  background: var(--color-bg-container);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md);
}

.page-description {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: var(--font-size-base);
}
</style>
