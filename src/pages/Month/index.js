import { NavBar,DatePicker } from 'antd-mobile'
import { BillOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'

export default function Month() {

    const [dateVisible, setDateVisible] = useState(false)

    const [currentDate, setCurrentDate] = useState(()=> new Date())

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
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{300}</span>
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
                        }}
                        max={new Date()}
                    />
                </div>
                
            </div>
        </div>
    )
}