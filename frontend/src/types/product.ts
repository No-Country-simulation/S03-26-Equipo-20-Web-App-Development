export interface Product {
  name: string;
  description: string;
  picture: File | null;
  tags: string[];
};

export interface EditProduct {
  id: string;
  name: string;
  description: string;
  picture: File | null;
  tags: string[];
};

export interface ListProducts {
  id: string;
  name: string;
  description: string;
  picture: string;
  tags: { id: string; name: string; usageCount: number }[];
};

export interface ProductDetail {
  id: string;
  product: Product;
};

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  active?: boolean;
};

export interface ListProductsCardProps {
  product: ListProducts;
  // name: string;
  // tag: string;
  // description: string;
  // updateTime: string;
  // picture: string;
  onDelete?: () => void;
};

export interface ProductDetailCardProps {
  product: {
    name: string;
    description: string;
    picture: string | null;
    tags: { id: string; name: string; usageCount: number }[];
  };
};