// pages/dashboard/[itemName].tsx
import { useRouter } from "next/router";
import { useProductLineStore } from "@/hooks/context/productLineStore";
import { useMemo } from "react";

export default function ProductLinePage() {
  const { query } = useRouter();
  const { itemName } = query as { itemName: string };
  const { companies, loading } = useProductLineStore();

  // flatten all product lines from companies
  const allProductLines = useMemo(() => {
    return companies.flatMap((company) => company.product_lines);
  }, [companies]);

  const line = allProductLines.find(
    (l) => l.name.replace(/\s+/g, "").toLowerCase() === itemName
  );

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!line) return <p>خط تولید پیدا نشد</p>;

  return (
    <div>
      <h1>{line.name}</h1>
    </div>
  );
}
