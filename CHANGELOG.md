

## [0.8.1](https://github.com/ohbug-org/ohbug-dashboard/compare/0.8.0...0.8.1) (2022-09-08)


### Bug Fixes

* 修复 nextAuth 回调地址设置错误 ([0b4935d](https://github.com/ohbug-org/ohbug-dashboard/commit/0b4935d6cbc6952ba52d331f3860952da91e3a03))

# [0.8.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.7.2...0.8.0) (2022-09-07)


### Bug Fixes

* 完善 https 配置 ([3e985b8](https://github.com/ohbug-org/ohbug-dashboard/commit/3e985b883cb8193ff0394abe1cb236dffe1c6a5e))


### Features

* 支持 https ([a2f2bfa](https://github.com/ohbug-org/ohbug-dashboard/commit/a2f2bfae0dd9f46c8dcb7aa9558346e3bcee0f14))

## [0.7.2](https://github.com/ohbug-org/ohbug-dashboard/compare/0.7.1...0.7.2) (2022-09-05)


### Bug Fixes

* adapter sdk ([4b6554d](https://github.com/ohbug-org/ohbug-dashboard/commit/4b6554d71fbbfac9dea7ec44aa9b411da64faf44))
* **server:** sourceMap 上传使用队列 解决 release 重复创建 ([645cbec](https://github.com/ohbug-org/ohbug-dashboard/commit/645cbec99c1488001cda11f9511d217602a2a430))
* **server:** 优化 webhook 内容展示 ([31c44be](https://github.com/ohbug-org/ohbug-dashboard/commit/31c44be45f0bca99fea0dbe1f17e4ccfec82d375))
* **web:** fix issueList link error ([cefdeff](https://github.com/ohbug-org/ohbug-dashboard/commit/cefdeff79f6bf551664d88f649adaac4a6ad24f2))

## [0.7.1](https://github.com/ohbug-org/ohbug-dashboard/compare/0.7.0...0.7.1) (2022-09-02)

# [0.7.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.6.0...0.7.0) (2022-09-01)


### Features

* **web:** support delete issues ([b713c46](https://github.com/ohbug-org/ohbug-dashboard/commit/b713c46c26d03d04ce112e23fe5b89ce743c0e93))
* **web:** support delete release and sourceMaps ([4a42c66](https://github.com/ohbug-org/ohbug-dashboard/commit/4a42c66e6e85c51c907736eda9690d0cbaa77e2f))

# [0.6.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.5.0...0.6.0) (2022-08-31)


### Bug Fixes

* **server:** fixed logger problem ([48fadbe](https://github.com/ohbug-org/ohbug-dashboard/commit/48fadbe6f7b3db62eb07e955df2d454820bdb47d))


### Features

* add user page ([573ea2d](https://github.com/ohbug-org/ohbug-dashboard/commit/573ea2d96e5e0a276ab4a77e325279e50c8e02b9))

# [0.5.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.4.1...0.5.0) (2022-08-30)


### Bug Fixes

* **server:** remove cluster mode ([79ee80e](https://github.com/ohbug-org/ohbug-dashboard/commit/79ee80e153396fadf47817fe7c6270f6d14e25de))
* **web:** error stack visible problem ([f820135](https://github.com/ohbug-org/ohbug-dashboard/commit/f820135533c00dcd93976451611b808f020923cd))
* **web:** fix copy error ([c5d1340](https://github.com/ohbug-org/ohbug-dashboard/commit/c5d1340dbb7368cfaa639a193de8e7df52e2b0ce))


### Features

* **server:** delete expiration data regularly every day ([ffc77e6](https://github.com/ohbug-org/ohbug-dashboard/commit/ffc77e68a3079574181132f57e334c6bb466207b))
* **server:** update http error group fields ([e324e5c](https://github.com/ohbug-org/ohbug-dashboard/commit/e324e5cd23146f3890e79cb653142e04cf3d3d66))
* **server:** use nestjs-pino ([f8d8fb9](https://github.com/ohbug-org/ohbug-dashboard/commit/f8d8fb9e9624036b23a77659d81409ffec9fb6ae))
* **web:** issue support order ([e452838](https://github.com/ohbug-org/ohbug-dashboard/commit/e452838e68ef9fc1f2ed9b97513cdd030d808da5))
* **web:** nextLink passHref ([8666d51](https://github.com/ohbug-org/ohbug-dashboard/commit/8666d5187b75d23b21a66031e4c1032156f75a79))
* **web:** order findMany results ([562a040](https://github.com/ohbug-org/ohbug-dashboard/commit/562a040107fd5107d5b038ba1f346d8a1ae85aea))

## [0.4.1](https://github.com/ohbug-org/ohbug-dashboard/compare/0.4.0...0.4.1) (2022-08-26)


### Bug Fixes

* **server:** fix server too large body error ([835d493](https://github.com/ohbug-org/ohbug-dashboard/commit/835d49396298494209f8ecd22aa34078103f5c44))

# [0.4.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.3.2...0.4.0) (2022-08-24)


### Features

* **server:** report api return httpCode 204 ([cdd7b66](https://github.com/ohbug-org/ohbug-dashboard/commit/cdd7b662e2ca940041d7595fa66bae38d95d9de9))
* **server:** support cluster mode ([cb06054](https://github.com/ohbug-org/ohbug-dashboard/commit/cb06054e835b0641fed967b11e99edaafafc966d))
* **web:** hide project profile pv data ([e916e49](https://github.com/ohbug-org/ohbug-dashboard/commit/e916e49ea3c47224b7849a2856e0a4ee4b1ddced))
* **web:** project profile complete i18n ([b162f09](https://github.com/ohbug-org/ohbug-dashboard/commit/b162f09a68525c7a674d9e213ff064386d23b445))
* **web:** project profile support view path and referrer group data ([bac11ff](https://github.com/ohbug-org/ohbug-dashboard/commit/bac11ff177273b30237d44852f7b44253e2f5569))
* **web:** support credentials signin ([c2465c8](https://github.com/ohbug-org/ohbug-dashboard/commit/c2465c88e3b8bb36c3d3ae5c9a5ba2ae259eb9ce))

## [0.3.2](https://github.com/ohbug-org/ohbug-dashboard/compare/0.3.1...0.3.2) (2022-08-19)

## [0.3.1](https://github.com/ohbug-org/ohbug-dashboard/compare/0.3.0...0.3.1) (2022-08-18)


### Bug Fixes

* **web:** user error ([86409f0](https://github.com/ohbug-org/ohbug-dashboard/commit/86409f0d81eefbee15b2c440f5f133b230eaf35e))

# [0.3.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.2.0...0.3.0) (2022-08-18)


### Features

* **prisma:** drop useless column ([49e586c](https://github.com/ohbug-org/ohbug-dashboard/commit/49e586cf42236a565cfc339effc1d5f20d971c5b))


### Performance Improvements

* change user table ([c697710](https://github.com/ohbug-org/ohbug-dashboard/commit/c6977101e699aadf0d25a69ace339a577cb28b7a))

# [0.2.0](https://github.com/ohbug-org/ohbug-dashboard/compare/0.1.3...0.2.0) (2022-08-17)


### Bug Fixes

* **web:** eslint warning ([64881ef](https://github.com/ohbug-org/ohbug-dashboard/commit/64881ef14ba659cdc4262b9dc35dd63f4b14be3f))
* **web:** reload data after deps changed ([f4d7422](https://github.com/ohbug-org/ohbug-dashboard/commit/f4d742207f4918bc72bcc3b2d6dc313cdfc14b22))
* **web:** trendChart render ([f8a6c78](https://github.com/ohbug-org/ohbug-dashboard/commit/f8a6c785a0068b1242fb7cd87138f297ebfd2c72))


### Features

* **server:** store view data ([5a44d56](https://github.com/ohbug-org/ohbug-dashboard/commit/5a44d56a039b55255bb499626927d47bfcc0df32))
* **web:** add integration button ([76d54a6](https://github.com/ohbug-org/ohbug-dashboard/commit/76d54a60c2c612201ceefb81c0e4257cc9e8c87e))
* **web:** only error event support check raw json data ([12bad61](https://github.com/ohbug-org/ohbug-dashboard/commit/12bad61446fe782e8f0a2529a1d0cd1fa1779db3))
* **web:** simplify API Route ([82994d5](https://github.com/ohbug-org/ohbug-dashboard/commit/82994d5f29dd2fb9b837bd3d558429e1f7eaaecc))
* **web:** simplify trends api ([b646a75](https://github.com/ohbug-org/ohbug-dashboard/commit/b646a754ee0bd19d85851fd761e50f2f3bac9894))
* **web:** support check feedback detail ([de13466](https://github.com/ohbug-org/ohbug-dashboard/commit/de13466c94e6d75a60eea281d2bd68efdff34607))
* **web:** use nprogress ([3e63544](https://github.com/ohbug-org/ohbug-dashboard/commit/3e635445c8177b933f83003f29448526f943a924))

## [0.1.3](https://github.com/ohbug-org/ohbug-dashboard/compare/0.1.2...0.1.3) (2022-08-09)


### Bug Fixes

* **web:** next-auth warning ([cb721d2](https://github.com/ohbug-org/ohbug-dashboard/commit/cb721d20ede836a2b7952e3fff4d5d28a23f1ca9))

## [0.1.2](https://github.com/ohbug-org/ohbug-dashboard/compare/0.1.1...0.1.2) (2022-08-09)


### Bug Fixes

* **web:** nextjs middleware position error ([74f3bbf](https://github.com/ohbug-org/ohbug-dashboard/commit/74f3bbf219ca9927b37947608bab2d5cded39bb9))

## [0.1.1](https://github.com/ohbug-org/ohbug-dashboard/compare/0.1.0...0.1.1) (2022-08-09)


### Bug Fixes

* **web:** ts error ([46e6ed4](https://github.com/ohbug-org/ohbug-dashboard/commit/46e6ed474338805dcb542a355112a49b2ec6e1f6))

# 0.1.0 (2022-08-09)


### Bug Fixes

* **docker:** docker-compose 环境变量从 .env 读取 ([c2a312b](https://github.com/ohbug-org/ohbug-dashboard/commit/c2a312b8deb9e7057abc774ebeaa8436485b3441))
* **docker:** 修复 docker arm 架构构建报错 ([d6e7aea](https://github.com/ohbug-org/ohbug-dashboard/commit/d6e7aea47597a3364163e764041aff1eb4ed2447))
* **docker:** 调整 dockerfile ([6ac4ca8](https://github.com/ohbug-org/ohbug-dashboard/commit/6ac4ca8d7fbf39481b52e58042416810a8ec5320))
* fixed dockerfile ([7d42019](https://github.com/ohbug-org/ohbug-dashboard/commit/7d4201956825f35806e36a195e46314f8a02266e))
* **prisma:** 修复 createdAt 数据类型 ([bb7249e](https://github.com/ohbug-org/ohbug-dashboard/commit/bb7249efd002aa2127fdc7081df85b1208e980e9))
* **server:** 修复 alert interval 生效逻辑问题 ([7e2036a](https://github.com/ohbug-org/ohbug-dashboard/commit/7e2036a64c08a29eff1f6d1f759207a426118258))
* **web:** get issues trends error ([c995642](https://github.com/ohbug-org/ohbug-dashboard/commit/c995642d8396fc035db19ba3d0bc6583e61cf4fb))
* **web:** menu list zindex 调整 ([65883f3](https://github.com/ohbug-org/ohbug-dashboard/commit/65883f3f8fe8e828a64fe25f1782d33f25837141))
* **web:** ohbug.config 加入 url 配置 ([d5cc2e2](https://github.com/ohbug-org/ohbug-dashboard/commit/d5cc2e2531e622fa5da475058889b90487839425))
* **web:** project profile 默认跳转 ([9912b82](https://github.com/ohbug-org/ohbug-dashboard/commit/9912b822e2eb091273a42cdfb774bd8b97bfa224))
* **web:** 修复 event 创建 issue updatedAt 不更新 ([cf3b003](https://github.com/ohbug-org/ohbug-dashboard/commit/cf3b00380258761e147d68cb83cb63b17a33f72a))
* **web:** 修复 nextjs warning ([3d9fa88](https://github.com/ohbug-org/ohbug-dashboard/commit/3d9fa8833b048ec4f77413bb9101d7e434c98196))
* **web:** 修正 ip 地址显示 ([3308ce8](https://github.com/ohbug-org/ohbug-dashboard/commit/3308ce841b209329c305fe8937e48adc2385a8f6))


### Features

* add package server ([9cd7e14](https://github.com/ohbug-org/ohbug-dashboard/commit/9cd7e14b940016f2058f3145cf3c1c671b3a87e2))
* **docker:** complete docker deployment ([4752bbe](https://github.com/ohbug-org/ohbug-dashboard/commit/4752bbe365a4cafa022ee0a4f325e37e2c6ead17))
* **docker:** use default node image ([c41c960](https://github.com/ohbug-org/ohbug-dashboard/commit/c41c960db1fffb091fc034b3e2bb478d19a68b3f))
* **docker:** 调整启动方式 使用 yml 配置文件 ([1122cb8](https://github.com/ohbug-org/ohbug-dashboard/commit/1122cb874c0acfc1bd4427077c20b0992d70a778))
* init ([ceaad0b](https://github.com/ohbug-org/ohbug-dashboard/commit/ceaad0b0d6d64edf06dff583cdd63fc44b57805a))
* **prisma:** create index ([fb75c8d](https://github.com/ohbug-org/ohbug-dashboard/commit/fb75c8d779cd9614b5db84a69a0c8e013ecea8c6))
* remix 迁移至 next ([3fcf53a](https://github.com/ohbug-org/ohbug-dashboard/commit/3fcf53acfd37faf899b5efb6245f56da92cdb873))
* **server:**  完成sourceMap上传 ([a0b6f83](https://github.com/ohbug-org/ohbug-dashboard/commit/a0b6f83338bd41fcbc5f76b87ba8322762e261da))
* **server:** event 上报加入 apiKey 校验 ([223d50b](https://github.com/ohbug-org/ohbug-dashboard/commit/223d50bbfdd1fa4a934d78a7cc0a7c4b3818a5d6))
* **server:** store metric data ([9a73089](https://github.com/ohbug-org/ohbug-dashboard/commit/9a73089c100a041047b4bc017477e25cb08637d5))
* **server:** 使用 postgresql 存储 event ([93cd770](https://github.com/ohbug-org/ohbug-dashboard/commit/93cd77068404540167664a82949f14b749f347d5))
* **server:** 完成 event/issue 存储 ([b856d6d](https://github.com/ohbug-org/ohbug-dashboard/commit/b856d6d9bc7ab9c1ec8b5c982b0a1a1707f92346))
* **server:** 完成 event/issue/user 表 ([7fe6b2a](https://github.com/ohbug-org/ohbug-dashboard/commit/7fe6b2a22ac4e3824b2ad91cd2148714e7792c40))
* **server:** 对接 clickhouse ([da409af](https://github.com/ohbug-org/ohbug-dashboard/commit/da409afd985c3346c2c17d696b6e73da9583092f))
* **server:** 简化 config 获取流程 ([8b568cd](https://github.com/ohbug-org/ohbug-dashboard/commit/8b568cdd758bb120fb89b79d5bf76d434e7d8789))
* support report and preview feedback ([a8e5114](https://github.com/ohbug-org/ohbug-dashboard/commit/a8e511483b6c740b639981e4596372b2867da845))
* update deps and adapter prisma4 ([c670382](https://github.com/ohbug-org/ohbug-dashboard/commit/c670382820740ccb9b2b3dc7bf049c34f4c96e09))
* **web:** add empty issues view ([6e1bfd7](https://github.com/ohbug-org/ohbug-dashboard/commit/6e1bfd76c2e5705c7e4e4cca6dddbfe110fd70df))
* **web:** add get apikey tips ([b058670](https://github.com/ohbug-org/ohbug-dashboard/commit/b058670994354aaeae0045d00cb4963d98288428))
* **web:** add metrics integration guide ([a6ba9f2](https://github.com/ohbug-org/ohbug-dashboard/commit/a6ba9f2d5c9e98a862e8c1eb610ef554d1f81515))
* **web:** add nextauth middleware ([c5bef8d](https://github.com/ohbug-org/ohbug-dashboard/commit/c5bef8d7e2db30db73efab954214d2b27a83296b))
* **web:** add title to metric page ([2e3ab1c](https://github.com/ohbug-org/ohbug-dashboard/commit/2e3ab1c0882340745516ecb4005ebf7e8c3fdc88))
* **web:** card 组件 hover default false ([a364944](https://github.com/ohbug-org/ohbug-dashboard/commit/a364944ff7b323599df6c69674bffdb2d1d8f2da))
* **web:** dashboard support metrics ([a30953e](https://github.com/ohbug-org/ohbug-dashboard/commit/a30953e85f0150b4ba28788fdae57dc2b1d4f249))
* **web:** finish dark mode ([55186c4](https://github.com/ohbug-org/ohbug-dashboard/commit/55186c4321f80db13214b302f5917d5defe7f966))
* **web:** finish invite members ([9442246](https://github.com/ohbug-org/ohbug-dashboard/commit/94422469b8ad67bb1c29374b6c458dae0a509f4e))
* **web:** finish issues search ([bffc457](https://github.com/ohbug-org/ohbug-dashboard/commit/bffc45774ffb8278c25a27d780c9fbdf5a054070))
* **web:** index 增加 create project 按钮 ([c762ab3](https://github.com/ohbug-org/ohbug-dashboard/commit/c762ab3e31f717ba4ef9be528388d0d16e608b2c))
* **web:** issue detail trends 样式调整 ([c3a6c69](https://github.com/ohbug-org/ohbug-dashboard/commit/c3a6c697942c9ec799992d109d3ec9ed42d19d75))
* **web:** issue detail 页面加入 breadcrumb ([22e061e](https://github.com/ohbug-org/ohbug-dashboard/commit/22e061ec318e7d3d2d9ad550ec0fb53578c4ab2e))
* **web:** issue detail 页面样式调整 ([f934f78](https://github.com/ohbug-org/ohbug-dashboard/commit/f934f7839c9358acd8af4402b3b355fffb0885f9))
* **web:** issue events 页面样式调整 ([8a35b52](https://github.com/ohbug-org/ohbug-dashboard/commit/8a35b5220f9f9317bf68ab8dd06f48d8ddd83f78))
* **web:** issues 列表展示 events users 数量 ([0bfd469](https://github.com/ohbug-org/ohbug-dashboard/commit/0bfd469cbf56a5623d38b425ec882285e2cae46b))
* **web:** navMenu 加入 settings 路由 ([590fed3](https://github.com/ohbug-org/ohbug-dashboard/commit/590fed38e6d1fdea142767bde6bf56d970c39be3))
* **web:** project 切换同时切换当前路由 ([851ef66](https://github.com/ohbug-org/ohbug-dashboard/commit/851ef66ed5eaefc59358fcc771f4f85907b8105d))
* **web:** projects 根据 用户查询 ([9700c35](https://github.com/ohbug-org/ohbug-dashboard/commit/9700c357effd58afa766edf59b97840dccf43140))
* **web:** projects 页面查询 project trends ([6574676](https://github.com/ohbug-org/ohbug-dashboard/commit/6574676c8ac81dbdc4c80072269f1f3da5a64593))
* **web:** read config from ohbug.config.yml ([dc1610f](https://github.com/ohbug-org/ohbug-dashboard/commit/dc1610f5aa2bf203311fb87b51671d83c356e293))
* **web:** redirect create-project if user not has project ([e594318](https://github.com/ohbug-org/ohbug-dashboard/commit/e5943189642078f1eb1f50b798c16122d842e7ee))
* **web:** redirect index if already signin ([0fd6708](https://github.com/ohbug-org/ohbug-dashboard/commit/0fd670839df0fbf857fb8fababf35d8c39d72a46))
* **web:** redirect to signin when not have authorization ([e7a770d](https://github.com/ohbug-org/ohbug-dashboard/commit/e7a770dc4416e7f55068f27aa36334dbcda9e4be))
* **web:** scroll navmenu logo click scroll to top ([1997561](https://github.com/ohbug-org/ohbug-dashboard/commit/19975611ffc5552032b84bf9a61e2928836e9e72))
* **web:** support delete alert ([67d897a](https://github.com/ohbug-org/ohbug-dashboard/commit/67d897a02130c97c3ba258eb64c7c17340ac2a67))
* **web:** support i18n ([01cde98](https://github.com/ohbug-org/ohbug-dashboard/commit/01cde984a573a7b6c9255fd88f265aa25916ca89))
* **web:** support preview custom metadata ([ba4249e](https://github.com/ohbug-org/ohbug-dashboard/commit/ba4249e0d3de6188e656b14af6436cbb81771d9d))
* **web:** support version detection and upgrade prompt ([d31b56e](https://github.com/ohbug-org/ohbug-dashboard/commit/d31b56ee85a9122893a4f5a2bd27077a38cd7268))
* **web:** themeBox 加入 acrylic props ([5f68b96](https://github.com/ohbug-org/ohbug-dashboard/commit/5f68b967006d26f5a1200f0c05761999f59d2c09))
* **web:** trendChart 展示 loading 状态 ([bbc1de5](https://github.com/ohbug-org/ohbug-dashboard/commit/bbc1de525a02f1073628144f7f2c3d57eff59425))
* **web:** 主题样式微调 ([40fa5df](https://github.com/ohbug-org/ohbug-dashboard/commit/40fa5dfb4b9ad529e0719cacdf2a3792bf49b270))
* **web:** 优化 issue detail 页面 减少非必要查询 ([786532e](https://github.com/ohbug-org/ohbug-dashboard/commit/786532e810f28309d4ba38a565eacd0b9de8ecfe))
* **web:** 优化 issueList 样式 ([ae787c6](https://github.com/ohbug-org/ohbug-dashboard/commit/ae787c6af3111f15b12635f9636c0da138c60945))
* **web:** 使用 next auth 登录页面 ([9e0ce8c](https://github.com/ohbug-org/ohbug-dashboard/commit/9e0ce8c2bb6a52bd6a99bb0705ecc99e8b6a5961))
* **web:** 使用 react-icons 作为图标库 ([a613654](https://github.com/ohbug-org/ohbug-dashboard/commit/a613654b0a0949f25ecb36d800de69a77ec1b08b))
* **web:** 加入 projects 页面 ([9cc87ea](https://github.com/ohbug-org/ohbug-dashboard/commit/9cc87ead269a080e6140761732a1e0bdad6aab4e))
* **web:** 加入 searchBar 组件 ([df71220](https://github.com/ohbug-org/ohbug-dashboard/commit/df712201072141ab55a98761a3891ebbbca1d7b7))
* **web:** 加入权限验证 ([fd62e15](https://github.com/ohbug-org/ohbug-dashboard/commit/fd62e1559e703cc26dd3adbb74e54e7d5f9af828))
* **web:** 完善 project card 数据展示 ([032d2bc](https://github.com/ohbug-org/ohbug-dashboard/commit/032d2bc7440485c7783367d46ad31a78cf1d8823))
* **web:** 完成 footer ([0abe255](https://github.com/ohbug-org/ohbug-dashboard/commit/0abe255de49046cbf023fae0c1a9229e8995721f))
* **web:** 完成 issue detail 更多事件页面 ([e248a90](https://github.com/ohbug-org/ohbug-dashboard/commit/e248a90b02326da7d1b91f0db09fa32331243442))
* **web:** 完成 issue detail 页面 堆栈信息展示 ([666a341](https://github.com/ohbug-org/ohbug-dashboard/commit/666a34157eb88c26800b068af8e9011867cde425))
* **web:** 完成 issue detail 页面标签列展示 ([534d0f0](https://github.com/ohbug-org/ohbug-dashboard/commit/534d0f0f6c9c1d4e1a7d541c3da6d5d61fe004c2))
* **web:** 完成 issue detail 页面趋势信息展示 ([d913d3e](https://github.com/ohbug-org/ohbug-dashboard/commit/d913d3e175441d7ffbef858470f34dd3e99b744b))
* **web:** 完成 issue list 分页 ([fb502de](https://github.com/ohbug-org/ohbug-dashboard/commit/fb502de812eed29a84fe1b34e7648e1391f17dbd))
* **web:** 完成 issue trends 数据查询与展示 ([42d55e9](https://github.com/ohbug-org/ohbug-dashboard/commit/42d55e9a40cb8b1276d3bd338ace8cf66a213149))
* **web:** 完成 navMenu 部分 ([779399d](https://github.com/ohbug-org/ohbug-dashboard/commit/779399d5348b3308559e1f876c7c6c6fbbd750a4))
* **web:** 完成 project setting apiKey 展示 ([a5e2cf8](https://github.com/ohbug-org/ohbug-dashboard/commit/a5e2cf8f5137769238e3493f1933b16f6b277c99))
* **web:** 完成 project setting update name ([cdad8bc](https://github.com/ohbug-org/ohbug-dashboard/commit/cdad8bcb688f8b02b8c9c6c05816df0aaa3331bd))
* **web:** 完成 project trends chart 显示 ([73c263f](https://github.com/ohbug-org/ohbug-dashboard/commit/73c263f6c3c7aedda41ee4f32332a38bb14b8217))
* **web:** 完成 project 的创建 ([9765988](https://github.com/ohbug-org/ohbug-dashboard/commit/9765988b2a068ed03fa6470f4977c0df5b28baa5))
* **web:** 完成 project 预览页面 ([ca5900f](https://github.com/ohbug-org/ohbug-dashboard/commit/ca5900f6f3b908d02cc9a1a15bb00ef60161ff7b))
* **web:** 完成 release list 和 sourceMaps 页面 ([ad881e0](https://github.com/ohbug-org/ohbug-dashboard/commit/ad881e0a82f6ea653e6c117c5c3acdcc9ce410c5))
* **web:** 完成 user 组件以及 nav 基本布局 ([93f066f](https://github.com/ohbug-org/ohbug-dashboard/commit/93f066f32f7a78471c79b94bb7a879ee341bb9a4))
* **web:** 完成layout布局 包含 nav navMenu user 等组件 ([353466a](https://github.com/ohbug-org/ohbug-dashboard/commit/353466a7b344edd03f02c9d72985e0c79d9503e1))
* **web:** 完成授权登录流程 ([d26286d](https://github.com/ohbug-org/ohbug-dashboard/commit/d26286d575a93469ccd6e3cb6327590d95b5a5a0))
* **web:** 对接 ohbug-extension-rrweb ([6a63f7f](https://github.com/ohbug-org/ohbug-dashboard/commit/6a63f7f56463765cf5e31d2e1fd2fd17cf998bca))
* **web:** 整体迁移至 chakra-ui ([8a2ff2c](https://github.com/ohbug-org/ohbug-dashboard/commit/8a2ff2c2e5b7a0302713d98c2963b47c4ae5c154))
* **web:** 新增 alert detail 页面 ([036eff0](https://github.com/ohbug-org/ohbug-dashboard/commit/036eff01b39942b7bec74578641eb86ef0a2be79))
* **web:** 新增 issues 页面 ([4c4c157](https://github.com/ohbug-org/ohbug-dashboard/commit/4c4c157adf71082ad9786c9f9285a37a5c28e174))
* **web:** 暂时删除 release detail 页 ([60079f4](https://github.com/ohbug-org/ohbug-dashboard/commit/60079f41d4ad160b0547872174a3b7f4553fced1))
* **web:** 调整 issue tabs 样式 ([52fc349](https://github.com/ohbug-org/ohbug-dashboard/commit/52fc3499e03b4752d566da4d12b0c5f5c81bcf8f))
* **web:** 调整 prisma client 获取方式 ([5d7f293](https://github.com/ohbug-org/ohbug-dashboard/commit/5d7f293a99da8ec9df780675858a9a81f057ca41))
* **web:** 部分页面布局更新 使用 wrapper ([c295cf6](https://github.com/ohbug-org/ohbug-dashboard/commit/c295cf6baaf10f5f6eee28b3e8f1b300f877252e))
* 准备 issue 趋势图数据 ([d0f8c35](https://github.com/ohbug-org/ohbug-dashboard/commit/d0f8c35f5231f96dd41f73c659b219b7139548ad))
* 加入 issue 详情页 ([326939a](https://github.com/ohbug-org/ohbug-dashboard/commit/326939ad6f5675d3dedd6e42772afb9368377da0))
* 完成 issues 列表基本展示 ([b5dc389](https://github.com/ohbug-org/ohbug-dashboard/commit/b5dc389470e9b92dc77ee02c618feb04ab29b9c4))
* 完成 sourceMap 还原代码 ([8c4bbbd](https://github.com/ohbug-org/ohbug-dashboard/commit/8c4bbbd43fa3009b733043cb2c4c3a508d88681a))
* 完成基本环境配置、环境变量配置 ([3e36937](https://github.com/ohbug-org/ohbug-dashboard/commit/3e369373fde805ce760ff8837de63f81a402fc37))
* 完成通知逻辑 ([d4f5a93](https://github.com/ohbug-org/ohbug-dashboard/commit/d4f5a9309d821b7edf83981ae525f2ca7ddc1d80))
* 新增 email 登录方式 ([e713ca9](https://github.com/ohbug-org/ohbug-dashboard/commit/e713ca9c51d7e607b30ccd8fec15bb2bcb7ead68))
* 路由调整为以 project 为基础 ([db3d9f2](https://github.com/ohbug-org/ohbug-dashboard/commit/db3d9f28ecf518496ba532d76c33a67821f98be1))


### Performance Improvements

* **server:** 优化 report 接口资源占用 ([f84667b](https://github.com/ohbug-org/ohbug-dashboard/commit/f84667b065f229bfefde3fb661c370d15a36058f))