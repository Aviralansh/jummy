import axios from "axios";

const USER_API_URL = "http://localhost:9090/users";

export const getAllUsers = () => { //user cant access this
        return axios.get(
            USER_API_URL + "/all",
         {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }           
        
        );
    }

export const registerUser = (user) => { //done
        return axios.post(
            USER_API_URL + "/register", 
            user,
        {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );
};

    

 export const deleteUser = (id) => {
        return axios.delete(
            USER_API_URL+"/delete/"+ id,
                    {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
        );
    }
export const updateUsers = (id, user) => {
    return axios.put(
        USER_API_URL + "/update/" + id,
        user,
                {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );
    }
export const getUserById = (id) => {
    return axios.get(
        USER_API_URL + "/userId/" + id ,

               {
            auth: {
                username: "user",
                password: "user123"
            }
        }
    );
    }

export const getUserByEmail = (email) => {

    return axios.get(
        USER_API_URL + "/email/" + email ,
                {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );

}

export const getUserByName = (name) => {

    return axios.get(
        USER_API_URL + "/name/" + name ,
                {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );

}


export const getUserByPhoneNumber = (phonenumber) => {

    return axios.get(
        USER_API_URL + "/phone/" + phonenumber ,
                {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );

}

export const getAllOrders = () => {

    return axios.get(
        USER_API_URL + "/orders" , 
                {
            auth: {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password")
            }
        }
    );

}
 
