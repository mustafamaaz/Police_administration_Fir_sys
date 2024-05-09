import React from 'react'
import { Outlet  } from 'react-router-dom';

import StationAdminSidebar from '../../components/StationAdminSidebar'

export default function StaionPanelLayout() {





  return (
    <div>
<StationAdminSidebar/>
    <Outlet/>
</div>
  )
}
