import type { MockMethod } from 'vite-plugin-mock'
import { errorResult, successResult } from '../_util'
import { menuList } from '../data/menu'

export default [
  // 获取菜单树
  {
    url: '/api/menu/tree',
    method: 'get',
    response: () => {
      return successResult(menuList)
    },
  },

  // 获取菜单列表
  {
    url: '/api/menu/list',
    method: 'get',
    response: ({ query }: any) => {
      const { name, status } = query

      let list = [...menuList]

      if (name) {
        list = list.filter(item => item.name.includes(name))
      }

      if (status !== undefined && status !== '') {
        list = list.filter(item => item.status === Number(status))
      }

      return successResult(list)
    },
  },

  // 获取菜单详情
  {
    url: '/api/menu/:id',
    method: 'get',
    response: ({ query }: any) => {
      const { id } = query

      function findMenu(menus: any[], menuId: string): any {
        for (const menu of menus) {
          if (menu.id === menuId) {
            return menu
          }
          if (menu.children) {
            const found = findMenu(menu.children, menuId)
            if (found)
              return found
          }
        }
        return null
      }

      const menu = findMenu(menuList, id)

      if (!menu) {
        return errorResult('菜单不存在', 404)
      }

      return successResult(menu)
    },
  },

  // 创建菜单
  {
    url: '/api/menu',
    method: 'post',
    response: ({ body }: any) => {
      const newMenu = {
        id: String(Date.now()),
        ...body,
      }

      menuList.push(newMenu)

      return successResult(newMenu, '创建成功')
    },
  },

  // 更新菜单
  {
    url: '/api/menu/:id',
    method: 'put',
    response: ({ query, body }: any) => {
      const { id } = query

      function findAndUpdate(menus: any[], menuId: string, data: any): boolean {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].id === menuId) {
            menus[i] = { ...menus[i], ...data }
            return true
          }
          if (menus[i].children) {
            if (findAndUpdate(menus[i].children, menuId, data)) {
              return true
            }
          }
        }
        return false
      }

      const updated = findAndUpdate(menuList, id, body)

      if (!updated) {
        return errorResult('菜单不存在', 404)
      }

      return successResult(null, '更新成功')
    },
  },

  // 删除菜单
  {
    url: '/api/menu/:id',
    method: 'delete',
    response: ({ query }: any) => {
      const { id } = query

      function findAndDelete(menus: any[], menuId: string): boolean {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].id === menuId) {
            menus.splice(i, 1)
            return true
          }
          if (menus[i].children) {
            if (findAndDelete(menus[i].children, menuId)) {
              return true
            }
          }
        }
        return false
      }

      const deleted = findAndDelete(menuList, id)

      if (!deleted) {
        return errorResult('菜单不存在', 404)
      }

      return successResult(null, '删除成功')
    },
  },
] as MockMethod[]
