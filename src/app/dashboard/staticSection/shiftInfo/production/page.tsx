import MainCard from "@/components/customContiner/MainCard";
import ProtectedRoute from "@/components/routers/FillInformationRouter";

const ProductionPage = () => {
  return (
    <ProtectedRoute requiredPermissions={[1, 2]}>
      <MainCard>
        <div>این محتوا فقط برای کاربران با دسترسی خاص نمایش داده می‌شود</div>
      </MainCard>
    </ProtectedRoute>
  );
};

export default ProductionPage;
