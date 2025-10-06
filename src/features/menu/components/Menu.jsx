import styles from "../styles/Menu.module.css";
import Logo from "assets/images/logo.png";
import Banner from "assets/images/Banner.png";
import BannerFooter from "assets/images/Footer.png";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Flex,
  Layout,
  Row,
  Space,
  Image,
  Card,
  Avatar
} from "antd";
import {
  ArrowRightOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import User from "components/layouts/MainLayout/User";
import { useTranslation } from "react-i18next";
const { Header, Content, Footer } = Layout;

const urlData = [
  { "permissionCode": "AUTHORIZE", "url": "/authorize/company_detail","desc":"User Authorization and Access Control." },
  { "permissionCode": "COMPARE_DASHBOARD", "url": "/compare_dashboard","desc":"Plan & Actual Comparison Dashboard for Products." },
  { "permissionCode": "LOG", "url": "/system_log","desc":"Monitor Access and Track User Activity." },
  { "permissionCode": "OEE_DASHBOARD", "url": "/oee_dashboard","desc":"Dashboard for Availability, Performance & Quality." },
  { "permissionCode": "WAREHOUSE_N_ORDER", "url": "/warehouse_and_order","desc":"Smart Monitoring Warehouse and Plan with Accurate Order Estimation." }
];

function MenuComponents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
      
    const permissions = JSON.parse(window.localStorage.getItem("permiss"));
  
    const permissionUrlMap = urlData.reduce((acc, current) => {
      acc[current.permissionCode] = {
        url: current.url,
        desc: current.desc 
      }
      return acc;
    }, {});
    
    const filteredPermissions = permissions
      .filter(item => item.parentCode === null || item.parentCode === '')
      .map(item => ({
        permissionCode: item.permissionCode,
        permissionName: item.permissionName,
        seqNo: item.seqNo
      }));
  const sortedPermissions = [...filteredPermissions].sort((a, b) => a.seqNo - b.seqNo);
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
            <Flex justify="right">
            <Space >
              <User/>
            </Space>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content className={styles.content}>
        <Row className={styles.banner_container}>
          <img src={Banner} alt="banner" preview={false}/>
          <div className={styles.banner_text}><h2>{t("menu.banner_header")}</h2><small>{t("menu.banner_desc")}</small></div>
        </Row>
        <Row className={styles.menu_container_text}>
           <Col span={24} ><h1>{t("menu.content")}</h1></Col>
        </Row>
        <Row justify="space-around">
          {sortedPermissions.map(card => {
                  const urlDataEntry = permissionUrlMap[card.permissionCode];
                  if (!urlDataEntry) {
                    return null;
                  }
                  return (
                    <Card
                      hoverable
                      key={card.permissionCode}
                      style={{ width: '15%', margin: '10px' }}
                      onClick={() => navigate(urlDataEntry.url)}
                    >
                      <Row><BarChartOutlined style={{ fontSize: '32px',color:'#201e5b' }} /></Row>
                      <h3>{card.permissionName}</h3>
                      <small>{urlDataEntry.desc}</small>
                      <Row style={{justifyContent: "right"}}><Avatar icon={<ArrowRightOutlined />} style={{backgroundColor:"var(--light-purple-color)"}}></Avatar></Row>
                      
                    </Card>
                  );
                })}
            </Row >
            </Content>
            <Footer style={{ textAlign: 'center',width:'100%',padding:0,background: '#201e5b' ,color:'white'}}>
                <Row className={styles.banner_container}>
                    <img src={BannerFooter} alt="banner" preview={false}/>
                </Row>
                <p>{t("footer")}</p>
            </Footer>
    </Layout>
  )
}

export default MenuComponents;
