import { NavBar,DatePicker } from 'antd-mobile'
import { BillOutline } from 'antd-mobile-icons'
import { useState,useMemo,useEffect } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DayBill'

export default function Month() {

    // 按月分组数据
    const billList = useSelector(state=>state.bill.billList)
    const monthGroup = useMemo(()=>{
    
        return _.groupBy(billList,(item)=>dayjs(item.date).format('YYYY-MM'))
    },[billList])

    const dateGroup = useMemo(()=>{
        const dates = _.groupBy(billList,(item)=>dayjs(item.date).format('YYYY-MM-DD'));
        return {dates,keys:Object.keys(dates)}
    },[billList])

    const [dateVisible, setDateVisible] = useState(false)

    const [currentDate, setCurrentDate] = useState(()=> new Date())

    const [monthList, setMonthList] = useState([])

    const monthResult = useMemo(()=>{
        console.log('monthList', monthList)
        const pay = monthList.filter(item=>item.type === 'pay').reduce((pre,cur)=>pre+cur.money,0)
        const income = monthList.filter(item=>item.type === 'income').reduce((pre,cur)=>pre+cur.money,0)
        return {pay,income,total:pay+income}
    },[monthList])

    useEffect(()=>{ 
        const curMonth = dayjs().format('YYYY-MM')
        setMonthList(monthGroup[curMonth] ?? [])
    },[monthGroup])

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backIcon={<BillOutline/>}>月度账单</NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={()=>setDateVisible(true)}>
                        <span className="text">
                            {dayjs(currentDate).format('YYYY | MM月账单')}
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>

                    {/* 统计区域 */}
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    <DatePicker 
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onClose={() => setDateVisible(false)}
                        onConfirm={(date) => { 
                            setCurrentDate(date)
                            const month = dayjs(date).format('YYYY-MM')
                            setMonthList(monthGroup[month] ?? [])
                        }}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表 */}

                {
                    dateGroup.keys?.length > 0 && dateGroup.keys.map((date) => { 
                        const dateTxt = dayjs(date,'YYYY-MM-DD').format('M月D日')
                        return (
                            <DailyBill key={date} date={dateTxt} billList={dateGroup.dates[date]} />
                        )
                    })
                }
            </div>
        </div>
    )
}