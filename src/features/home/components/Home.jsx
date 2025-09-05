import {
  FrownOutlined,
  LoadingOutlined,
  SmileOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { CardContainer } from "components/elements";
import CardState from "components/elements/CardContainer/CardState";
import MyList from "components/elements/List/MyList";
import { MainLayout } from "components/layouts";
import { useTranslation } from "react-i18next";
import styles from "../styles/Home.module.css";
import { Col, Row } from "antd";

function Home({
  isLoadingStatus = true,
  currentDate = "",
  currentTime = "",
  daysUntilNextMonth = "",
  states = {},
  userByLevel = [],
  userByStatusFlag = [],
  onCheckboxChange,
}) {
  const { t } = useTranslation();
  const hasDateTime = currentDate;

  return (
    <MainLayout
      title={t("home.header")}
      breadcrumb={[{ title: t("home.header") }]}
    >
      <Row gutter={[24, 16]} style={{ width: "100%", height: "100%" }}>
        <Col span={24}>
          <CardContainer width="100%" height="fit-content">
            {currentDate && (
              <>
                <div className={styles.header}>{t("home.label.card_one")}</div>
                <div
                  className={styles.sub_header}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    className={`${styles.icon_and_text_container}`}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      {t("home.label.card_one_date")}
                      <span className={`${styles.blue_text}`}>
                        {currentDate}
                      </span>
                    </div>
                    <div>
                      {t("home.label.card_one_time")}
                      <span className={`${styles.blue_text}`}>
                        {currentTime}
                      </span>
                    </div>
                    <div>
                      {t("home.label.card_zero")}
                      <span className={`${styles.blue_text}`}>
                        {daysUntilNextMonth} {t("home.unit.day")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!currentDate && (
              <div className={styles.header}>
                {t("home.label.loading")} <LoadingOutlined />
              </div>
            )}
          </CardContainer>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardState
            width="100%"
            height="fit-content"
            color="#134790"
            hasDateTime={hasDateTime}
            logo={<TeamOutlined style={{ color: "#FFFFFF" }} />}
            value={states.userAll}
            label={t("home.label.card_two")}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardState
            width="100%"
            height="fit-content"
            color="#139019"
            hasDateTime={hasDateTime}
            logo={<SmileOutlined style={{ color: "#FFFFFF" }} />}
            value={states.userSent}
            label={t("home.label.card_three")}
            percent={states.percentUserSent}
            openProgress={true}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardState
            width="100%"
            height="fit-content"
            color="#907b13"
            hasDateTime={hasDateTime}
            logo={<FrownOutlined style={{ color: "#FFFFFF" }} />}
            value={states.userUnsent}
            label={t("home.label.card_four")}
            percent={states.percentUserUnsent}
            openProgress={true}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardState
            width="100%"
            height="fit-content"
            color="#901313"
            hasDateTime={hasDateTime}
            logo={<WarningOutlined style={{ color: "#FFFFFF" }} />}
            value={states.userWarning}
            label={t("home.label.card_five")}
            percent={states.percentUserWarning}
            openProgress={true}
          />
        </Col>
        <Col xs={24} sm={12}>
          <CardContainer width="100%" height="100%">
            <div className={styles.header_list}>
              <h2>{t("home.label.card_six")}</h2>
            </div>
            <MyList
              height={"100%"}
              data={currentDate ? userByLevel : []}
              totalDataCount={userByLevel.length}
              boolean={false}
              onCheckboxChange={onCheckboxChange}
            />
          </CardContainer>
        </Col>
        <Col xs={24} sm={12}>
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <CardContainer width="100%" height="max-content" color="#451390">
                {currentDate ? (
                  <Row gutter={[24, 16]} className={styles.header_mini_last}>
                    <Col xs={24} lg={4} className={styles.font_size_main}>
                      {t("home.label.card_seven_one")}
                    </Col>
                    <Col xs={24} lg={20} className={styles.font_size_main}>
                      <span>
                        {t("home.label.card_seven_two")}{" "}
                        {states.bloodPressureCurrent?.createBy?.firstName}{" "}
                        {states.bloodPressureCurrent?.createBy?.lastName}(
                        {states.bloodPressureCurrent?.createBy?.hospitalNumber})
                      </span>
                    </Col>
                    <Col xs={24} sm={8} className={styles.font_size_main}>
                      <span>
                        SYS : {states.bloodPressureCurrent?.systolicPressure}
                      </span>
                    </Col>
                    <Col xs={24} sm={8} className={styles.font_size_main}>
                      <span>
                        DIA : {states.bloodPressureCurrent?.diastolicPressure}
                      </span>
                    </Col>
                    <Col xs={24} sm={8} className={styles.font_size_main}>
                      <span>
                        PUL : {states.bloodPressureCurrent?.pulseRate}
                      </span>
                    </Col>
                  </Row>
                ) : (
                  <div className={styles.header_mini}>
                    {t("home.label.loading")} <LoadingOutlined />
                  </div>
                )}
              </CardContainer>
            </Col>
            <Col span={24}>
              <CardContainer width="100%" height="max-content">
                <div
                  className={styles.header_list}
                  style={{ padding: "0.5rem", height: "fit-content" }}
                >
                  <h2>{t("home.label.card_eight")}</h2>
                </div>
                <MyList
                  height={"fit-content"}
                  data={currentDate ? userByStatusFlag : []}
                  totalDataCount={userByStatusFlag.length}
                  boolean={true}
                  onCheckboxChange={onCheckboxChange}
                  isLoading={isLoadingStatus}
                />
              </CardContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Home;
