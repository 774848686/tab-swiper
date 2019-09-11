# lhdNavbar
cms后台系统的公用header组件

### 插件的安装
#### NPM 
```
npm i lhdnavbar
```
#### 引入插件
```
import Vue from 'vue';
import lhdNavbar from 'lhdnavbar';

Vue.use(lhdNavbar);
```

#### 基本用法  
```html
<lhd-navbar 
    :menuData="menuData" 
    :menuStyle='menuStyle'
    @navbarChange='navbarChange'>
</lhd-navbar>
```

### API  
| 参数 | 说明 | 类型  |  
| - | :- | :- | :-: |  
| menuData | 要传入的tab数组 | Array |  
| menuStyle | 样式对象| Object | 
| navbarChange | tab change监听事件 | Function |

