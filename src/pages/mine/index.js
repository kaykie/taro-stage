import Taro,{Component} from '@tarojs/taro'
import {
  View,
  Text,
  Image,
} from '@tarojs/components'
import {
  AtList,
  AtListItem
} from 'taro-ui'
import './index.less'
import {connect} from '@tarojs/redux'

@connect(
  state =>({
    data:state.store
  })
)
class Mine extends Component{

  config = {
    navigationBarTitleText:'我的'
  };


  render(){
    return(
      <View className='warp mine'>
        <Text>
          个人中心
        </Text>
      </View>
    )
  }
}



export default Mine

