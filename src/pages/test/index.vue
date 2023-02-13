<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-10 09:36:24
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-13 14:17:19
 * @Description:
-->
<script setup lang='ts'>
const showStudentBottomPop = ref(false)
function handleShowBottomPop() {
  showStudentBottomPop.value = !showStudentBottomPop.value
}
function handleCloseBottomPop() {
  showStudentBottomPop.value = false
}
const showStudentLeftPop = ref(false)
function handleShowLeftPop() {
  showStudentLeftPop.value = !showStudentBottomPop.value
}
function handleCloseLeftPop() {
  showStudentLeftPop.value = false
}
const mineGridList = [
  // {
  //   img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/my-course.png',
  //   title: '课程中心',
  //   src: 'courseCenter',
  //   id: 1
  // },
  {
    img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/my-circle.png',
    title: '我的圈子',
    src: 'myCircle',
    id: 1,
  },
  // {
  //   img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/bind-child.png',
  //   title: '关联孩子',
  //   src: 'bindIdentity',
  //   id: 2
  // },
  // {
  //   img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/put-card.png',
  //   title: '打卡日记',
  //   src: 'myPutCardDairy',
  //   id: 4
  // },
  {
    img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/create-circle.png',
    title: '创建圈子',
    src: 'editCircle',
    id: 3,
  },
  {
    img:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAABGCAYAAACUsCfoAAAE1ElEQVR4Xu2aW2hcVRSG/zWXpsbG1Eu9ouiDoCgqbelUk0zmzEy8pbZGbbSVCt6KqKgPiiD4KHh5USEgXkBEQprY2po2apK5J5ralgpSCT5pQam0XtrEEJOZWXLO1MS5ZdaZbmE2Z87r+fe/1rf/fQ4znEVw6EUO5UYd3GnJ1xOvJ+6QHagfdYcEvYBZT1xV4ty/2Y1zjz0DwqMAXw3Qsiq90wB+AON9/JF6m7qRqdKn5DKliXM/3DjfvwvMG1U2CdAgfk92qYRXCz7qfxbAm2qhF9yeo3DyLVXeqsG/B3CtqubyffgIhVPXq/JWCx7xzwHkVdVcgc8shRJnqfJWCz7qPwqiy1U1V+DzI4USV6nyrgqc97Q00abxqcImOOJ/A6DnVTWX58N4ncKJF4tqlumlUg+2wDkWWA7Gx2AcplD8laImRtY0w9U0AeCaSoVt3SdMIjO1njoOnSyqGW1/GVncADdtIyM+K/W1Bx41dgDoBrMJvrpUER5qW4UGTw8IXQA80kZK6hgZEHaC+Cky4idK1osahwHcBOI+MuJbpPXE4BwLbADT4IIxsUFGPF6uEI+Em+HOXHkG8GkQ/0RG/M+yNSL+IMgdWbyf6aRgckgCLwePGnsB6lw05W9xzql1tPbQvKSQag0fXOPFqeYDAG5c8GYMUigq+vFkAzz4G4Dz8gCIe8iIPa0aSuLH0VAPwE8WaE9QMLpKsl4OHgtxaUN+FYHoS0Qoc1/ShlzDDEIs9BoILxStYmQpGHFL3GyAh8uDEYaRyT5CoejPkqLVani441J4+V0A/3nk8t3IGBUxiUSmNceWAM/VngbwDjjzIQVjR6qFK/Pmvg7keRjMT4Bw9lLe6sHjHfKjTPgFjEkA5hu52r+T5pFdefq3/yXSjaTAiChMkchKPH6rHFza5f+go8CwiEkkcjZ44jY9Em//UhSmSGQlnrhdE/AvREwiUQ78Dk3APxcxiUQWeFITcL9y8Dv1SNw/JApTJMol3qkJ+D4Rk0hkgac26AHetlfEJBKZ4NnUXVqAu9oGRUwikbPBxzbqkXjrZ6IwRSIr8bFNmoDvETGJRDnwuzUB3y1iEoks8HFNwFuUg3fpkXjLp6IwRaJc4vdoAr5LxCQSWeBf3asH+C07RUwikcPB79Mk8U9EYYpEVuJfb9YD/OYBEZNI5HDwbk0S7xeFKRJZiU/crwf4+h0iJpHI4eAPaJJ4nyhMkSiXuFPB92/RIHFml6/PJfkyZSPxrVMgrJCYltSY42/eFYC7EeRaBtDp8RhOg7NzQGYGmJ8G+IwGLE66fL3mh8aKlxx8/9YUgNaKjoUCE7DhApCnCaAK5ZjB6Wng7+MAmzO8tq+ky9fbLlklBudvHnyc2fooL788TaDlFwEkOn2LvpwFz/4KpItG6ZasTcBj5Ov9QNKgHDwW8HDjZWMg+CTG8K4ENYjGUcrasZn8fNmhp/x1jAlaN9dKNCD6Hi8GN6vw+LYL2ZvZB9DaJeGtpC8W7U8lEc8ekyR/gDxznbR64Hglv3/v2wK34A9u92b5r+3EeAggc5q4Ma8YeUCNV9g/3uU6No/9zNFSz/wMGN8R8UdwTb5nd+zMNrh0R2tdVwev9YRU91dPXPWO1rpfPfFaT0h1f/XEVe9orfs5NvF/AKC0l1bHLirOAAAAAElFTkSuQmCC',
    title: '错题本',
    src: 'myWrongList',
    id: 4,
  },
  {
    img:
            'data:image/png;base64,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',
    title: '成长报告',
    src: 'growthReport',
    id: 5,
  },
  {
    img: 'https://yiguodu-habit.oss-cn-qingdao.aliyuncs.com/uni-app/default/mine-grid-menu-icon/my-book.png',
    title: '电子课本',
    src: 'bookList',
    id: 6,
  },
]
console.log('kkkk', uni.getWindowInfo())
</script>

