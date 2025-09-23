import React from "react";
import {
  BarChartOutlined,
  HomeOutlined,
  LeftOutlined,
  MenuOutlined,
  RightOutlined,
  UserOutlined,
  IdcardOutlined,
  ToolOutlined,
  FundViewOutlined,
  InboxOutlined
} from "@ant-design/icons";
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
  Avatar
} from "antd";
// import Logo2 from "assets/images/Logo1.png";
import Logo from "assets/images/logo.png";
import cx from "classnames";
import { setState } from "features/home/slices/homeSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { generateRandomString } from "utils/helper";
import * as services from "../../../features/home/services/homeApi";
import Breadcrumb from "./Breadcrumb";
import styles from "./MainLayout.module.css";
import User from "./User";
import { setCollapsed } from "./slices/mainSlice";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = ({
  className = "",
  title = "-",
  breadcrumb = [],
  children,
}) => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.main);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const [selectedKeys, setSelectedKeys] = useState(["home"]);
  const [openKeys, setOpenKeys] = useState(["home"]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const getState = useCallback(async () => {
    try {
      const res = '';
      // const res = await services.getState({
      //   requestId: generateRandomString(),
      // });
      dispatch(setState(res.data));
    } catch (err) {
      Alert({ type: "error", resultObject: err });
    }
  }, [dispatch]);

  useEffect(() => {
    getState();
  }, [getState]);

  const onOpenChange = (e) => {
    setOpenKeys(e);
    setSelectedKeys(e);
  };

  function modifyKeys(keys = []) {
    return keys.map((k, idx) => {
      if (idx === 0) return k;
      return keys[idx - 1] + "." + k;
    });
  }

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/") {
      setSelectedKeys(["home"]);
      setOpenKeys(["home"]);
    } else if (!collapsed) {
      const splitedKey = pathname.split("/");
      const clonedKeys = [...splitedKey];
      clonedKeys.shift();
      setOpenKeys([clonedKeys[0]]);
      const modifiedKeys = modifyKeys(clonedKeys);
      setSelectedKeys(modifiedKeys);
    }
  }, [location.pathname, collapsed]);

  const onMenuClick = (e) => {
    let link = "";
    if (e.key === "home") {
      link = "/";
      setSelectedKeys(["home"]);
      setOpenKeys(["home"]);
    } else {
      const splitedKey = e.key.split(".");
      setOpenKeys([splitedKey[0]]);
      const joinedKey = splitedKey.join("/");
      link = "/" + joinedKey;
      setSelectedKeys([joinedKey]);
      setOpenKeys([joinedKey]);
    }
    navigate(link);
  };

  const getItem = (i18n_key, label, key, icon, children, type) => ({
    i18n_key,
    key,
    icon,
    children,
    label,
    type,
  });

  const MENU_LIST = [
    getItem("home", "Home", "home", <HomeOutlined />),
    getItem(
      "compare_dashboard",
      "Compare Dashboard",
      "compare_dashboard",
      <FundViewOutlined />
    ),
    getItem(
      "oee_dashboard",
      "OEE Dashboard",
      "oee_dashboard",
      <BarChartOutlined />
    ),
    getItem(
      "warehouse_and_order",
      "Warehouse Tracking & Order Estimation",
      "warehouse_and_order",
      <InboxOutlined />
    ),
    getItem(
      "authorize",
      "Authorize",
      "authorize",
      <UserOutlined />,
      [
      getItem(
        "company_detail",
        "Company Detail",
        "authorize/company_detail"
      ),
      getItem(
        "role_detail",
        "Role Detail",
        "authorize/role_detail"
      ),
      getItem(
        "user_management",
        "User Management",
        "authorize/user_management"
      ),
    ]
     
    ),
    getItem(
      "system_log",
      "System Log",
      "system_log",
      <ToolOutlined />
      // <Avatar shape="square" size={25} icon={<ToolOutlined />} style={{ backgroundColor: 'var(--purple-color)',color: 'var(--light-purple-color)' }} />
    ),
  ];

  return (
    <>
      {screens.xl ? (
        <Layout className={cx(styles.container, className)} hasSider={true}>
          <Sider
            width="27vh"
            className={cx(styles.sidebar)}
            style={{
              position: "sticky",
              backgroundColor: "#ffffffff",
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginTop: "10px" }}>
                {collapsed ? (
                  <img
                    src={Logo}
                    className={styles.logo2}
                    alt="logo"
                    onClick={() => dispatch(setCollapsed(!collapsed))}
                  />
                ) : (
                  <img
                    onClick={() => dispatch(setCollapsed(!collapsed))}
                    src={Logo}
                    className={styles.logo}
                    alt="logo"
                  />
                )}
                {/* <hr style={{border: 'none',backgroundColor: '#e1e1e1', height: '1px',}}/> */}
                <Menu
                  style={{
                    overflowY: "auto",
                  }}
                  className={styles.menu}
                  defaultSelectedKeys={["home"]}
                  mode="inline"
                  selectedKeys={selectedKeys}
                  openKeys={openKeys}
                  items={MENU_LIST.map((entity) => ({
                    ...entity,
                    label: t(`${entity.i18n_key}.header`),
                    children:
                      entity.children?.map((child) => ({
                        ...child,
                        label: t(`${child.i18n_key}.header`),
                      })) || entity.children,
                  }))}
                  onClick={onMenuClick}
                  onOpenChange={onOpenChange}
                  inlineCollapsed={collapsed}
                />
              </div>
              <div style={{ textAlign: "center", width: "100%"}}>
                <Button
                  type="text"
                  onClick={() => dispatch(setCollapsed(!collapsed))}
                  style={{
                    width: "100%",
                    height: "35px",
                    color: "var(--white-color)",
                    borderRadius: "0px",
                  }}
                >
                  {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </Button>
              </div>
            </div>
          </Sider>
          <Content
            style={{
              paddingLeft: 10,
              backgroundColor: "#f8f9fa",
              borderRadius: borderRadiusLG,
            }}
          >
            <Header
              className={styles.header}
              style={{
                paddingTop: "10px",
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: "8px",
                lineHeight: "20px",
                borderRadius: borderRadiusLG,
              }}
            >
              <Row className={styles.header}>
                <Col span={12}>
                  <Row align="middle" justify="space-between">
                    <Space size="1" direction="vertical">
                      <Breadcrumb breadcrumb={breadcrumb} />
                      <div className={styles.title} style={{}}>
                        {title}
                      </div>
                    </Space>
                  </Row>
                </Col>
                <Col span={11}>
                  <Flex justify="right">
                    <Space justify="right" size={24}>
                      <User />
                    </Space>
                  </Flex>
                </Col>
                <Col span={1} />
              </Row>
            </Header>
            <Content
              className={styles.content}
              style={{
                margin: "5px 5px",
                padding: 10,
                width: "100%",
                borderRadius: borderRadiusLG,
              }}
            >
              <div className={styles.body}>
                <div
                  style={{
                    height: "max-content",
                    paddingRight: "1vw",
                  }}
                >
                  {children}
                </div>
              </div>
            </Content>
          </Content>
        </Layout>
      ) : (
        <Layout className={cx(styles.container, className)}>
          <Content
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: borderRadiusLG,
            }}
          >
            <Header
              className={styles.header_md}
              style={{
                paddingTop: "10px",
                paddingLeft: "20px",
                paddingRight: "5px",
                lineHeight: "20px",
                borderRadius: borderRadiusLG,
              }}
            >
              <Row gutter={[24, 10]}>
                <Col span={12}>
                  <Row align="middle" justify="space-between">
                    <Space size="1" direction="vertical">
                      <Breadcrumb breadcrumb={breadcrumb} />
                      <div className={styles.title}>{title}</div>
                    </Space>
                  </Row>
                </Col>
                <Col span={11}>
                  <Flex justify="right">
                    <Space justify="right" size={24}>
                      <User />
                      <Button
                        icon={<MenuOutlined />}
                        type="text"
                        onClick={toggleDrawer}
                      />
                    </Space>
                  </Flex>
                </Col>
              </Row>
            </Header>
            <Content
              className={styles.content}
              style={{
                height: "100%",
                borderRadius: borderRadiusLG,
              }}
            >
              <div className={styles.body}>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "max-content",
                  }}
                >
                  {children}
                </div>
              </div>
            </Content>
          </Content>
          <Drawer
            title="Menu"
            placement="right"
            onClose={toggleDrawer}
            open={drawerVisible}
          >
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              items={MENU_LIST}
              onClick={onMenuClick}
            />
          </Drawer>
        </Layout>
      )}
    </>
  );
};

export default MainLayout;
