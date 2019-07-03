import PublicService from '../service/PubliceService';
import Taro from '@tarojs/taro';

export default {
  namespace: 'store',

  state: {},

  effects: {
    async getUnionId({payload}, {put}) {
      // let unionIdParams = await select(state => state.unionIdParams);
      // const params = {...payload, ...unionIdParams};
      // console.log(params + 'unionId参数');
      // service.addUnionId(params)
      //   .then(res => {
      //     console.log(res)
      //   })
    },

    save({payload}, {put}) {
      let obj = PublicService.deepClone(payload);
      put({type: 'saveInfo', payload: {...obj}});
    }

  },

  reducers: {
    saveInfo({payload}, state) {
      console.log(payload, 'reduce');
      return {...state, ...payload};
    }
  }

};
