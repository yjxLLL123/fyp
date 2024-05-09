
<template>
  <!-- 围栏数据以表格的形式展示 -->
  <el-table :data="fencingData" border style="width: 100%">
    <el-table-column prop="name" label="围栏名称" width="150">
      <template slot-scope="scope">
        <el-input v-model="fencingData[scope.$index].name"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="path" label="坐标数据">
      <template slot-scope="scope">
        <el-button type="primary" size="small"
                   @click.native.prevent="PathCopy(scope.$index, fencingData)">
          复制</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click.native.prevent="hold(scope.$index, fencingData)">
          编辑</el-button>
        <el-button type="text" size="small"
                   @click.native.prevent="hold1(scope.$index, fencingData)">
          保存</el-button>
        <el-button @click.native.prevent="deleteRow(scope.$index, fencingData)" type="text"
                   size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<el-button type="primary" size="small" @click.native.prevent="Polyadd">添加围栏</el-button>



<script>
export default {
  name:"dianziweilan",
  //data 中定义
//电子围栏
  fencingData: [{
    name: '北京电子围栏',
    path: [
      [116.388565, 39.907388],
      [116.383565, 39.902388],
      [116.383565, 39.912388]
    ]
  }],

}
</script>


<style scoped>

</style>