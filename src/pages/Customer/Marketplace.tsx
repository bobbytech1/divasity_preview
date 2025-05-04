import { TabHeader } from '../../components/Header/TabHeader'
import { Ellipsis } from 'lucide-react'
import Shop from '../Shopper/Shop'

export function Marketplace() {
  return (
    <div>
        <TabHeader
        name='Marketplace'
        containerStyle='flex-row-reverse bg-white'
        icon={<Ellipsis />}
        />
        <div className='bg-white h-screen'>
        <Shop/>
        </div>
    </div>
  )
}
