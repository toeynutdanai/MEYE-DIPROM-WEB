import styles from "../styles/Menu.module.css";
import Logo from "assets/images/logo.png";
import Banner from "assets/images/Banner.png";
import BannerFooter from "assets/images/Footer.png";
import { UserOutlined } from '@ant-design/icons'; 
import {
  Alert,
  Button,
  Col,
  Drawer,
  Flex,
  Grid,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Carousel,
  Image,
  Card,
} from "antd";
import User from "components/layouts/MainLayout/User";
const { Header, Sider, Content, Footer } = Layout;

function MenuHome() {
  const permissions = JSON.parse(window.localStorage.getItem("permiss"));
  const permissionData = permissions.map(item => ({
  permissionCode: item.permissionCode,
  permissionName: item.permissionName,
}));
console.log(permissionData);
return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header className={styles.header}>
        <Row className={styles.header}>
          <Col>
            <Space>
              <Image
                src={Logo}
                alt="Logo"
                preview={false}
                className={styles.header_logo}
              />
            </Space>
          </Col>
            <Col>
            <Row>
              <Col>
              <Flex justify="right">Admin</Flex></Col>
              <Col>
              <Flex justify="right">
            <Space >
              {/* <UserOutlined className={styles.header_icon}/> */}
              <User/>
            </Space>
            </Flex>
              </Col>

            </Row>
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>
        <Row className={styles.banner_container}>
          <img src={Banner} alt="banner" preview={false}/>
          <div className={styles.banner_text}><h2>M EYE</h2><small>Smart recognition and analysis system for dynamic data display.</small></div>
        </Row>
        <Row className={styles.menu_container_text}>
           <Col span={24} ><h2>Our Services</h2></Col>
        </Row>
        <Row className={styles.menu_container}> 
          {permissionData.map(card => (
            <Card key={card.permissionCode} style={{ width: 300 }}>
              <p>{card.permissionName}</p>
              <p>{card.permissionCode}</p>
            </Card>
          ))}
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center',width:'100%',padding:0,background: '#201e5b' ,color:'white'}}>
                <Row className={styles.banner_container}>
                    <img src={BannerFooter} alt="banner" preview={false}/>
                </Row>
                <p>© 2025 Department of Industrial Promotion, Ministry of Industry. All rights reserved.</p>
            </Footer>
    </Layout>
  )
}

export default MenuHome;
