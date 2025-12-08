export interface user {
    id?:        number;
    full_name:  string;
    email:     string;
    roleId?:    number;
    age?:       string;
    curp:      string;
    password?:  string;
    createdAt?: Date;
    updatedAt?: Date;
}