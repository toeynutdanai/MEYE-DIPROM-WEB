import { Checkbox, Descriptions, Divider, Image, Row, Space, Spin } from "antd";
import { Form, Formik } from "formik";

import { useTranslation } from "react-i18next";

import { Button } from "components/elements";

import { MainLayout } from "components/layouts";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PatientList.module.css";
import { BloodPressureChart } from "./BloodPressureChart";
import BloodPressureList from "components/elements/List/BloodPressureList";
import { key } from "localforage";

const Patient = ({
  patient,
  bloodPressureList,
  isLoading = false,
  onCheckboxChange = () => {},
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sortedBloodPressureList = [...bloodPressureList].sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

  const formatDate = (date) => {
    return moment.utc(date).utcOffset('+0700')
      .add(543, 'years')
      .format("HH:mm:ss - DD/MM/YYYY");
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  const items = [
    {
      key: '1',
      label: t("patient.label.hn"),
      children: <p>{patient?.hospitalNumber}</p>,
    },
    {
      key: '2',
      label: t("patient.label.full_name"),
      children: <p>{`${patient?.firstName} ${patient?.lastName}`}</p>,
    },
    {
      key: '3',
      label: t("patient.label.phone"),
      children: <p>{patient?.phoneNumber}</p>,
    },
    {
      key: '4',
      label: t("patient.label.email"),
      children: <p>{patient?.email}</p>,
    },
    {
      key: '5',
      label: t("patient.label.line_name"),
      children: <p>{patient?.lineName}</p>,
    },
    {
      key: '6',
      label: t("patient.label.role"),
      children: <p>{patient?.roles && patient.roles.length > 0 ? patient.roles[0].name : '-'}</p>,
    },
    {
      key: '7',
      label: t("patient.label.gender"),
      children: <p>{patient?.gender === "male" ? t("patient.label.male") : t("patient.label.female") }</p>,
    },
    {
      key: '8',
      label: t("patient.label.age"),
      children: <p>{patient?.age}</p>,
    },
    {
      key: '8',
    },
    {
      key: '9',
      label: t("patient.label.createBy"),
      children: <p>{patient?.createBy ? `${patient.createBy.firstName} ${patient.createBy.lastName}` : '-'}</p>,
    },
    {
      key: '10',
      label: t("patient.label.createDate"),
      children: <p>{formatDate(patient?.createDate)}</p>,
    },
    {
      key: '11',
    },
    {
      key: '12',
      label: t("patient.label.updateBy"),
      children: <p>{patient?.updateBy ? `${patient.updateBy.firstName} ${patient.updateBy.lastName}` : '-'}</p>,
    },
    {
      key: '13',
      label: t("patient.label.updateDate"),
      children: <p>{formatDate(patient?.updateDate)}</p>,
    },
    {
      key: '14',
    },
    {
      key: '15',
      label: t("patient.label.status_flag"),
      children: <p>{patient?.statusFlag}</p>,
    },
    {
      key: '16',
      label: t("patient.label.level"),
      children: <p>{patient?.level}</p>,
    },
    {
      key: '17',
      label: t("patient.label.checkState"),
      children: <Checkbox checked={patient?.verified}
      onChange={() => onCheckboxChange(!patient?.verified, patient?.id)}
          style={{ cursor: "pointer"}}
      />,
    },
  ];

  return (
    <MainLayout
      title={t("patient.header")}
      breadcrumb={[
        { title: t("home.header"), link: "/" },
        { title: t("patient.header"), link: "/patient" },
        { title: `${patient?.firstName} ${patient?.lastName}`, link: `/patient/${patient?.id}` },
      ]}
    >
      <div className={styles.container}>
        <Formik
          initialValues={{

          }}
          enableReinitialize
          onSubmit={""}
          validationSchema={""}
        >
          {({ setFieldValue, setTouched }) => {
            return (
              <Form>
                <Space
                  direction="vertical"
                  size={24}
                  style={{ maxWidth: "100%", width: "100%" }}
                >
                  <Row justify="end">
                    <Space size={20}>
                      <Button
                        type="secondary"
                        onClick={() => navigate("/patient")}
                      >
                        {t("common.cancel").toUpperCase()}
                      </Button>
                    </Space>
                  </Row>
                  <Spin spinning={isLoading}>
                    <div className="card">
                      <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", padding: "0 12px" }}
                      >
                        <Row justify="center">
                          <Image
                            width={200}
                            src={patient?.pictureUrl}
                          />
                          <Divider />
                          <Descriptions size={'default'} title=<h2>{t("patient.info")}</h2> items={items} />
                          <Divider />
                        </Row>
                        <h2>
                          {t(
                            "blood_pressure.label.blood_pressure_information"
                          )}
                        </h2>
                        <BloodPressureChart dataList={bloodPressureList} />
                        <BloodPressureList
                          height={"24.5rem"}
                          data={sortedBloodPressureList}
                          totalDataCount={bloodPressureList.length}
                          boolean={true}
                        />
                      </Space>
                    </div>
                  </Spin>
                </Space>
              </Form>
            );
          }}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default Patient;
