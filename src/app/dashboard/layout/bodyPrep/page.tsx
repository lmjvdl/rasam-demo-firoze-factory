"use client";

import MainCardLayoutBodyPrep from "@/components/customContiner/MainCardLayoutBodyPrep";
import { iconMapLayout } from "@/utils/icons/LayoutIcon";
import { Box } from "@mui/material";

const BodyPrepLayout = () => {
  const BaalMillbatch = iconMapLayout["BatchBaalMill"];
  const BaalMillContinues = iconMapLayout["ContinuesBallMill"];
  const GranuleSillo = iconMapLayout["GranuleSillo"];
  const SlurryPit = iconMapLayout["SlurryPit"];
  const SlurryPump = iconMapLayout["SlurryPump"];
  const SprayDryer = iconMapLayout["SprayDryer"];
  const VibratingScreen = iconMapLayout["VibratingScreen"];

  return (
    <MainCardLayoutBodyPrep>
      {/* SlurryPit - سبز چپ صفحه */}
      <Box sx={{ position: "absolute", top: 100, left: 100 }}>
        <SlurryPit />
      </Box>

      {/* SprayDryer - آبی وسط */}
      <Box sx={{ position: "absolute", top: 100, left: 600 }}>
        <SprayDryer />
      </Box>

      {/* SlurryPump - سبز خردلی بالا */}
      <Box sx={{ position: "absolute", top: 50, left: 620 }}>
        <SlurryPump />
      </Box>
      <Box sx={{ position: "absolute", top: 50, left: 680 }}>
        <SlurryPump />
      </Box>

      {/* BaalMillbatch - قرمز بالا */}
      <Box sx={{ position: "absolute", top: 20, left: 1200 }}>
        <BaalMillbatch />
      </Box>
      <Box sx={{ position: "absolute", top: 20, left: 1300 }}>
        <BaalMillbatch />
      </Box>

      {/* BaalMillContinues - بنفش پایین */}
      <Box sx={{ position: "absolute", top: 1000, left: 600 }}>
        <BaalMillContinues />
      </Box>
      <Box sx={{ position: "absolute", top: 1000, left: 900 }}>
        <BaalMillContinues />
      </Box>

      {/* VibratingScreen - موتورهای بنفش بالای BaalMillContinues */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          sx={{ position: "absolute", top: 900, left: 600 + i * 50 }}
        >
          <VibratingScreen />
        </Box>
      ))}

      {/* GranuleSillo - ۱۲ دایره قرمز سمت راست */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: 200 + i * 50,
            left: 1600,
          }}
        >
          <GranuleSillo />
        </Box>
      ))}
    </MainCardLayoutBodyPrep>
  );
};

export default BodyPrepLayout;
