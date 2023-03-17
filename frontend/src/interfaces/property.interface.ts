export interface IPropertyResponse {
  id?: number;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number; 
  propertyImages: string[]
}

export interface IPropertyRequest {
  id?: number;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number; 
  images: File[]
}