import UserRoute from "@/components/routers/UserRoute";

interface Props {
  children: React.ReactNode;
}

const UserPanel = ({ children }: Props) => {
  return (
    <UserRoute>
        {children}
    </UserRoute>
  );
};

export default UserPanel;
