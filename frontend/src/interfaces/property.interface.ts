export interface IPropertyResponse {
  id?: number;
  title: string;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number; 
  propertyImages: string[]
}

export interface IPropertyRequest {
  id?: number;
  title: string;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number; 
  images: File[]
}