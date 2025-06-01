"use client";

import React, { useEffect, useState } from "react";
import useImageList, { ResponseSchema } from "./hooks/useView";
import { PrevDataInitial } from "@/interfaces/user/general/general";
import { columns } from "./ColumnsData";
import ImageUploadTable from "./ImageUploadTable";
import gregorianToJalali from "@/utils/formatters/isoDateToSolarDate";

const AllContentImageUpload: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = useImageList(pageNumber, 8, nextPage);

  useEffect(() => {
    getList.mutate({ page: pageNumber + 1, page_size: 8, url: nextPage }, {
      onSuccess: (information) => {
        const transformedData = information.data.results.map(item => ({
          ...item,
          uploaded_at: gregorianToJalali(item.uploaded_at),
          theme: item.theme === "dark" ? "تیره" : item.theme === "light" ? "روشن" : "",
        }));

        setData({
          ...information,
          data: {
            ...information.data,
            results: transformedData
          }
        });

        setTotalData(information.data.count);
        setNextPage(information.data.next);
      },
    });
  }, [pageNumber]);

  const handlePagination = (newPage: number) => {
    setPageNumber(newPage);
    getList.mutate({ page: newPage + 1, page_size: 8, url: nextPage });
  };

  const dynamicColumns = columns();

  return (
    <>
      <ImageUploadTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
      />
    </>
  );
};

export default AllContentImageUpload;
