import { Breadcrumb, Layout, Menu, Input, Badge, Popover, Button } from 'antd';
import { SearchOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import './layout.css';
import { UserOutlined, BarChartOutlined, TeamOutlined } from '@ant-design/icons';
import frLogo from '../media/frlogo.png';
import React, { useState } from 'react';
import Login from '../pages/Login';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Drawer1 from './drawer';
import { SearchBox, Field, Avatar } from '@fluentui/react-components';
import { AlertBadgeRegular  } from '@fluentui/react-icons';

const { Header, Content, Footer, Sider } = Layout;
const CustomLayout = ({ children }) => {
  const [logoutPopoverVisible, setLogoutPopoverVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    console.log('Logout clicked');
  };
  const logoutPopoverContent = (
    <div style={{ display: 'flex', }}>
      <div className='logout-user-icon-pop'>
        G
      </div>
      <div style={{ marginLeft: '15px' }}>
        <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>Gokilavani</p>
        <p style={{ margin: '0', fontSize: '13px' }}>Gokilavani@gmail.com</p>
      </div>


    </div>
  );
  const logoutPopoverHeader = (
    <div style={{ display: 'flex', alignItems: 'center', }}>

      <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>FocusR consultancy and technologies</p>
      <Button type="link" onClick={handleLogout}>sign out</Button>

    </div>
  );

  const items2 =
    [


      {
        key: 'Dashboard',
        label: 'Dashboard',
        icon: <BarChartOutlined style={{ fontSize: '20px', }} />,
        linkto:'/dashboard'
      },
      {
        key: 'Employee',
        label: 'Employee',
        icon: <TeamOutlined style={{ fontSize: '20px', }} />,
        linkto:'/employee'
      },
      // {
      //   key: 'Form',
      //   label: 'Employee Form',
      //   icon: <TeamOutlined style={{ fontSize: '20px', }} />,
      //   linkto:'/form'
      // },
    ]

    const handleMenuItemClick = (key) => {
      // Update the selected menu item
      setSelectedMenuItem(key);
  
      // You can add additional logic here based on the selected menu item
      console.log(`Menu item "${key}" clicked`);
    };
  

  return (
    
    <div style={{height: "100vh", width: "100vw"}}>
      <Header
        className='navbar'>
        <div className="left-part" >
          <div className='focusr-logo'>
            <img src={frLogo} alt='FRLogo' className='focusr-logo-img'></img>
          </div>

          <span className='focusR-text'>FocusR</span>
        </div>

        {/* <div className='center' > */}
        <Field  style={{display: "flex", alignItems: "center", justifyContent:"center", backgroundColor:"#fff", borderRadius: "5px"}}>
      <SearchBox placeholder="This is a placeholder" style={{width:"100vw", height: "3vh"}} size='large' appearance='filled-darker'/>
    </Field>
        {/* </div> */}

        <div className='right-part'>
          <div className='notification-container'>
          < AlertBadgeRegular style={{color: "#fff", height:"100%", width:"100%"}}  />
          </div>



          {/* <Popover
            content={logoutPopoverContent}
            title={logoutPopoverHeader}
            trigger="click"
            open={logoutPopoverVisible}
            onOpenChange={setLogoutPopoverVisible}
            overlayStyle={{ width: '250px' }}
          >
            <div className='logout-user-icon'>
              G
            </div>
          </Popover> */}

          <Avatar color="colorful" idForColor="42" name="Gokilavani" size={40} style={{marginRight: "15px"}}/>
        </div>

      </Header>
      <Layout style={{ height: '94vh' }}>
        <Drawer1/>
      </Layout>
    </div>
  )
}

export default CustomLayout;