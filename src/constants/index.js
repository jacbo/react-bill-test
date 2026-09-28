export const billListData = {
    pay: [
        {
            type:'foods',
            name:'餐饮',
            list:[
                {type:'foods',name:'餐饮'},
                {type:'drinks',name:'酒水饮料'}
            ]
        },
        {
            type:'taxi',
            name:'交通出行',
            list:[
                {type:'taxi',name:'打车租车'},
                {type:'longdistance',name:'旅行票费'}
            ]
        },
        {
            type:'other',
            name:'其他支出',
            list:[
                {type:'community',name:'社区缴费'}
            ]
        }
    ],
    income:[
        {
            type:'salary',
            name:'工资收入',
            list:[
                {type:'salary',name:'工资收入'}
            ]
        },
        {
            type:'bonus',
            name:'奖金收入',
            list:[
                {type:'bonus',name:'奖金收入'}
            ]
        },
        {
            type:'other',
            name:'其他收入',
            list:[
                {type:'other1',name:'理财收入'}
            ]
        }
    ]
}

export const billTypeToName = Object.keys(billListData).reduce((acc,cur)=>{
    acc[cur] = {}
    billListData?.[cur]?.forEach(item=>{
        acc[cur][item.type] = item.name
    })
    return acc
},{})