import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recomended from './Recomended'
import News from './news'

const home = () => {
  return (
    
    <>
        <div >
        <Banner/>
        <TopSellers/>
        <Recomended/>
        <News/>
        
        </div>
    </>
    
  )
}

export default home