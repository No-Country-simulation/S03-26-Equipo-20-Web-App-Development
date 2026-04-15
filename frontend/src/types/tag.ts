export interface Tag {
  id: string;
  name: string;
  organizationId: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagPage {
  content: Tag[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}

export interface CreateTagPayload {
  name: string;
}

export interface UpdateTagPayload {
  name: string;
}
