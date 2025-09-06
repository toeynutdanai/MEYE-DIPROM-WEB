/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Space } from "antd";
import cx from "classnames";
import i18n from "i18n";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import EN from "./EN.json";
import TH from "./TH.json";

import styles from "./LanguageSwitcher.module.css";

const LANGUAGE_OPTIONS = [
  { flag: "data:image/png;base64, " + EN, label: "ENGLISH", value: "en" },
  // { flag: "data:image/png;base64, " + TH, label: "ภาษาไทย", value: "th" },
];

function LanguageSwitcher({ className = "" }) {
  const [initialized, setInitialized] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleChange = useCallback((lng) => {
    setLanguage(lng);
    window.localStorage.setItem("lang", lng);
    i18n.changeLanguage(lng);
  }, []);

  const selectedLanguage = useMemo(() => {
    return (
      LANGUAGE_OPTIONS.find((opt) => opt.value === language) ||
      LANGUAGE_OPTIONS[0]
    );
  }, [language]);

  useEffect(() => {
    const defaultLng = window.localStorage.getItem("lang") || "en";
    setLanguage(defaultLng);
    setInitialized(true);
  }, []);

  if (initialized) {
    return (
      <Dropdown
        bordered={false}
        className={cx(styles.customStyle, className)}
        defaultValue={language}
        menu={{
          items: LANGUAGE_OPTIONS.map((opt) => ({
            key: opt.value,
            label: (
              <Space onClick={() => handleChange(opt.value)}>
                <img
                  src={opt.flag}
                  alt={opt.value}
                  aria-label={opt.value}
                  width={40}
                  height="auto"
                />
                {opt.label}
              </Space>
            ),
          })),
        }}
        size="large"
        style={{ width: 120 }}
        value={language}
      >
        <Space>
          <img
            src={selectedLanguage.flag}
            className={styles.flag}
            alt={language}
            aria-label={language}
            width={40}
            height="auto"
          />
          {selectedLanguage.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    );
  }

  return <Fragment />;
}

export default LanguageSwitcher;
