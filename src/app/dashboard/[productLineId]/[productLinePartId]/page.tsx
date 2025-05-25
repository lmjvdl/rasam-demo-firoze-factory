// app/dashboard/[productLineId]/[productLinePartId]/page.tsx

import { useProductLineStore } from "@/hooks/context/productLineStore";
import { useMemo } from "react";

interface PageProps {
  params: {
    productLineId: string;
    productLinePartId: string;
  };
}

export default function ProductLinePage({ params }: PageProps) {
  const { productLineId, productLinePartId } = params;
  const { companies, loading } = useProductLineStore();

  const allProductLines = useMemo(() => {
    return companies.flatMap((company) => company.product_lines);
  }, [companies]);

  const line = allProductLines.find((l) => l.id.toString() === productLineId);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!line) return <p>خط تولید پیدا نشد</p>;

  return (
    <div>
      <h1>خط تولید: {line.name}</h1>
      <p>شناسه بخش: {productLinePartId}</p>
    </div>
  );
}
