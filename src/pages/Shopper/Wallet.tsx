
import { TabHeader } from '../../components/Header/TabHeader'
import App from '../../App'

export  function Wallet() {
  return (
    <div>
             <TabHeader
        name='Wallet'
        containerStyle='flex-row-reverse bg-white'
        />
        <div className='bg-white h-screen'>
        <App/>
        </div>
    </div>
  )
}
