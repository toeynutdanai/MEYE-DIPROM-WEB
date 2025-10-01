import { Table,Checkbox } from "antd";
import alert from "components/elements/Alert";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useState, useEffect,useMemo} from "react";

const RoleTable = ({
    isLoading = false,
    dataSource={},
    columns={}
    // permissionList = [],
    // roleList = [],
    // mappingList = [],
}) => {
  //   const [rolePermissions, setRolePermissions] = useState([]);
    
  //   useEffect(() => {

  //     const initialRolePermissions = roleList.reduce((acc, role) => {
  //       acc[role.roleCode] = new Set(
  //         mappingList
  //           .filter(map => map.roleCode === role.roleCode)
  //           .map(map => map.permissionCode)
  //       );
  //       return acc;
  //     }, {});

  //     if(Object.keys(initialRolePermissions).length > 0){
  //       setRolePermissions(initialRolePermissions)
  //     }
      
  //  }, [roleList]);
    

  //   const handleCheckboxChange = (roleCode, permissionCode) => {
  //       setRolePermissions(prevPermissions => {
  //           const newPermissions = { ...prevPermissions };
  //           const permissionsSet = newPermissions[roleCode];
  //           if (permissionsSet.has(permissionCode)) {
  //               permissionsSet.delete(permissionCode);
  //           } else {
  //               permissionsSet.add(permissionCode);
  //           }
  //           return newPermissions;
  //       });
  //       console.log(rolePermissions);
  //   };

    // const [mapping, setMapping] = useState([]);
    // useEffect(() => {
    //   setMapping(mappingList);
    // }, [mappingList]);

    // const handleCheckboxChange = (roleCode, permissionCode) => {
    //     setMapping(prevPermissions => {
    //         const newPermissions = { ...prevPermissions };
    //         const permissionsSet = newPermissions[roleCode];
    //         if (permissionsSet.has(permissionCode)) {
    //             permissionsSet.delete(permissionCode);
    //         } else {
    //             permissionsSet.add(permissionCode);
    //         }
    //         return newPermissions;
    //     });
    //     console.log(mapping)
    // };

//     const handleCheckboxChange = (roleCode, permissionCode) => {
//   setMapping((prev) => {
//     const exists = prev.some(
//       (item) =>
//         item.roleCode === roleCode && item.permissionCode === permissionCode
//     );

//     if (exists) {
//       // ลบออก
//       return prev.filter(
//         (item) =>
//           !(item.roleCode === roleCode && item.permissionCode === permissionCode)
//       );
//     } else {
//       // เพิ่มเข้าไป
//       return [...prev, { roleCode, permissionCode }];
//     }
//   });
//   console.log(mapping)
// };

  //   const childPermissionsMap = permissionList.reduce((acc, perm) => {
  //       if (perm.parentCode) {
  //           if (!acc[perm.parentCode]) {
  //               acc[perm.parentCode] = [];
  //           }
  //           acc[perm.parentCode].push(perm);
  //       }
  //       return acc;
  //   }, {});

  // const columns = [
  //   {
  //     title: <div className="text-table"></div>,
  //     dataIndex: "permissionName",
  //     key: "permissionName",
  //     // sorter: (a, b) => a.permissionCode.localeCompare(b.permissionCode),
  //     // render: (_, record) => {
  //     //   return record.permissionCode;
  //     // }
  //   },
  //   ...roleList.map(role => ({
  //       title: role.roleName,
  //       dataIndex: role.roleCode,
  //       key: role.roleCode,
  //       align: 'center',
  //       render: (text, record) => {
  //           if (record.children) {
  //                   return null;
  //               }
  //               const isChecked = rolePermissions[role.roleCode]?.has(record.permissionCode) ?? false;
  //               return <Checkbox checked={isChecked} 
  //                   onChange={() => handleCheckboxChange(role.roleCode, record.permissionCode)}
  //                />;
  //       },
  //   })),
  // ];

  // const dataSource = permissionList
  //   .filter(perm => !perm.parentCode) // กรองเอาเฉพาะเมนูหลัก
  //   .sort((a, b) => a.seqNo - b.seqNo)
  //   .map(parentPerm => {
  //       const children = (childPermissionsMap[parentPerm.permissionCode] || [])
  //           .sort((a, b) => a.seqNo - b.seqNo)
  //           .map(childPerm => ({
  //               key: childPerm.permissionCode,
  //               ...childPerm,
  //           }));

  //       return {
  //           key: parentPerm.permissionCode,
  //           ...parentPerm,
  //           children: children.length > 0 ? children : undefined, // เพิ่ม children array ถ้ามีรายการย่อย
  //       };
  //   });

  // const dataSource = useMemo(() => {
  //       const childPermissionsMap = permissionList.reduce((acc, perm) => {
  //           if (perm.parentCode) {
  //               if (!acc[perm.parentCode]) {
  //                   acc[perm.parentCode] = [];
  //               }
  //               acc[perm.parentCode].push(perm);
  //           }
  //           return acc;
  //       }, {});

  //       return permissionList
  //           .filter(perm => !perm.parentCode)
  //           .sort((a, b) => a.seqNo - b.seqNo)
  //           .map(parentPerm => {
  //               const children = (childPermissionsMap[parentPerm.permissionCode] || [])
  //                   .sort((a, b) => a.seqNo - b.seqNo)
  //                   .map(childPerm => ({
  //                       key: childPerm.permissionCode,
  //                       ...childPerm,
  //                   }));
                
  //               return {
  //                   key: parentPerm.permissionCode,
  //                   ...parentPerm,
  //                   children: children.length > 0 ? children : undefined,
  //               };
  //           });
  //   }, [permissionList]);

    // ใช้ useMemo เพื่อคำนวณ columns ใหม่เฉพาะเมื่อ roles หรือ rolePermissions เปลี่ยน
    // const columns = useMemo(() => {
    //     return [
    //         {
    //             title: '',
    //             dataIndex: 'permissionName',
    //             key: 'permissionName',
    //         },
    //         ...roleList.map(role => ({
    //             title: role.roleName,
    //             dataIndex: role.roleCode,
    //             key: role.roleCode,
    //             align: 'center',
    //             render: (text, record) => {
    //                 if (record.children) {
    //                     return null;
    //                 }
    //                 const isChecked = rolePermissions[role.roleCode]?.has(record.permissionCode) ?? false;
    //                 return (
    //                     <Checkbox
    //                         checked={isChecked}
    //                         onChange={() => handleCheckboxChange(role.roleCode, record.permissionCode)}
    //                     />
    //                 );
    //             },
    //         })),
    //     ];
    // }, [roleList,rolePermissions]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      loading={isLoading}
      scroll={false}
      bordered={false}
      size="large"
      expandable={{
        defaultExpandAllRows: true,
        expandIcon: () => null,
    }}
    />

  );
 
};

export default RoleTable;
