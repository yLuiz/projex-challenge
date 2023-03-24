interface Image {
  id: number;
  name: string;
  propertyId: number;
}


export interface IPropertyResponse {
  id?: number;
  title: string;
  register: string;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number;
  propertyProfit: number;
  propertyProfitPercent: number;
  PropertyImage: Image[]
}

export interface IPropertyRequest {
  id?: number;
  title: string;
  register: string;
  salePrice: number;
  purchasePrice: number;
  propertyStatusId?: number;
  images: File[]
}

export interface IPropertyForm {
  id?: number;
  title: string;
  register: string;         
  salePrice: number;        
  purchasePrice: number;       
  status?: number; 
  images: FileList
}