import React, {  useEffect, useState } from 'react';
import {
    
    Tab,
    TabList,
    
    
  } from "@fluentui/react-components";

import AdminBlogsPending from './AdminBlogsPending'
import AdminMailsPending from './AdminMailsPending'


import {useSelector, useDispatch} from 'react-redux';

const Pending = (props) => {
  const [selectedTab1, setSelectedTab1] = useState('tab1');
  const themestate = useSelector((state) => state.theme.theme);

  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };

    return(
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{  width: "100%", display: "flex",justifyContent:"center"}}>
      <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        onTabSelect={handleTabSelect}
        style={{  }}
      >
        <Tab value="tab1" className={themestate ? "tab dark drawer" : "tab"} style={{ border: '1px solid transparent' }}>Blogs</Tab>
        <Tab value="tab2" className={themestate ? "tab dark drawer" : "tab"} style={{ border: '1px solid transparent' }}>Mails</Tab>
      </TabList>
      </div>

      {selectedTab1 === 'tab1' && (
        <div style={{ marginTop: "30px" }}>
          <AdminBlogsPending />
        </div>
      )}

      {selectedTab1 === 'tab2' && (
        <div style={{ marginTop: "30px" }}>
          <AdminMailsPending />
        </div>
      )}
    </div>
        
    );

};

export default Pending;