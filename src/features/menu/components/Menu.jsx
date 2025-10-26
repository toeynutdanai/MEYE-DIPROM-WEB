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
  BarChartOutlined,
  FundViewOutlined,
  InboxOutlined,
  UserOutlined,
  ToolOutlined
} from "@ant-design/icons";
import User from "components/layouts/MainLayout/User";
import { useTranslation } from "react-i18next";
const { Header, Content, Footer } = Layout;

const urlData = [
  { "permissionCode": "AUTHORIZE", "url": "/authorize/company_detail","desc":"User Authorization and Access Control.","icon":<UserOutlined style={{ fontSize: '40px',color:'#424ca1' }} /> },
  { "permissionCode": "COMPARE_DASHBOARD", "url": "/compare_dashboard","desc":"Plan & Actual Comparison Dashboard for Products.","icon":<FundViewOutlined style={{ fontSize: '40px',color:'#424ca1' }} /> },
  { "permissionCode": "LOG", "url": "/system_log","desc":"Monitor Access and Track User Activity.","icon":<ToolOutlined style={{ fontSize: '40px',color:'#424ca1' }} /> },
  { "permissionCode": "OEE_DASHBOARD", "url": "/oee_dashboard","desc":"Dashboard for Availability, Performance & Quality.","icon":<BarChartOutlined style={{ fontSize: '40px',color:'#424ca1' }} /> },
  { "permissionCode": "WAREHOUSE_N_ORDER", "url": "/warehouse_and_order","desc":"Smart Monitoring Warehouse and Plan with Accurate Order Estimation.","icon":<InboxOutlined style={{ fontSize: '40px',color:'#424ca1' }} /> }
];

const MenuComponents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const permissions = JSON.parse(window.localStorage.getItem("permiss"));

  const permissionUrlMap = urlData.reduce((acc, current) => {
    acc[current.permissionCode] = {
      url: current.url,
      desc: current.desc,
      icon: current.icon
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
      <Header className={styles.header} style={{ lineHeight: "20px" }}>
        <Row className={styles.header} align="middle" justify="space-between">
          <Col span={12}>
            <Space>
              <Image
                src={Logo}
                alt="Logo"
                preview={false}
                className={styles.header_logo}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Flex justify="right">
              <Flex gap="small" align="end" justify="right" vertical>
                <User />
              </Flex>
            </Flex>
          </Col>
        </Row>

      </Header>
      <Content className={styles.content}>
        <Row className={styles.banner_container}>
          <img src={Banner} alt="banner" preview={false} />
          <div className={styles.banner_text}><p style={{fontSize:70,fontWeight:400}}>{t("menu.banner_header")}</p><p style={{fontSize:20,fontWeight:200}}>{t("menu.banner_desc")}</p></div>
        </Row>
        <Row className={styles.menu_container_text}>
          <Col span={24} ><h1>{t("menu.content")}</h1></Col>
        </Row>
        <Row justify="center">
          {sortedPermissions.map(card => {
            const urlDataEntry = permissionUrlMap[card.permissionCode];
            if (!urlDataEntry) {
              return null;
            }
            return (
              <Card
                hoverable
                key={card.permissionCode}
                style={{ width: '18%', margin: '10px' }}
                onClick={() => navigate(urlDataEntry.url)}
              >
                <div className={styles.card_content_flex}>
                  <div>
                    <Row style={{ marginBottom: '10px' }}>{urlDataEntry.icon}</Row>
                    <h3>{card.permissionName}</h3>
                    <Row>
                      <Col span={22}><small>{urlDataEntry.desc}</small></Col>
                    </Row>
                  </div>
                  <Avatar
                    size={40}
                    shape="circle"
                    icon={<ArrowRightOutlined />}
                    className={`${styles['gradient-avatar']} ${styles.bottom_right_avatar}`}
                  />
                </div>

              </Card>
            );
          })}
        </Row >
      </Content>
      <Footer style={{ textAlign: 'center', width: '100%', padding: 0, background: '#201e5b', fontWeight: 300, color: '#8b8b8b' }}>
        <Row className={styles.banner_container_footer}>
          <img src={BannerFooter} alt="banner" preview={false} />
        </Row>
        <Row style={{marginBottom: 4, justifyContent: 'center'}}>
          <small>{t("footer")}</small>
        </Row>
          
      </Footer>
    </Layout>
  )
}

export default MenuComponents;
