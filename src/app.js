import Taro, {Component} from '@tarojs/taro';
import Index from './pages/index';
import './app.less';
import zoro from '@opcjs/zoro';
import {Provider} from '@tarojs/redux';
import {createLoading} from '@opcjs/zoro-plugin';
import store from './model/store';

const app = zoro();
app.model(store); // 注册单个model或多个model,多个时为数组
app.use(createLoading()); // 注册多个插件,多个为数组
const appStore = app.start(false); // 启动并创建store,阻止默认初始化动作
class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/mine/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '位置',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#C5D9E8',
      selectedColor: '#fff',
      backgroundColor: '#0B0E14',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '主页',
          iconPath: 'assets/person_unselect.png',
          selectedIconPath: 'assets/person_select.png'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: 'assets/mine_unselect.png',
          selectedIconPath: 'assets/mine_select.png'
        }
      ]
    }
  };


  componentWillMount() {
    app.setup();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <View/>
    );
  }
}

Taro.render(
  <Provider store={appStore}>
    <App/>
  </Provider>
  , document.getElementById('app'));
