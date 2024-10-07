// src/AuthProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import ThongBao from "../thong_bao/thong_bao";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import { db, auth } from "../firebase"; // Import db và auth
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Định nghĩa kiểu cho giá trị của context
interface AuthContextType {
  isAuthenticated: boolean;
  NameUser: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  AllProducts: (
    numberOfProducts: number,
    categories: string[],
    subCollections: string[]
  ) => Promise<any>; // Cập nhật kiểu dữ liệu
  GetDetailedPetProducts: (pet: string, table: string) => Promise<any>; // Thay đổi kiểu trả về
  getListPet_Type: () => Promise<[string[] | null, string[] | null]>;
}

const findUserKeys = () => {
  const userKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("userInfo-")) {
      userKeys.push(key);
    }
  }
  return userKeys;
};

// Tạo context với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Định nghĩa AuthProvider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getListPet_Type = async (): Promise<
    [string[] | null, string[] | null]
  > => {
    try {
      const petTypeSnapshot = await getDocs(collection(db, "Pet_Type"));
      let pets: string[] = [];
      let types: string[] = [];

      petTypeSnapshot.forEach((doc) => {
        const data: DocumentData = doc.data();
        if (data.pet && Array.isArray(data.pet)) {
          pets = pets.concat(data.pet); // Thêm tất cả các phần tử của mảng `pet` vào `pets`
        }
        if (data.type && Array.isArray(data.type)) {
          types = types.concat(data.type); // Thêm tất cả các phần tử của mảng `type` vào `types`
        }
      });

      // Trả về cả hai mảng, không cần thiết phải kiểm tra độ dài ở đây
      return [pets.length > 0 ? pets : null, types.length > 0 ? types : null];
    } catch (error) {
      console.error("Error fetching pet types:", error);
      return [null, null]; // Trả về null nếu có lỗi
    }
  };
  const AllProducts = async (
    numberOfProducts: number,
    categories: string[],
    subCollections: string[]
  ): Promise<Product[]> => {
    // categories = ["dog", "cat"]; // Các category chính
    const allProducts: Product[] = []; // Đảm bảo kiểu sản phẩm đúng

    try {
      for (const category of categories) {
        // Lấy danh sách các sub-collection cho mỗi category
        //subCollections = ["food", "medicine", "bag", "cage", "shampoo"]; // Tất cả các sub-collection bạn muốn lấy dữ liệu

        for (const subCollection of subCollections) {
          const collectionRef = collection(
            db,
            `products/${category}/${subCollection}`
          );
          const snapshot = await getDocs(collectionRef);

          snapshot.forEach((doc) => {
            if (allProducts.length < numberOfProducts) {
              const data = doc.data(); // Lấy dữ liệu từ tài liệu Firestore

              const product = new Product(
                doc.id,
                data.title,
                data.image,
                data.note,
                data.quantity,
                data.price,
                category, // Truyền category cho thuộc tính pet
                subCollection // Truyền subCollection cho thuộc tính type
              );

              allProducts.push(product); // Thêm sản phẩm vào mảng
            }
          });
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }

    return allProducts.slice(0, numberOfProducts); // Trả về danh sách sản phẩm
  };

  const GetDetailedPetProducts = async (pet: string, table: string) => {
    const petFoodCollectionRef = collection(db, "products", pet, table);
    const foodSnapshot = await getDocs(petFoodCollectionRef);

    // Kiểm tra xem bảng có tồn tại không
    if (foodSnapshot.empty) {
      console.log(`Bảng "${table}" cho thú cưng "${pet}" không tồn tại.`);
      return null; // Trả về null nếu bảng không tồn tại
    }

    const detailedProducts: Product[] = [];

    foodSnapshot.forEach((doc) => {
      const data = doc.data();
      detailedProducts.push(
        new Product(
          doc.id,
          data.title,
          data.image,
          data.note,
          data.quantity,
          data.price,
          data.pet,
          data.type
        )
      ); // Thêm sản phẩm vào danh sách
    });

    return detailedProducts; // Trả về danh sách sản phẩm chi tiết
  };

  const userKeys = findUserKeys();
  const [NameUser, setNameUser] = useState<string | undefined>(() => {
    if (userKeys.length !== 0) {
      return userKeys[0].split("-")[1];
    }
    return undefined;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    NameUser !== undefined
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsAuthenticated(true);
        setNameUser(userData.name);
        localStorage.setItem(
          `userInfo-${userData.name}`,
          JSON.stringify(userData)
        );
        ThongBao.success("Đăng nhập thành công!");
        navigate("/"); // Điều hướng
      } else {
        ThongBao.warning("Không tìm thấy thông tin người dùng.");
      }
    } catch (error: any) {
      // Kiểm tra mã lỗi và thông báo phù hợp
      if (error.code === "auth/user-not-found") {
        ThongBao.error("Không tìm thấy người dùng với email này.");
      } else if (error.code === "auth/wrong-password") {
        ThongBao.error("Mật khẩu không chính xác.");
      } else if (error.code === "auth/invalid-email") {
        ThongBao.error("Email không hợp lệ.");
      } else {
        ThongBao.error("Lỗi đăng nhập: " + error.message);
      }
      console.log("Lỗi đăng nhập: ", error);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lưu thông tin người dùng vào Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      ThongBao.success("Đăng ký thành công!");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        ThongBao.error("Email đã được sử dụng.");
      } else if (error.code === "auth/weak-password") {
        ThongBao.error("Mật khẩu phải có ít nhất 6 ký tự.");
      } else {
        ThongBao.error("Lỗi đăng ký: " + error.message);
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(`userInfo-${NameUser}`);
    setNameUser(undefined);
    ThongBao.show(`Đăng xuất thành công tài khoản ${NameUser}`);
    navigate("/login"); // Điều hướng đến trang đăng nhập sau khi đăng xuất
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        NameUser,
        login,
        logout,
        register,
        AllProducts,
        GetDetailedPetProducts,
        getListPet_Type,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hàm useAuth để sử dụng context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};

// import { collection, doc, setDoc } from "firebase/firestore";

// // Hàm thêm sản phẩm
// const addProduct = async () => {
//   const dogFoodRef = doc(collection(db, "products", "dog", "food"));
//   const dogMedicineRef = doc(collection(db, "products", "dog", "medicine"));
//   const catFoodRef = doc(collection(db, "products", "cat", "food"));
//   const catBagRef = doc(collection(db, "products", "cat", "bag"));
//   const catCageRef = doc(collection(db, "products", "cat", "cage"));
//   const catShampooRef = doc(collection(db, "products", "cat", "shampoo"));

//   // Thêm thức ăn cho chó
//   await setDoc(dogFoodRef, {
//     title: "Thức ăn cho chó",
//     image: "ancho.jpg",
//     note: "Thức ăn cho chó",
//     quantity: "5",
//     price: "150",
//     pet: "dog",
//     type: "food"
//   });

//   // Thêm thuốc cho chó
//   await setDoc(dogMedicineRef, {
//     title: "Trị ve cho chó",
//     image: "trivecho.jpg",
//     note: "Trị ve cho chó",
//     quantity: "5",
//     price: "150"
//     pet: "dog",
//     type: "medicine"
//   });

//   // Thêm thức ăn cho mèo
//   await setDoc(catFoodRef, {
//     title: "Thức ăn cho mèo",
//     image: "anmeo.jpg",
//     note: "Thức ăn cho mèo",
//     quantity: "10",
//     price: "200"
//     pet: "cat",
//     type: "food"
//   });

//   // Thêm balo cho mèo
//   await setDoc(catBagRef, {
//     title: "Balo đựng pet 1",
//     image: "balo1.jpg",
//     note: "Balo đựng pet 1",
//     quantity: "5",
//     price: "150"
//     pet: "cat",
//     type: "bag"
//   });

//   // Thêm chuồng cho mèo
//   await setDoc(catCageRef, {
//     title: "Chuồng cho mèo 1",
//     image: "chuong1.jpg",
//     note: "Chuồng cho mèo 1",
//     quantity: "5",
//     price: "150"
//     pet: "cat",
//     type: "cage"
//   });

//   // Thêm sữa tắm cho mèo
//   await setDoc(catShampooRef, {
//     title: "Sữa tắm cho mèo",
//     image: "suatammeo.jpg",
//     note: "Sữa tắm cho mèo",
//     quantity: "5",
//     price: "150"
//     pet: "cat",
//     type: "shampoo"
//   });
// };
// addProduct();

// import { doc, getDoc } from "firebase/firestore";

// // Lấy thông tin document "dog"
// const fetchDogData = async () => {
//   const dogDocRef = doc(db, "products", "dog");
//   const dogDoc = await getDoc(dogDocRef);

//   if (dogDoc.exists()) {
//     console.log("Thông tin chó:", dogDoc.data());
//   } else {
//     console.log("Không tìm thấy thông tin chó.");
//   }
// };
// import { collection, getDocs } from "firebase/firestore";

// // Lấy thông tin sub-collection "food" của dog
// const fetchDogFoodData = async () => {
//   const dogFoodCollectionRef = collection(db, "products", "dog", "food");
//   const foodSnapshot = await getDocs(dogFoodCollectionRef);

//   foodSnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// };
