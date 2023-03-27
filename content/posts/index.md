---
title: Test Page
date: 2023-03-27T07:02:23.050Z
---
# Online Editor

基于 JAM Stack 的方案，通过编写 md 文件来实现资讯的创建编辑。

## 任务背景介绍

官网的 CMS 功能我们选用了基于 JAM Stack 的方案，内容团队通过编写 md 文件来实现资讯的创建编辑工作。为了提高内容团队的 editing 体验，我们计划提供一个 md 文件的在线实时 edit 和 preview 的功能。

## 任务拆解

1. 通过使用 gatsby.js 作为主要 framework，通过使用 mdx 的 plugin 创建一个资讯展示功能的 gatsby web app （默认 SSG 生成，使用 GraphQL 加载数据），其可以扫描项目内指定文件夹内的 md 文件，并渲染和展示出这些内容；
2. 实现一种可以实时编辑、且可以预览 md 文件的功能；
3. 使用 material ui 的 styled-components 方式，实现比较简单的页面和按钮样式效果；
4. 使用 i18next 简要实现全局语言切换功能；
