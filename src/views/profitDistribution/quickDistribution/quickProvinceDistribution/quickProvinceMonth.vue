<template>
  <div>
    <div class="searchBox">
      <p class="total">
        <span>分公司总交易量：{{totalPerformance|normAmount}}元</span>&nbsp;
        <span>分公司总分润：{{totalProfit|normAmount}}元</span>&nbsp;
        <span>分公司月结分润：{{totalMonthProfit|normAmount}}元</span>&nbsp;
      </p>
      <p class="total">
        <span>机构总分润：{{totalOrganProfit|normAmount}}元</span>&nbsp;
        <span>合伙人总分润：{{totalPartnerProfit|normAmount}}元</span>&nbsp;
        <br>
        <span>VIP总分润：{{totalVipProfit|normAmount}}元</span>&nbsp;
        <!-- <span>推荐奖励：{{totalRecommendedReward|normAmount}}元</span>&nbsp; -->
      </p>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input
            clearable
            v-model="organName"
            placeholder="分公司"
            v-if="level === levelMap.PLATFORM"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable placeholder="结算状态" v-model="settleStatus">
            <el-option label="未结算" value="0"></el-option>
            <el-option label="已结算" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="date" type="month" value-format="yyyy-MM" placeholder="结算月份"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="provinceRepayMonthData" style="width: 100%" size="small">
      <el-table-column
        v-for="v in TableTitleList"
        :prop="v.prop"
        :label="v.title"
        :key="v.label"
        :width="v.width"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="clickDistributionDetail(scope.row)">分润详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 16px; background: white; overflow: hidden;">
      <div style="float: right;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="paging.currentPage"
          :page-size="paging.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="paging.total"
        ></el-pagination>
      </div>
    </div>
    <quick-province-detail
      v-if="detailShow"
      @closeDetail="closeDetail"
      :profitType="profitType"
      :provinceDetailData="provinceDetailData"
    ></quick-province-detail>
  </div>
</template>
<script>
import { queryPermission } from '@/util'
import { mixins } from '@/core'
import { TableTitle, ParseRoleList } from './table.js'
import quickProvinceDetail from './quickProvinceDetail'
import { filterUerLeveL } from '../../../../util'
import { levelMap } from '../../../../server/level.js'
export default {
  name: 'quick-province-repay-month',
  mixins: [mixins.pageMixin],
  components: {
    quickProvinceDetail
  },
  computed: {
    canQuickProvinceRepayMonthDetail() {
      return queryPermission('quickProvinceRepayMonthDetail')
    },
    canQuickProvinceReceiptMonthDetail() {
      return queryPermission('quickProvinceReceiptMonthDetail')
    }
  },
  props: {
    profitType: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      level: '',
      levelMap,
      organName: '',
      settleStatus: '',
      date: '',
      provinceRepayMonthData: [],
      TableTitleList: [],
      detailShow: false,
      totalOrganProfit: '',
      totalVipProfit: '',
      totalMonthProfit: '',
      totalPartnerProfit: '',
      totalRecommendedReward: '',
      totalPerformance: '',
      totalProfit: '',
      provinceDetailData: {}
    }
  },
  methods: {
    search() {
      this.loadData(true)
    },
    getUrl() {
      return 'onlineProfit/provinceProfit'
    },
    getPageParams() {
      return {
        profitType: this.profitType,
        organName: this.organName,
        settleStatus: this.settleStatus,
        date: this.date
      }
    },
    handleRows(rows) {
      this.provinceRepayMonthData = ParseRoleList([].concat(rows))
      this.totalOrganProfit = this.getExtra('totalOrganProfit')
      this.totalVipProfit = this.getExtra('totalVipProfit')
      this.totalMonthProfit = this.getExtra('totalMonthProfit')
      this.totalPartnerProfit = this.getExtra('totalPartnerProfit')
      this.totalRecommendedReward = this.getExtra('totalRecommendedReward')
      this.totalPerformance = this.getExtra('totalPerformance')
      this.totalProfit = this.getExtra('totalProfit')
    },
    clickDistributionDetail(row) {
      this.provinceDetailData = row
      this.detailShow = true
    },
    closeDetail() {
      this.detailShow = false
    }
  },
  mounted() {
    this.loadData()
    this.level = localStorage.getItem('level')
    this.TableTitleList = filterUerLeveL(TableTitle)
  }
}
</script>
<style scoped>
.total {
  color: #606266;
  font-size: 14px;
  text-align: right;
}
</style>
