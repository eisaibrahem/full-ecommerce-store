import { Store } from "@/types"; // تأكد من أن لديك النوع المناسب

const URL = `${process.env.NEXT_PUBLIC_API_URL}/store`; // التأكد من استخدام المسار الصحيح

const getStore = async (): Promise<Store> => {
  const res = await fetch(`${URL}`, {
    cache: "no-store", // هذا يلغي التخزين المؤقت
  });

  if (!res.ok) {
    throw new Error("Failed to fetch store"); // معالجة الأخطاء
  }

  const store = await res.json();

  return store;
};

export default getStore;
