export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  active?: boolean;
};

export interface ProductCardProps {
  title: string;
  tag: string;
  description: string;
  updateTime: string;
};