import React from "react";
import { useTranslation } from "react-i18next";
import {DatePicker,Row,Col,Input} from "antd";
import { Button } from "components/elements";
import styles from "../styles/SystemLog.module.css";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("en");

const SystemLogSearch = ({
  onClick = () => {},
  logType = 'Access Log',
  search = {},
  setSearch = () =>{}
})=>{
  const { t } = useTranslation();
return (
        <div>
            {logType === "Access Log" ? (
                <Row gutter={[12, 12]} align="middle" className={styles.filtersRow}>
                <Col xs={12} lg={2}>
                    <div className={styles.fieldLabel}>{t("system_log.label.log_date")}</div>
                </Col>
                <Col xs={24} lg={4}>
                    <DatePicker
                        value={search.date ? dayjs(search.date) : null}
                        onChange={(date, dateString) => { setSearch(prev => ({ ...prev, date: dateString })) }}
                        className={styles.searchPill}
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <div className={styles.fieldLabel}>{t("system_log.label.username")}</div>
                </Col>
                <Col xs={12} lg={4}>
                    <Input
                        placeholder="Search"
                        value={search.username}
                        onChange={(e) => setSearch(prev => ({ ...prev, username: e.target.value }))}
                        suffix={<SearchOutlined />}
                        className={styles.searchPill}
                        allowClear
                    />
                </Col>
                <Col xs={12} lg={2}>
                    <div className={styles.fieldLabel}>{t("system_log.label.action")}</div>
                </Col>
                <Col xs={12} lg={4}>
                    <Input
                        placeholder="Search"
                        value={search.activity}
                        onChange={(e) => setSearch(prev => ({ ...prev, activity: e.target.value }))}
                        suffix={<SearchOutlined />}
                        className={styles.searchPill}
                        allowClear
                    />
                </Col>
                <Col xs={24} lg={2}>
                    <Button type="primary" className={styles.btnPill} onClick={onClick} >
                        Search
                    </Button>
                </Col>
            </Row>
            ) : (
                <Row gutter={[12, 12]} align="middle" className={styles.filtersRow}>
                    <Col xs={12} lg={2}>
                        <div className={styles.fieldLabel}>{t("system_log.label.log_date")}</div>
                    </Col>
                    <Col xs={24} lg={4}>
                        <DatePicker
                            value={search.date ? dayjs(search.date) : null}
                            onChange={(date, dateString) => { setSearch(prev => ({ ...prev, date: dateString })) }}
                            className={styles.searchPill}
                        />
                    </Col>
                    <Col xs={12} lg={2}>
                        <div className={styles.fieldLabel}>{t("system_log.label.file_name")}</div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Input
                            placeholder="Search"
                            value={search.fileName}
                            onChange={(e) => setSearch(prev => ({ ...prev, fileName: e.target.value }))}
                            suffix={<SearchOutlined />}
                            className={styles.searchPill}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} lg={2}>
                        <Button type="primary" className={styles.btnPill} onClick={onClick} >
                            Search
                        </Button>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default SystemLogSearch;