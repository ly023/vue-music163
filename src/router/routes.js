import INDEX from 'views/index'
import DISCOVER from 'views/discover'
import FRIEND from 'views/friend'
import DOWNLOAD from 'views/download'
import NotFoundComponent from 'views/404'
import App from '../App.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: App,
    redirect: '/discover',
    children: [
      {
        path: 'index',
        name: 'index',
        component: INDEX
      },
      {
        path: 'discover',
        name: 'discover',
        component: DISCOVER
      },
      {
        path: 'friend',
        name: 'friend',
        component: FRIEND
      },
      {
        path: 'download',
        name: 'download',
        component: DOWNLOAD
      },
      {
        path: ':\S+', // 动态参数路径，以冒号开头
        name: '404',
        component: NotFoundComponent,
        meta: {
          title: '404 - 网易云音乐'
        }
      }
    ]
  }
]

