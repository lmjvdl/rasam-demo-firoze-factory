import MainCard from "@/components/customContiner/MainCard";

export default function ChamferLayout({ children }: { children: React.ReactNode }) {
    return (
      <MainCard>
        {children}
      </MainCard>
    );
}