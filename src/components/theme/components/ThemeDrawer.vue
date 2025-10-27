<script setup lang="ts">
import type { ThemeMode } from '../types'
import { useTheme } from '../composables'

interface Props {
  visible?: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const {
  isDark,
  themeConfig,
  currentPreset,
  setThemeMode,
  setThemePreset,
  resetTheme,
  getThemePresets,
} = useTheme()

const presets = getThemePresets()

function handleClose() {
  emit('update:visible', false)
}

function handleModeChange(mode: ThemeMode) {
  setThemeMode(mode)
}

function handlePresetChange(key: string) {
  setThemePreset(key)
}

function handleReset() {
  // eslint-disable-next-line no-alert -- User confirmation required for reset action
  if (window.confirm('确定要重置主题设置吗？')) {
    resetTheme()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="visible"
        class="drawer-overlay"
        @click="handleClose"
      >
        <div
          class="drawer-container"
          @click.stop
        >
          <!-- 头部 -->
          <div class="drawer-header">
            <h3 class="drawer-title">
              主题设置
            </h3>
            <button
              class="drawer-close"
              @click="handleClose"
            >
              ✕
            </button>
          </div>

          <!-- 内容 -->
          <div class="drawer-content">
            <!-- 主题模式 -->
            <section class="setting-section">
              <h4 class="section-title">
                主题模式
              </h4>
              <div class="mode-options">
                <button
                  class="mode-button"
                  :class="{ active: themeConfig.mode === 'light' }"
                  @click="handleModeChange('light')"
                >
                  <span class="mode-icon">☀️</span>
                  <span>亮色</span>
                </button>
                <button
                  class="mode-button"
                  :class="{ active: themeConfig.mode === 'dark' }"
                  @click="handleModeChange('dark')"
                >
                  <span class="mode-icon">🌙</span>
                  <span>暗色</span>
                </button>
                <button
                  class="mode-button"
                  :class="{ active: themeConfig.mode === 'auto' }"
                  @click="handleModeChange('auto')"
                >
                  <span class="mode-icon">🔄</span>
                  <span>自动</span>
                </button>
              </div>
              <p class="mode-hint">
                当前: {{ isDark ? '暗色模式' : '亮色模式' }}
              </p>
            </section>

            <!-- 主题预设 -->
            <section class="setting-section">
              <h4 class="section-title">
                主题预设
              </h4>
              <div class="preset-list">
                <button
                  v-for="preset in presets"
                  :key="preset.key"
                  class="preset-item"
                  :class="{ active: currentPreset.name === preset.name }"
                  @click="handlePresetChange(preset.key)"
                >
                  <div class="preset-colors">
                    <div
                      class="preset-color-dot"
                      :style="{ backgroundColor: preset.colors.primary }"
                    />
                    <div
                      class="preset-color-dot"
                      :style="{ backgroundColor: preset.colors.success }"
                    />
                    <div
                      class="preset-color-dot"
                      :style="{ backgroundColor: preset.colors.warning }"
                    />
                  </div>
                  <span class="preset-name">{{ preset.name }}</span>
                  <span
                    v-if="currentPreset.name === preset.name"
                    class="preset-check"
                  >✓</span>
                </button>
              </div>
            </section>

            <!-- 颜色预览 -->
            <section class="setting-section">
              <h4 class="section-title">
                当前主题颜色
              </h4>
              <div class="color-preview">
                <div class="color-preview-item">
                  <div class="color-preview-box bg-primary" />
                  <span>主色</span>
                </div>
                <div class="color-preview-item">
                  <div class="color-preview-box bg-success" />
                  <span>成功</span>
                </div>
                <div class="color-preview-item">
                  <div class="color-preview-box bg-warning" />
                  <span>警告</span>
                </div>
                <div class="color-preview-item">
                  <div class="color-preview-box bg-error" />
                  <span>错误</span>
                </div>
                <div class="color-preview-item">
                  <div class="color-preview-box bg-info" />
                  <span>信息</span>
                </div>
              </div>
            </section>
          </div>

          <!-- 底部 -->
          <div class="drawer-footer">
            <button
              class="reset-button"
              @click="handleReset"
            >
              重置设置
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-mask);
  z-index: var(--z-index-modal);
  display: flex;
  justify-content: flex-end;
}

.drawer-container {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: var(--color-bg-container);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-xxl);
  border-bottom: 1px solid var(--color-border-secondary);
}

.drawer-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.drawer-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--border-radius-base);
  color: var(--color-text-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);

  &:hover {
    background: var(--color-bg-spotlight);
    color: var(--color-text-primary);
  }
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-xxl);
}

.setting-section {
  margin-bottom: var(--spacing-xxxl);

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-lg);
}

.mode-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.mode-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg) var(--spacing-md);
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-base);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-text-primary);
    transform: translateY(-2px);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
}

.mode-icon {
  font-size: 24px;
}

.mode-hint {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  text-align: center;
}

.preset-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.preset-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);

  &:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }
}

.preset-colors {
  display: flex;
  gap: var(--spacing-xs);
}

.preset-color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
}

.preset-name {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: 500;
}

.preset-check {
  color: var(--color-primary);
  font-size: 18px;
  font-weight: bold;
}

.color-preview {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-md);
}

.color-preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);

  span {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}

.color-preview-box {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--border-radius-base);
  box-shadow: var(--shadow-sm);
}

.drawer-footer {
  padding: var(--spacing-lg) var(--spacing-xxl);
  border-top: 1px solid var(--color-border-secondary);
}

.reset-button {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--motion-duration-fast) var(--motion-ease-out);

  &:hover {
    border-color: var(--color-error);
    color: var(--color-error);
    background: var(--color-error-light);
  }
}

// 抽屉动画
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--motion-duration-base) var(--motion-ease-in-out);

  .drawer-container {
    transition: transform var(--motion-duration-base) var(--motion-ease-out);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .drawer-container {
    transform: translateX(100%);
  }
}

// 响应式
@media (max-width: 768px) {
  .drawer-container {
    max-width: 100%;
  }

  .color-preview {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
