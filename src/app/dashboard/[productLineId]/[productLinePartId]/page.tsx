'use client';

import { use, useEffect } from 'react';
import { useProductLineStore } from '@/hooks/context/productLineStore';
import { useFetchAndSyncProductLines } from '@/hooks/user/useProductLineInfo';

type PageProps = {
  params: Promise<{
    productLineId: string;
    productLinePartId: string;
  }>;
};

export default function ProductLinePage({ params }: PageProps) {
  const { productLineId, productLinePartId } = use(params);
  const { companies, loading } = useProductLineStore();
  
 useFetchAndSyncProductLines();


  return (
    <div>
      <h1>Product Line Page</h1>
      <p><strong>Product Line ID:</strong> {productLineId}</p>
      <p><strong>Product Line Part ID:</strong> {productLinePartId}</p>

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <ul>
          {companies.map((company) => (
            <li key={company.company_id}>{company.company_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