<template>
  <div>
    <button @tap="handleShowBottomPop">
      bottom pop
    </button>
    <guodu-drawer
      :visible="showStudentBottomPop"
      :mask-click="true"
      mode="bottom"
      size="50vh"
      @close="handleCloseBottomPop"
    >
      bottom pop
    </guodu-drawer>
    <button @tap="handleShowLeftPop">
      bottom left
    </button>
    <guodu-drawer
      :visible="showStudentLeftPop"
      :mask-click="true"
      mode="left"
      @close="handleCloseLeftPop"
    >
      bottom left
    </guodu-drawer>
    <guodu-seletor icon="" />
    <guodu-seletor max-width="400rpx" text="wo我是" />
    <guodu-list title="title" footer="footer">
      <guodu-list-item title="titlefff" :link="true" value="valuevaluevalue" has-footer footer="footer" />
      <guodu-list-item icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAmZJREFUaEPt2e+nFFEYB/Dvs7P7Yv6F/UPSy16m88zL7mwiSUkkktykd0lJIpFskkjUxP6Y2d240koil6QXySW5SiKJtIl29mSY5by458WdPTPr4c7rMb6fc56ze85zCMIfEp4fO4Blz2ChGWDmPQB2A0iTJLkGQC8LUhRwB8DRPPQT3/dbURSly0AUBZwFcNUI3Gk2m2G73f5XNaIQIAsZBMFjrfX+eWCtdW8ymbTG4/HfKhGFAVshAMRE1Irj+E9ViIUAFsTQ9/0wiqLfVSAWBmyFIKKn0+k0HI1Gv8pGOAFY1sQagHAwGPwsE+EMYCmnZ41GI+x0Oj/KQjgFWBDP0zTNyul7GQjnAEs5vdBah8Ph8JtrRCkAy0y8rNVqYb/f/+oSURrAgniVl9MXV4hSARbE69lslpXTpgtE6QALYp2IwjiOPy2KqARgQbyp1+sr3W734yKIygAWxNu8nDaKIioFWBDv8nL6UARROcCC2PQ8b1+v13u/XcRSALaFnSTJLjEAZr4I4IIReF0MIAiCS1rr80b4z57n7RVRQkqpK0S0aoSXs4iZOWsEZA2B+SPnZ5SZs/7RGSO8nD8ypdR1IjptLlgxWwlmvgHglBFezmaOmW8COGmEl7OdZuZbAE4Y4eUcaJRSt4no+Dy81lrOkZKZ2wCOGSMv51DPzHcBHDHCy2mrKKXuEdFho2zkNLaY+T6AQ/PwolqLzPwAwEGjbOQ0d4MgeKi1PmCEl9NeV0o9IqIVo+blXHAws+wrJmY+B+ByPvoiL/mya9Zs4W6IvGbd7sG7zPeX1pVwhdoBuBrJot/5DwlHY0D6STWgAAAAAElFTkSuQmCC" :link="false" has-footer footer="footer" title="ddd" />
    </guodu-list>
    <guodu-loading color="red" />
    <guodu-loading />
    <guodu-loading type="circle" />
    <guodu-loading type="circle2" />
    <guodu-empty />
    <guodu-empty message="message" />
    <guodu-grid :list="mineGridList" />
    <guodu-grid :list="mineGridList" :column="3" />
  </div>
</template>
