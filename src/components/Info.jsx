import React from 'react'

const Info = ({ data }) => {
  return (
    <div className='info'>
        <div>
          <span>IP address</span>
          <strong>{data.ip}</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>{`${data.city}, ${data.state_prov}, ${data.country_name}`}</strong>
        </div>
        <div>
          <span>Timezone</span>
          <strong>{data.time_zone.name}</strong>
        </div>
        <div>
          <span>ISP</span>
          <strong>{data.isp}</strong>
        </div>
    </div>
  )
}

export default Info