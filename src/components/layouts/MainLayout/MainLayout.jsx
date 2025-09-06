import React from "react";
import {
  HeartOutlined,
  HomeOutlined,
  LeftOutlined,
  MenuOutlined,
  RightOutlined,
  UserOutlined,
  IdcardOutlined,
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
} from "antd";
// import Logo2 from "assets/images/Logo1.png";
// import Logo from "assets/images/Logo2.jpg";
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
import Notification from "./Notification";
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
      const res = await services.getState({
        requestId: generateRandomString(),
      });
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
    getItem("patient", "Patient", "patient", <UserOutlined />),
    getItem(
      "blood_pressure",
      "Blood Pressure",
      "blood_pressure",
      <HeartOutlined />
    ),
    getItem(
      "user_management",
      "User management",
      "user_management",
      <IdcardOutlined />
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
              backgroundColor: "#FFFBEB",
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
                {/* {collapsed ? (
                  <img
                    src={Logo2}
                    className={styles.logo2}
                    alt="M logo"
                    onClick={() => dispatch(setCollapsed(!collapsed))}
                  />
                ) : (
                  <img
                    onClick={() => dispatch(setCollapsed(!collapsed))}
                    src={Logo}
                    className={styles.logo}
                    alt="M logo"
                  />
                )} */}
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
              <div style={{ textAlign: "center", width: "100%" }}>
                <Button
                  type="text"
                  onClick={() => dispatch(setCollapsed(!collapsed))}
                  style={{
                    width: "100%",
                    height: "35px",
                    color: "white",
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
              backgroundColor: "#FFFBEB",
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
                      <Notification />
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
              backgroundColor: "#FFFBEB",
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
                      <Notification />
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
