
# input 调用不同keyboard

**完整**:
数字:
```html
<input type="number" min="0" inputmode="numeric" pattern="[0-9]*">
```

**Android**:
```html
<input type="number">
<input type="tel" />
<input type="numeric" />
```

**ios**:
```html
<input pattern="[0-9]*">
<!-- or -->
<input pattern="\d">
```


# other
- 关闭纠正 `autocorrect="off"`
- 首字母大写 autocapitalize="on"