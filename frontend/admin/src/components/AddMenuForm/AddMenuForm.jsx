import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AllergyListCardForRegister from "../AllergyListCardForRegister/AllergyListCardForRegister";
import axios from "axios";
import UploadImage from "../UploadImage/UploadImage";
import CategoryButton from "../CategoryButton/CategoryButton";
import { useNavigate } from "react-router-dom"; 
// import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const AddMenuForm = () => {
  const navigate = useNavigate();
  // const { restaurant_id } = useParams();
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const handleToggleAllergy = (allergyId) => {
    setSelectedAllergies(
      (prev) =>
        prev.includes(allergyId)
          ? prev.filter((id) => id !== allergyId) // 選択を解除
          : [...prev, allergyId] // 選択を追加
    );
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // カテゴリを選択
  };

  //アップロードされたファイルをプレビューする
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // ファイルのプレビュー用URLを発行
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const testCategories = [
          { category_id: 1, category_name: "フード" },
          { category_id: 2, category_name: "ドリンク" },
        ];
        setCategories(testCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const reqBody = {
        restaurant_id: 1,
        menu_name: menuName,
        price: parseInt(price),
        image_url: "/public/egg.png", // テスト用固定値
        status: "active",
        allergies: selectedAllergies,
      };

      console.log("Request Body:", reqBody);

      // local実行時はこちら
      const res = await axios.post(`${baseUrl}/restaurants/1/menus`, reqBody);

      // lambda実行時はこちら
      // const res = await axios.post(`https://api.menu-care.com/api/restaurants/1/menus`, reqBody);

      console.log("Response:", res.data);
      alert("メニューが登録されました");
      navigate("/admin/home");
    } catch (err) {
      console.error("Error submitting menu:", err);
      alert("エラーが発生しました。");
    }
  };

  // console.log("selectedAllergies:", selectedAllergies);
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        // local上での実行の際はこちら
        const res = await axios.get(`${baseUrl}/allergies`);
        // console.log("alg:", res.data);
        setAllergies(res.data);

        // lambda上での実行の際はこちら
        // const res = await axios.get(`https://api.menu-care.com/api/allergies`);
        // setAllergies(res.data);

        // backendを繋げていない環境ではこちら
        // const testAllergies = [
        //   { allergy_id: 1, allergy_name: "卵" },
        //   { allergy_id: 2, allergy_name: "小麦" },
        //   { allergy_id: 3, allergy_name: "乳（牛乳）" },
        //   { allergy_id: 4, allergy_name: "えび" },
        //   { allergy_id: 5, allergy_name: "かに" },
        //   { allergy_id: 6, allergy_name: "くるみ" },
        //   { allergy_id: 7, allergy_name: "そば" },
        //   { allergy_id: 8, allergy_name: "落花生（ピーナッツ）" },
        //   { allergy_id: 9, allergy_name: "アーモンド" },
        //   { allergy_id: 10, allergy_name: "あわび" },
        //   { allergy_id: 11, allergy_name: "いか" },
        //   { allergy_id: 12, allergy_name: "いくら" },
        //   { allergy_id: 13, allergy_name: "オレンジ" },
        //   { allergy_id: 14, allergy_name: "カシューナッツ" },
        //   { allergy_id: 15, allergy_name: "キウイ" },
        //   { allergy_id: 16, allergy_name: "牛肉" },
        //   { allergy_id: 17, allergy_name: "ごま" },
        //   { allergy_id: 18, allergy_name: "さけ" },
        //   { allergy_id: 19, allergy_name: "さば" },
        //   { allergy_id: 20, allergy_name: "大豆" },
        //   { allergy_id: 21, allergy_name: "鶏肉" },
        //   { allergy_id: 22, allergy_name: "バナナ" },
        //   { allergy_id: 23, allergy_name: "豚肉" },
        //   { allergy_id: 24, allergy_name: "マカダミアナッツ" },
        //   { allergy_id: 25, allergy_name: "もも" },
        //   { allergy_id: 26, allergy_name: "やまいも" },
        //   { allergy_id: 27, allergy_name: "りんご" },
        //   { allergy_id: 28, allergy_name: "ゼラチン" },
        // ];
        // setAllergies(testAllergies);
      } catch (err) {
        console.error("Error fetching allergies:", err);
      }
    };
    fetchAllergies();
  }, []);

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
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 影
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
            <UploadImage image={image} handleImageUpload={handleImageUpload} />
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">商品名</Typography>
              <TextField
                fullWidth
                placeholder="生ハムのサラダ"
                variant="outlined"
                onChange={(e) => setMenuName(e.target.value)}
                sx={{
                  marginBottom: 1,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // 枠線削除
                    },
                  },
                }}
              />
              <Typography variant="h6">価格</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h6">¥</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="500"
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{
                    marginBottom: 0,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // 枠線削除
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
              backgroundColor:"#F2A24A"
            }}
          >
            メニューを登録
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddMenuForm;
