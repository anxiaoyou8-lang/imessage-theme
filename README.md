# iMessage Theme

适用于 SillyTavern 的界面美化扩展。提供米黄、暖黑两套配色，并调整聊天页、顶部导航和输入框布局。

已在 SillyTavern 1.16.0 上验证。扩展不需要构建步骤或额外的 Node 依赖。

## 通过 Git URL 安装

1. 在 SillyTavern 中打开 **扩展**，选择 **安装扩展**。
2. 在“输入扩展程序的 Git URL 以安装”中粘贴 `https://github.com/anxiaoyou8-lang/imessage-theme`。请填仓库地址，不要填单个文件或 ZIP 的地址。
3. 分支或标签留空，选择安装到当前用户，完成后刷新页面。

安装后，页面右上方的主题按钮可以在“米黄”和“暖黑”之间切换。选择保存在当前浏览器中。

## 更新

在 SillyTavern 的扩展管理中更新本扩展，然后刷新页面。若更新后仍显示旧样式，可强制刷新浏览器页面。

## 文件

- `manifest.json`：SillyTavern 扩展清单
- `index.js`：主题样式与页面交互
- `style.css`：主题按钮与输入栏样式
- `thread-behavior.js`：菜单与消息显示行为

主题会从 `fontsapi.zeoseven.com` 加载字体样式；如果该服务不可用，浏览器会使用本机后备字体。

## 许可

代码以 MIT 许可证发布，详见 `LICENSE`。

## 已知兼容性

本主题会修改 SillyTavern 的页面布局。与其他同样大幅修改聊天页或菜单的扩展同时使用时，显示效果可能不同。
