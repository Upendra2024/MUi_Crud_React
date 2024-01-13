import axios from "axios";

const url = "http://localhost:3005/products";

//get data
export async function getData() {
  return await axios.get(url);
}

//delete data

export async function deleteData(id) {
  return await axios.delete(`${url}/${id}`);
}
//post data
export async function postData(data) {
  return await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//put data
export async function putData(id, data) {
  return await axios.put(url + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
