import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
// const URL = `https://eistore-dashboard-qhasd7nfm-eisas-projects.vercel.app/api/9986f653-6b60-4fe2-92fe-fe110e4f8441/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, {
      cache: "no-store",
    });

    // إذا كانت الاستجابة غير ناجحة، قم بطباعة الخطأ
    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("Error fetching categories:", errorMessage);
    }

    // تحويل الاستجابة إلى JSON
    return await res.json();
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export default getCategories;
