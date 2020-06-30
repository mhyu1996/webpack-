# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 打包效果
![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot1.jpg)

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot2.jpg)

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot3.jpg)

projectB 和 projectC 项目的打包同projectA
## 打包配置
1.	在config目录下新建build和 project脚本文件，
2.	在package.json中重新配置build，当执行npm run build projectA的时候，会执行config/build.js脚本
3.	在build.js中拿到 打包命令中的 项目名称，并写到project.js中(有了这个环境变量，就可以根据项目的需要来修改webpack的配置了)
4.	然后再继续执行打包流程。

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot4.jpg)

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot5.jpg)

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot6.jpg)

5.	在config目录下新建projectConfig脚本文件 获取project文件中拿到的项目名，并通过配置拿到想要打包的项目的文件夹名称

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot7.jpg)

6.	在webpack配置中引入projectConfig.js获取要打包项目的文件夹名
7.	使用webpack 的SplitChunks配置抽取代码，在test中动态拼接项目名的正则抽取当前要打包项目的代码(注意SplitChunks抽取出来的文件在压缩前的最小大小，默认为 30000,所以测试打包时，测试的项目大小尽量大于3000)
![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot8.jpg)

![image](https://github.com/mhyu1996/webpack-demo/blob/master/src/assets/screenshot9.jpg)

## END
到此，所有的配置完成，即可打包。
## 参考资料
1.webpack中文文档 https://www.webpackjs.com/concepts/
2. vue+webpack多个项目动态打包：https://www.jianshu.com/p/fa19a07b1496
3. webpack 4 Code Splitting 的 splitChunks 配置：https://imweb.io/topic/5b66dd601402769b60847149

