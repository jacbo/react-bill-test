import classNames from 'classnames';
import { useMemo } from 'react';
import './index.scss'
import { billTypeToName} from '@/constants'

/**
 * 单日账单组件
 * @param {string} date 日期
 * @param {array} billList 单日账单列表
 */
export default function DayBill({date,billList}) {

    console.log(billTypeToName)

    const dayResult = useMemo(()=>{
        //支出 收入 结余
        const pay = billList.filter(item=>item.type === 'pay').reduce((pre,cur)=>pre+cur.money,0)
        const income = billList.filter(item=>item.type === 'income').reduce((pre,cur)=>pre+cur.money,0)
        return {pay,income,total:pay+income}
    },[billList])

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon"> 
                    <span>{date}</span>
                    <span className={classNames('arrow')}></span>
                </div>
                <div className="oneLineOverview"> 
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income"> 
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance"> 
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList"> 
                {
                    billList.map((item, index) => { 
                        return (
                            <div className="bill" key={item.id}>
                                <div className="detail"> 
                                    <div className="billType">{billTypeToName?.[item.type]?.[item.useFor]}</div>
                                </div>
                                <div className="money">{item.money.toFixed(2)}</div>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}