<template>
  <div>
    <plan-table v-show="showPlan === 1" @seeDatails="seeDatails"></plan-table>
    <plan-details v-if="showPlan === 2" :detailsData="detailsData" @toback="toback"></plan-details>
  </div>
</template>


<script>
import planTable from './planMent/planTable'
import planDetails from './planMent/planDetails'
export default {
  name: 'plan-management',
  components: {
    planTable,
    planDetails
  },
  data() {
    return {
      showPlan: 1,
      detailsData: '',
    }
  },
  methods: {
    // 点击计划详情
    seeDatails(details) {
      this.showPlan = details.showPlan
      this.detailsData = details.detailsData
    },
    toback(data) {
      this.showPlan = data.showPlan;
    },

  },
} 
</script>

<style lang="css" scoped>

</style>
