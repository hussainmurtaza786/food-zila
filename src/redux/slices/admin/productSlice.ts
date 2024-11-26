// import { createSlice } from "@reduxjs/toolkit";
// type Product={
//     title:string,
//     price:Number,
//     description:string,
//     imgUrl:string
// }
// const ADMIN_USER_CONNECTION_STRING = `http://localhost:3000/api/admin/products`;
// export async function addProduct({ description,imgUrl,title,price }:Product) {
//     const usersRes = await fetch(ADMIN_USER_CONNECTION_STRING)
//     if (!usersRes.ok) { throw new Error('Something went wrong') }
//     const users = await usersRes.json() || [];

//     // checking if user already exist
    
//     const newUser = { description,imgUrl,title,price };
//     users.push(newUser);

//     const addNewUserRes = await fetch(ADMIN_USER_CONNECTION_STRING), {
//         method: 'PUT',
//         body: JSON.stringify(users)
//     }

//     if (!addNewUserRes.ok) {
//         throw new Error('Sending card data failed.')
//     }
//     const res = await addNewUserRes.json();
//     console.log("signup-response", res);
//     return newUser;
// }
// const productSlice = createSlice({
//     name:"product",
//     initialState:"",
//     reducers:{

//     }
// })