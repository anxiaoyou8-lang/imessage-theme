# iMessage Theme

适用于 SillyTavern 的界面美化扩展。提供米黄、暖黑两套配色，并调整聊天页、顶部导航和输入框布局。支持手机竖屏和横屏。

已在 SillyTavern 1.16.0 上验证。扩展不需要构建步骤或额外的 Node 依赖。

## 通过 Git URL 安装

1. 在 SillyTavern 中打开 **扩展**，选择 **安装扩展**。
2. 在“输入扩展程序的 Git URL 以安装”中粘贴 `https://github.com/anxiaoyou8-lang/imessage-theme`。请填仓库地址，不要填单个文件或 ZIP 的地址。
3. 分支或标签留空，选择安装到当前用户，完成后刷新页面。

安装后，页面右上方的主题按钮可以在“米黄”和“暖黑”之间切换。选择保存在当前浏览器中。

在手机上，加号菜单通过“操作 / 扩展 / 快捷回复”分类切换；较矮的横屏中，顶部导航可以上下滚动。

## 调整文字大小

打开右上角的“…”菜单，选择 **Aa 文字大小**。可以分别调整聊天文字、输入框文字和顶部菜单文字，也可以恢复默认。设置保存在当前浏览器，刷新页面后仍会生效。

## 与用户设置中的自定义 CSS 共用

扩展样式会排在 SillyTavern 的“用户设置 → 自定义 CSS”之前；切换米黄或暖黑时也保持这个顺序。建议在自定义 CSS 中通过以下变量调整主题，避免重复覆盖布局选择器：

```css
:root {
  --xiaoyou-message-font-size: 18px;
  --xiaoyou-input-font-size: 17px;
  --xiaoyou-ui-font-size: 15px;
  /* 可选：--xiaoyou-page、--xiaoyou-text、--xiaoyou-bot、--xiaoyou-clay */
}
```

自定义 CSS 中的这些变量优先于文字大小面板；清除对应变量后，面板设置会重新生效。布局相关的自定义规则如果与本主题同时修改同一元素的位置、宽度或显示方式，仍可能重叠或错位；请删除冲突规则或按需要单独覆盖。

## 更新

在 SillyTavern 的扩展管理中更新本扩展，然后刷新页面。若更新后仍显示旧样式，可强制刷新浏览器页面。

## 文件

- `manifest.json`：SillyTavern 扩展清单
- `index.js`：主题样式与页面交互
- `style.css`：主题按钮与输入栏样式
- `mobile.css`：手机竖屏、横屏布局和菜单适配
- `thread-behavior.js`：菜单与消息显示行为

主题会从 `fontsapi.zeoseven.com` 加载字体样式；如果该服务不可用，浏览器会使用本机后备字体。

## 许可

代码以 MIT 许可证发布，详见 `LICENSE`。

## 已知兼容性

本主题会修改 SillyTavern 的页面布局。与其他同样大幅修改聊天页或菜单的扩展，或同类自定义 CSS 同时使用时，显示效果可能不同。
