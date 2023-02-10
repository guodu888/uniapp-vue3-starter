<!--
 * @Author: Arthur_Zhang
 * @Date: 2023-02-10 09:36:24
 * @LastEditors: Arthur_Zhang
 * @LastEditTime: 2023-02-10 18:21:27
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
  </div>
</template>
