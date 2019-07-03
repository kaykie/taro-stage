/**
 * Created by apple on 2018/12/4.
 */
import Taro, {Component} from '@tarojs/taro'
import {
  View,
  Text,
} from '@tarojs/components'
import {AtButton} from 'taro-ui'


class MyButton extends Component {

  getUserInfo(info) {
    if (this.props.onGetUserInfo)
      this.props.onGetUserInfo(info)
  }

  render() {
    let {label, type, size, loading, openType} = this.props;
    return (
      <View style={{margin: '10px 0'}}>
        <AtButton
          type={type || 'primary'}
          size={size || 'normal'}
          loading={loading || false}
          openType={openType}
          onGetUserInfo={this.getUserInfo.bind(this)}
        >
          {label || '保存'}
        </AtButton>
      </View>
    )
  }
}

export default MyButton
