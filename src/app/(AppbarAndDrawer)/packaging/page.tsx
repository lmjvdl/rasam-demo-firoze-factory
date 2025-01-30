import DynamicTabs from "@/components/Tabs/tabs";

const Packaging = () => {
  const testPartiotionData = [
    {
      name: "/packaging/live",
      value: 0,
      label: "بسته بندی",
    },
    {
      name: "/packaging/fill-information",
      value: 1,
      label: "تکمیل اطلاعات شیفت",
    },
  ];
  return (
    <>
      <DynamicTabs options={testPartiotionData}></DynamicTabs>
    </>
  );
};

export default Packaging;
