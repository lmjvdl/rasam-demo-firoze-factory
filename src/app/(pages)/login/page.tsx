// "use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import MainCard from "@/components/CustomContiner/MainCard";
import DynamicTabs from "@/components/Tabs/tabs";

export default function Home() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // وقتی وضعیت لودینگ تموم شد و کاربر لاگین نکرده باشه، به صفحه لاگین هدایت کن.
  // useEffect(() => {
  //   if (status !== "loading" && !session) {
  //     router.push("/login");
  //   }
  // }, [session, status, router]);

  // if (status === "loading") {
  //   return <p>در حال بارگذاری...</p>;
  // }

  // // فرض می‌کنیم توکن در session ذخیره شده، مثلا به عنوان session.token یا session.accessToken
  // const hasPremission = session?.token || session?.accessToken;

  const testPartiotionData = [
    {
      name: "/packaging",
      value: 0,
      label: "بسته بندی",
    },
    {
      name: "/strusher",
      value: 1,
      label: "سنگ شکن",
    },
  ];

  return (
    <MainCard>
      {/* <DynamicTabs options={testPartiotionData} token={hasPremission} /> */}
      <DynamicTabs options={testPartiotionData} />
    </MainCard>
  );
}
