import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadImage from "../UploadImage/UploadImage";
import CategoryButton from "../CategoryButton/CategoryButton";
import AllergyListCardForRegister from "../AllergyListCardForRegister/AllergyListCardForRegister";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EditMenuForm = () => {
  const { menuId } = useParams(); // パラメータからmenuIdを取得
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // 既存画像用

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // APIからメニュー情報を取得
        const res = await axios.get(`${baseUrl}/restaurants/1/menus/${menuId}`);
        const menu = res.data;
        setMenuName(menu.name);
        setPrice(menu.price);
        setSelectedAllergies(menu.allergies || []);
        setSelectedCategory(menu.category_id || null);
        setExistingImage(menu.image_url); // 既存画像URLをセット
      } catch (err) {
        console.error("Failed to fetch menu data:", err);
        alert("メニュー情報の取得に失敗しました。");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseUrl}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchMenuData();
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
      formData.append("image", image); // 新しい画像をアップロード
    }
    selectedAllergies.forEach((allergy) => {
      formData.append("allergies[]", allergy);
    });

    try {
      await axios.put(`${baseUrl}/restaurants/1/menus/${menuId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("メニューが更新されました。");
      navigate("/admin/home"); // ホーム画面へ戻る
    } catch (err) {
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
