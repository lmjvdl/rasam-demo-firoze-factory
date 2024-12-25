import Chamfer from '@/components/Chamfer/Chamfer'
import MainCard from '@/components/CustomContiner/MainCard';
import React from 'react'

const page = () => {
  return (
    <MainCard sx={{ gap: 1, flexDirection: "row" }}>
      <Chamfer />
      <Chamfer on={false} />
      <Chamfer />
      <Chamfer />
    </MainCard>
  );
}

export default page