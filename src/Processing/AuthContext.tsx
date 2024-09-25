import React, { createContext, useContext, useState, ReactNode } from "react";
import ThongBao from "../thong_bao/thong_bao";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";

// Định nghĩa kiểu cho giá trị của context
interface AuthContextType {
  isAuthenticated: boolean;
  NameUser: string | undefined;
  login: (name: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => void;
  products: Product[];
  getProductById: (id: string) => Product | null;
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
  const [products] = useState<Product[]>([
    new Product(
      "1",
      "Thức ăn cho mèo",
      "anmeo.jpg",
      "Thức ăn cho mèo",
      "10",
      "200"
    ),
    new Product(
      "2",
      "Thức ăn cho chó",
      "ancho.jpg",
      "Thức ăn cho chó",
      "5",
      "150"
    ),
    new Product(
      "3",
      "Thức ăn cho mèo 2",
      "anmeo2.jpg",
      "Thức ăn cho mèo 2",
      "5",
      "150"
    ),
    new Product(
      "4",
      "Balo đựng pet 1",
      "balo1.jpg",
      "Balo đựng pet 1",
      "5",
      "150"
    ),
    new Product(
      "5",
      "Balo đựng pet 2",
      "balo2.jpg",
      "Balo đựng pet 2",
      "5",
      "150"
    ),
    new Product(
      "6",
      "Balo đựng pet 3",
      "balo3.jpg",
      "Balo đựng pet 3",
      "5",
      "150"
    ),
    new Product(
      "7",
      "Chuồng cho pet 1",
      "chuong1.jpg",
      "Chuồng cho pet 1",
      "5",
      "150"
    ),
    new Product(
      "8",
      "Chuồng cho pet 2",

      "chuong2.jpg",
      "Chuồng cho pet 2",

      "5",
      "150"
    ),
    new Product(
      "9",
      "Chuồng cho pet 3",

      "chuong3.jpg",
      "Chuồng cho pet 3",

      "5",
      "150"
    ),
    new Product(
      "10",
      "Thức ăn cho chó",
      "patecho.jpg",
      "Thức ăn cho chó",
      "5",
      "150"
    ),
    new Product(
      "11",
      "Sữa tắm cho mèo",
      "suatammeo.jpg",
      "Sữa tắm cho mèo",
      "5",
      "150"
    ),
    new Product(
      "12",
      "Trị ve cho chó",
      "trivecho.jpg",
      "Trị ve cho chó",
      "5",
      "150"
    ),
  ]);
  const getProductById = (id: string) => {
    return products.find((product) => product.id === id) || null;
  };
  const userKeys = findUserKeys();
  const [NameUser, setNameUser] = useState<string | undefined>(() => {
    if (userKeys.length !== 0) {
      return userKeys[0].split("-")[1];
    }
    return undefined;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    NameUser === undefined ? false : true
  );
  const navigate = useNavigate();

  const login = (name: string, password: string) => {
    if (isAuthenticated) {
      ThongBao.show(`Bạn cần đăng xuất tài khoản ${NameUser} trước`);
    } else {
      if (name === "admin") {
        if (password === "1") {
          setIsAuthenticated(true);
          navigate("admin/home");
          setNameUser(name);
          localStorage.setItem(`userInfo-${name}`, JSON.stringify(name));
          ThongBao.success("Đăng nhập thành công");
        } else {
          ThongBao.warning("Sai mật khẩu");
        }
      } else {
        setIsAuthenticated(true);
        setNameUser(name);
        localStorage.setItem(`userInfo-${name}`, JSON.stringify(name));
        ThongBao.success("Đăng nhập thành công");
      }
    }
  };

  const register = (email: string, password: string, name: string) => {
    ThongBao.success(`Đăng ký thành công tài khoản ${name}`);
    //chưa xong
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(`userInfo-${NameUser}`);
    ThongBao.show(`Đăng xuất thành công tài khoản ${NameUser}`);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        NameUser,
        login,
        logout,
        register,
        products,
        getProductById,
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
