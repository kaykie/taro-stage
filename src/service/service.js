import request from '../utils/request';
import PublicService from './PubliceService';

const headers = {
  userType: 'enterprise',
  'Content-Type': 'application/json',
};

export default {
  getMemberInfo(params) {
    let data = {...params};
    // let encodeData = PublicService.paramSerializer(data);
    return request({
      url: 'https://saastest3.ys7.com/api/user/member/login/info',
      data,
      headers: {
        ...headers,
      },
      method: 'POST',
    });
  }
};

