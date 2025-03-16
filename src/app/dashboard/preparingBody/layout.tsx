import MainCard from "@/components/customContiner/MainCard";

export default function PreparingBodyLayout({ children }: { children: React.ReactNode }) {
    return (
      <MainCard>
        {children}
      </MainCard>
    );
  }
  