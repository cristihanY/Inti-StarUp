export interface User {
    id: string;
    name: string;
    lastName: string;
    numberPhone: any;
    address: string;
    email: string;
    password: string;
    conditionCliente: boolean;
    city: string;
    district: string;
    postalCod: string;
    rolClient: string;



  }
  
  export interface CreateUserDTO extends User{

  }