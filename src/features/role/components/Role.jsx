import { MainLayout } from "components/layouts";
import React from "react";
import { useTranslation } from "react-i18next";
import {  Space, Card} from "antd";
import {CheckOutlined } from "@ant-design/icons";
import styles from "../styles/Role.module.css";
import { useState, useEffect, useMemo } from "react";
import RoleTable from "components/table/RoleTable";

const RoleComponents = ({
    isLoading = false,
    permissionList = [],
    roleList = [],
    mappingList = [],
    onSubmit = () => { },

}) => {

    const { t } = useTranslation();

    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {

        const initialRolePermissions = roleList.reduce((acc, role) => {
            acc[role.roleCode] = new Set(
                mappingList
                    .filter(map => map.roleCode === role.roleCode)
                    .map(map => map.permissionCode)
            );
            return acc;
        }, {});

        if (Object.keys(initialRolePermissions).length > 0) {
            setRolePermissions(initialRolePermissions)
        }

    }, [roleList]);


    const handleCheckboxChange = (roleCode, permissionCode) => {
        setRolePermissions(prevPermissions => {
            const newPermissions = { ...prevPermissions };
            const permissionsSet = newPermissions[roleCode];
            if (permissionsSet.has(permissionCode)) {
                permissionsSet.delete(permissionCode);
            } else {
                permissionsSet.add(permissionCode);
            }
            return newPermissions;
        });
        console.log(rolePermissions);
    };

    const handleSave = () => {
        const updatedMapping = [];
        for (const roleCode in rolePermissions) {
            rolePermissions[roleCode].forEach(permissionCode => {
                updatedMapping.push({ roleCode, permissionCode });
            });
        }
        console.log('Saving data:', updatedMapping);
        onSubmit(updatedMapping);
    };


      const childPermissionsMap = permissionList.reduce((acc, perm) => {
        if (perm.parentCode) {
            if (!acc[perm.parentCode]) {
                acc[perm.parentCode] = [];
            }
            acc[perm.parentCode].push(perm);
        }
        return acc;
    }, {});


    const columns = useMemo(() => {
        const sortedRoles = [...roleList].sort((a, b) => a.seqNo - b.seqNo);
        return [
            {
                title: '',
                dataIndex: 'permissionName',
                key: 'permissionName',
            },
            ...sortedRoles.map(role => ({
                title: role.roleName,
                dataIndex: role.roleCode,
                key: role.roleCode,
                align: 'center',
                render: (text, record) => {
                    if (record.children) {
                        return null;
                    }
                    const isChecked = rolePermissions[role.roleCode]?.has(record.permissionCode) ?? false;
                   
                    return ( isChecked ? <CheckOutlined className={styles.checkbox}/> : <div/>
                        // <Checkbox
                        //     disabled={true}
                        //     checked={isChecked}
                        //     onChange={() => handleCheckboxChange(role.roleCode, record.permissionCode)}
                        // />
                );
                },
            })),
        ];
    }, [roleList,rolePermissions]);

    const dataSource = useMemo(() => {
        const childPermissionsMap = permissionList.reduce((acc, perm) => {
            if (perm.parentCode) {
                if (!acc[perm.parentCode]) {
                    acc[perm.parentCode] = [];
                }
                acc[perm.parentCode].push(perm);
            }
            return acc;
        }, {});

        return permissionList
            .filter(perm => !perm.parentCode)
            .sort((a, b) => a.seqNo - b.seqNo)
            .map(parentPerm => {
                const children = (childPermissionsMap[parentPerm.permissionCode] || [])
                    .sort((a, b) => a.seqNo - b.seqNo)
                    .map(childPerm => ({
                        key: childPerm.permissionCode,
                        ...childPerm,
                    }));
                
                return {
                    key: parentPerm.permissionCode,
                    ...parentPerm,
                    children: children.length > 0 ? children : undefined,
                };
            });
    }, [permissionList]);

    return (
        <MainLayout
            title={t("role.header")}
            breadcrumb={[
                { title: t("home.header"), link: "/" },
                { title: t("role.header") },
            ]}
        >
            <Space className={styles.container} direction="vertical" size={24}>
                {isLoading ? (
                    <div />
                ) : (
                    <Card className={styles.container}>
                        <h3>{t("role.header")}</h3>
                        <Space className={styles.container} direction="vertical" size={24}>
                            <RoleTable
                                columns={columns}
                                isLoading={isLoading}
                                dataSource={dataSource}
                            />
                            
                        </Space>
                    </Card>
                )
                }
            </Space>
        </MainLayout >
    );
}

export default RoleComponents;