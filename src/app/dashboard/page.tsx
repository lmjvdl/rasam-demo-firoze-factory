import MainCard from "@/components/CustomContiner/MainCard";
import UserRoute from "@/components/routers/UserRoute";

interface Props {
  children: React.ReactNode;
}

const UserPanel = ({ children }: Props) => {
  return (
    <UserRoute>
      <MainCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </MainCard>
    </UserRoute>
  );
};

export default UserPanel;
