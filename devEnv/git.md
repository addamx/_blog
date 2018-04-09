# 

# 代码回滚
[代码回滚：Reset、Checkout、Revert 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert-%E7%9A%84%E9%80%89%E6%8B%A9)
提交层面: 已经有commit; 文件层面: 修改但未commit;

| 命令         | 作用域   | 常用情景                           |
|--------------|----------|------------------------------------|
| git reset    | 提交层面 | 在私有分支上舍弃一些没有提交的更改 |
| git reset    | 文件层面 | 将文件从缓存区中移除               |
| git checkout | 提交层面 | 切换分支或查看旧版本               |
| git checkout | 文件层面 | 舍弃工作目录中的更改               |
| git revert   | 提交层面 | 在公共分支上回滚更改               |
| git revert   | 文件层面 | （然而并没有）                     |

`git stash` #把所有没有提交的修改暂存到stash里面。可用git stash pop回复。
`git reset --hard HASH` #返回到某个节点，不保留修改。
`git reset --soft HASH` #返回到某个节点。保留修改
