import { formateTime } from '../../../util'
import { activateStatus } from './status'
export const equipmentChangeColumn = () => {
  return [
    {
      tableProp: 'user',
      tableLabel: '用户'
    },
    {
      tableProp: 'partner',
      tableLabel: '合伙人'
    },
    {
      tableProp: 'secOrgan',
      tableLabel: '高级合伙人'
    },
    {
      tableProp: 'oneOrgan',
      tableLabel: '子公司'
    },
    {
      tableProp: 'devNo',
      tableLabel: '原设备编号'
    },
    {
      tableProp: 'newDevNo',
      tableLabel: '新设备编号'
    },
    {
      tableProp: 'brandSubName',
      tableLabel: '设备型号'
    },
    {
      tableProp: 'activateStatus',
      tableLabel: '原设备激活状态'
    },
    {
      tableProp: 'remark',
      tableLabel: '换机原因'
    },
    {
      tableProp: 'addDate',
      tableLabel: '申请时间'
    },
    {
      tableProp: 'operator',
      tableLabel: '操作人'
    },
    {
      tableProp: 'auditMsg',
      tableLabel: '审核意见'
    }
  ]
}
export const parseEquipmentChange = arr => {
  return arr.map(v => ({
    ...v,
    user: `${v.username}(${v.userAccount})`,
    partner: `${v.partnerName}(${v.partnerAccount})`,
    secOrgan: v.secOrganName ? `${v.secOrganName}(${v.secOrganAccount})` : '',
    oneOrgan: `${v.oneOrganName}(${v.oneOrganAccount})`,
    activateStatus: activateStatus[v.activateStatus],
    addDate: formateTime(v.addDate)
  }))
}
