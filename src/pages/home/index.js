import Taro, {Component} from '@tarojs/taro';
import './index.less';
import {connect} from '@tarojs/redux';
import {
  View,
  Text
} from '@tarojs/components';

@connect(
  state => ({
    data: state.store
  })
)
class Home extends Component {

  config = {
    navigationBarTitleText: '嘉宾人脸录入'
  };

  componentDidMount(){
  }

  render() {
    return (
      <View className='warp'>
        <Text>
          hello world
        </Text>
      </View>
    );
  }
}


export default Home;
