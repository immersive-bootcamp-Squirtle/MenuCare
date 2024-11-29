import React, { useEffect, useState } from "react";
import { Card, Typography, Box, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadImage from "../UploadImage/UploadImage";
import CategoryButton from "../CategoryButton/CategoryButton";
import AllergyListCardForRegister from "../AllergyListCardForRegister/AllergyListCardForRegister";
import { useLocation } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EditMenuForm = () => {
  const { menuId } = useParams(); // パラメータからmenuIdを取得
  const navigate = useNavigate();
  const { state } = useLocation();

  const menuData = state?.menuData || {};
  const allergies = state?.allergies || [];

  const [menuName, setMenuName] = useState(menuData?.name || "");
  const [price, setPrice] = useState(menuData?.price || "");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    menuData?.category_id || null
  );
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(menuData?.image_url || "");
  console.log("existingImage:", existingImage);
  const [categories, setCategories] = useState([]);

  console.log("allergies_inedit:", allergies);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const testCategories = [
          { category_id: 1, category_name: "前菜" },
          { category_id: 2, category_name: "メイン" },
          { category_id: 3, category_name: "デザート" },
          { category_id: 3, category_name: "飲み物" },
        ];
        setCategories(testCategories);
      } catch (err) {
        if (!err.response) {
          navigate("/login");
        }
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [menuId]);

  const handleToggleAllergy = (allergyId) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId]
    );
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // ファイルを保持
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("menu_name", menuName);
    formData.append("price", parseInt(price));
    formData.append("category_id", selectedCategory);

    if (image) {
      formData.append("image", image); 
    }
    selectedAllergies.forEach((allergy) => {
      formData.append("allergies[]", allergy);
    });

    try {
      console.log("allergy:", selectedAllergies);
      console.log("formdata:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // local実行時はこちら
      // const res = await axios.post(`${baseUrl}/restaurants/1/menus`, reqBody);
      // const res = await axios.put(`${baseUrl}/restaurants/1/menus/${menuId}`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // lambda実行時はこちら
      const res = await axios.put(`https://api.menu-care.com/api/restaurants/1/menus/${menuId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("idToken"),
        },
      });

      // 画像が更新されている場合、画像アップロード処理を実行する
      if (!image) {
        const preSignedUrlForS3Upload = res.data.preSignedUrlForS3Upload;

        console.log("res.data");
        console.log(res.data);
        console.log("preSignedUrlForS3Upload")
        console.log(preSignedUrlForS3Upload)

        //// アップロード
        const result = await axios.put(preSignedUrlForS3Upload, image, {
          headers: {
              'Content-Type': image.type
          }
        })
      }

      alert("メニューが更新されました。");
      navigate("/admin/home"); // ホーム画面へ戻る
    } catch (err) {
      if (!err.response) {
        navigate("/admin/home")
      }
      console.error("Failed to update menu:", err);
      alert("メニュー更新に失敗しました。");
    }
  };

  return (
    <>
      <Box>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "905px",
            height: "541px",
            margin: "0 auto",
            padding: 2,
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            backgroundColor: "#F2EDE5",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            {/* 画像 */}
            <UploadImage
              image={existingImage}
              handleImageUpload={handleImageUpload}
            />
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">商品名</Typography>
              <TextField
                fullWidth
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <Typography variant="h6">価格</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">¥</Typography>
                <TextField
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  sx={{
                    marginBottom: 0,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingLeft: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                カテゴリ
              </Typography>
              <CategoryButton
                categories={categories}
                handleCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                アレルギー情報
              </Typography>
              <AllergyListCardForRegister
                allergies={allergies}
                selectedAllergies={selectedAllergies}
                onClick={handleToggleAllergy}
              />
            </Box>
          </Box>
        </Card>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F2A24A",
            }}
          >
            メニューを更新
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditMenuForm;
