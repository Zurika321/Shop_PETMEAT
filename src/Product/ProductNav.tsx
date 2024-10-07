import { useEffect, useState } from "react";
import { useAuth } from "../Processing/AuthContext";

import { useParams } from "react-router-dom";

const ProductNav = () => {
  const { pet, type, id } = useParams();
  const { getListPet_Type } = useAuth();
  const [endProduct, setEndProduct] = useState<string>("");
  const [listPets, setListPets] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const petsAndTypes = await getListPet_Type(); // Gọi hàm lấy danh sách thú cưng và loại

      if (!petsAndTypes) {
        setEndProduct("Không thể fetch pet và types.");
        return;
      }

      setListPets(petsAndTypes[0] || []);
      setTypes(petsAndTypes[1] || []);
      if (!id || !pet || !type) {
        setEndProduct("id hoặc pet hoặc type không hợp lệ");
        return;
      }
      const index_listPets = listPets.indexOf(pet);
      if (index_listPets === -1) {
        setEndProduct(`Không tìm thấy danh sách pet: ${pet}`);
        return;
      }

      if (listPets.length === 0 || types.length === 0) {
        setEndProduct("Không tìm thấy danh sách");
        return;
      }
    };

    fetchProducts();
  }, []);
  const LinkPet = listPets.map((listpet, index) => (
    <div key={`linkPet - ${index}`}>
      <button
        className="btn btn-outline-primary mx-2"
        onClick={() => (window.location.href = `/product/${listpet}`)}
      >
        {listpet}
      </button>
    </div>
  ));
  const LinkTypes = types.map((type_, index) => (
    <div key={`linkPet - ${index}`}>
      <button
        className="btn btn-outline-primary mx-2"
        onClick={() => (window.location.href = `/product/${type_}`)}
      >
        {type_}
      </button>
    </div>
  ));

  return (
    <>
      <div style={{ fontWeight: "100" }} className="m-3">
        <span
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span
          onClick={() => (window.location.href = `/product`)}
          style={{ cursor: "pointer" }}
        >
          Product
        </span>
        {pet && (
          <>
            <span className="mx-2">/</span>
            <span
              onClick={() => (window.location.href = `/product/${pet}`)}
              style={{ cursor: "pointer" }}
            >
              {pet}
            </span>
          </>
        )}
        {type && (
          <>
            <span className="mx-2">/</span>
            <span
              onClick={() => (window.location.href = `/product/${pet}/${type}`)}
              style={{ cursor: "pointer" }}
            >
              {type}
            </span>
          </>
        )}
      </div>
      <div className="m-3 text-center">
        {/* {!pet && (
          <>
            <h3>pet :</h3>
            <div className="d-flex justify-content-center">{LinkPet}</div>
            <br />
          </>
        )} */}
        {!type && (
          <>
            <h3>pet :</h3>
            <div className="d-flex justify-content-center">{LinkPet}</div>
            <br />
            <h3>type :</h3>
            <div className="d-flex justify-content-center">{LinkTypes}</div>
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default ProductNav;
