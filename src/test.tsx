// test.tsx
import { db } from "./firebase"; // Đường dẫn đến file firebase.js của bạn
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react"; // Thêm import React và useState, useEffect

const TestPage: React.FC = () => {
  const [userList, setUserList] = useState<any[]>([]); // Sử dụng useState để lưu danh sách người dùng

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users"); // Lấy collection 'users'
      const userSnapshot = await getDocs(usersCollection); // Lấy dữ liệu
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Chuyển đổi dữ liệu thành danh sách

      setUserList(userList); // Cập nhật danh sách người dùng
    } catch (error) {
      console.error("Error fetching users: ", error); // Xử lý lỗi
    }
  };

  useEffect(() => {
    getUsers(); // Gọi hàm getUsers khi component được render
  }, []); // Chạy 1 lần khi component được mount

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user.id}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// import { doc, getDoc } from "firebase/firestore";

// const fetchUserData = async (uid) => {
//   const userDoc = await getDoc(doc(db, "users", uid));
//   if (userDoc.exists()) {
//     const userData = userDoc.data();
//     console.log("Thông tin người dùng:", userData);
//   } else {
//     console.log("Không tìm thấy thông tin người dùng.");
//   }
// };
// fetchUserData(user.uid);

// import { doc, updateDoc } from "firebase/firestore";
// const uid = "12345"; // UID của người dùng bạn muốn cập nhật
// const newUserData = { name: "Tên mới", email: "email@example.com" }; // Dữ liệu mới

// updateUserData(uid, newUserData);

export default TestPage;
