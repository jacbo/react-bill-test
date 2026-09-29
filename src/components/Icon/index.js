import cup from '@/assets/cup.svg'
import salary from '@/assets/salary.svg'
export default function Icon({type}) {
  return (
    <img src={type==='drinks'?cup:salary} alt="icon" style={{ width: '20', height: '20' }} />
  )
}