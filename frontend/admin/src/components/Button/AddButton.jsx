import { Box } from "@mui/material";

export default function AddButton({ onClick }) {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "clamp(3.75rem, 3.214rem + 2.68vw, 5.625rem)",
          height: "clamp(3.75rem, 3.214rem + 2.68vw, 5.625rem)",
          backgroundColor: "#f2a24a",
          borderRadius: "50%",
          boxShadow: "5px 6px 6px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            position: "relative",
            width: "40%", // プラスマークの大きさ(幅)
            height: "40%", // プラスマークの大きさ(高さ)
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: "#fff",
            },
            "&::before": {
              width: "100%",
              height: "15%", // 横線の太さ
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
            },
            "&::after": {
              width: "15%", // 縦線の太さ
              height: "100%",
              left: "50%",
              top: "0",
              transform: "translateX(-50%)",
            },
          }}
        />
      </Box>
    </>
  );
}
