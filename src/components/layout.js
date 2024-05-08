import { Breadcrumb, Layout, Menu, Input, Badge, Popover, Button } from 'antd';
import { SearchOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import './layout.css';
import { UserOutlined, BarChartOutlined, TeamOutlined } from '@ant-design/icons';
import frLogo from '../media/frlogo.png';
import React, { useState } from 'react';
import Login from '../pages/Login';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
      }
    ]

    const handleMenuItemClick = (key) => {
      // Update the selected menu item
      setSelectedMenuItem(key);
  
      // You can add additional logic here based on the selected menu item
      console.log(`Menu item "${key}" clicked`);
    };
  

  return (
    <Layout>

      <Header
        className='navbar'>
        <div className="left-part" >
          <div className='focusr-logo'>
            <img src={frLogo} alt='FRLogo' className='focusr-logo-img'></img>
          </div>

          <span className='focusR-text'>FocusR</span>
        </div>

        <div className='center'>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: '#ffffff' }} />}
          />
        </div>

        <div className='right-part'>
          <div className='notification-container'>
            <Badge count={5} >
              <BellOutlined className='notification-icon' />
            </Badge>
          </div>



          <Popover
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
          </Popover>
        </div>

      </Header>
      <Layout style={{ height: '93vh' }}>
        <Sider
          breakpoint="lg"
          width={230}

          collapsedWidth="0"
          style={{ backgroundColor: 'rgb(233,232,232)' }}
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="LoggedInUser" style={{ display: 'flex', alignItems: 'center', padding: '10px', margin: '0 1px' }}>
            <div style={{ backgroundColor: 'rgb(19,93,112)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'white' }}>
              G
            </div>
            <div style={{ marginLeft: '13px', }}>
              <p style={{ fontSize: '17px', marginBottom: '2px', marginTop: '0', fontWeight: 'bold' }}>Gokilavani</p>
              <p className="second" style={{ fontSize: '13px', marginBottom: '0', marginTop: '0', }}>Human Resource</p>
            </div>
          </div>
          <Menu

            mode="inline"
            defaultSelectedKeys={['Dashboard']}
            // items={items2}
            style={{ backgroundColor: 'rgb(233,232,232)' }}


          >
            {items2.map(item => (
              <Menu.Item key={item.key} className='menu-item' icon={item.icon} 
              style={{ backgroundColor: selectedMenuItem === item.key ? 'transparent' : 'inherit', borderLeft:selectedMenuItem === item.key ?'5px solid blue':'', borderRadius:'0', color:'black'}}
              onClick={() => handleMenuItemClick(item.key)}>
                <Link to={item.linkto}>
                {item.label}
                </Link>
              </Menu.Item>
            ))}

          </Menu>
        </Sider>
        <Layout >
        {/* style={{ padding: '14px 14px' }} */}
         
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'rgb(255,254,254)',
              borderRadius: '5px',
            }}
          >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            
          </Breadcrumb>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomLayout;