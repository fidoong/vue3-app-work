/**
 * 下拉选项 Mock 接口
 */
import { createMock, successResponse } from '../core'

// 省市区数据
const provinces = ['北京市', '上海市', '广东省', '浙江省', '江苏省', '四川省']
const cities: Record<string, string[]> = {
  北京市: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区'],
  上海市: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区'],
  广东省: ['广州市', '深圳市', '珠海市', '东莞市', '佛山市'],
  浙江省: ['杭州市', '宁波市', '温州市', '绍兴市', '嘉兴市'],
  江苏省: ['南京市', '苏州市', '无锡市', '常州市', '南通市'],
  四川省: ['成都市', '绵阳市', '德阳市', '南充市', '宜宾市'],
}

export default [
  // 获取省份列表
  createMock('/api/option/provinces', 'get', () => {
    return successResponse(
      provinces.map((name, index) => ({
        label: name,
        value: index + 1,
      })),
    )
  }),

  // 获取城市列表
  createMock('/api/option/cities', 'get', (req: any) => {
    const url = new URL(req.url, 'http://localhost')
    const province = url.searchParams.get('province')

    if (!province) {
      return successResponse([])
    }

    const cityList = cities[province] || []
    return successResponse(
      cityList.map((name, index) => ({
        label: name,
        value: index + 1,
      })),
    )
  }),
]
