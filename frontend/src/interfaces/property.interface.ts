interface Image {
  id: number;
  name: string;
  propertyId: number;
}


export interface IPropertyResponse {
  id?: number;
  title: string;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  propertyStatusId?: number; 
  PropertyImage: Image[]
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

export interface IPropertyForm {
  id?: number;
  title: string;
  register: number;         
  salePrice: number;        
  purchasePrice: number;       
  status?: number; 
  images: FileList
}