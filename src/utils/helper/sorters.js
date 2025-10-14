/**
 * safeCompare: เปรียบเทียบค่า A กับ B แบบกัน null/undefined
 * - รองรับ number (เปรียบเทียบเชิงตัวเลข)
 * - ถ้าไม่ใช่ตัวเลข จะเปรียบเทียบเป็นสตริงแบบ numeric-aware
 */
export const safeCompare = (va, vb) => {
  if (va == null && vb == null) return 0;
  if (va == null) return 1;   // null/undefined ไปท้าย
  if (vb == null) return -1;

  const na = Number(va);
  const nb = Number(vb);
  const aIsNum = !Number.isNaN(na) && typeof va !== "boolean";
  const bIsNum = !Number.isNaN(nb) && typeof vb !== "boolean";

  if (aIsNum && bIsNum) return na - nb;

  return String(va).localeCompare(String(vb), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

/**
 * cmp(picker): สร้าง comparator จากฟังก์ชันดึงค่าในแถว
 * ใช้กับ antd: { sorter: cmp(r => r.field) }
 */
export const cmp = (picker) => (a, b) => safeCompare(picker(a), picker(b));

/**
 * fieldCmp(field): สร้าง comparator จากชื่อฟิลด์ (สั้น/สะดวก)
 * ใช้กับ antd: { dataIndex: "name", sorter: fieldCmp("name") }
 */
export const fieldCmp = (field) => (a, b) =>
  safeCompare(a?.[field], b?.[field]);

/**
 * numericCmp(picker): บังคับเทียบแบบตัวเลข (ถ้าคอลัมน์เป็นตัวเลขล้วน)
 */
export const numericCmp = (picker) => (a, b) =>
  Number(picker(a)) - Number(picker(b));
