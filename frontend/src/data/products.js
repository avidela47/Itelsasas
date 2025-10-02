// src/data/products.js
import sensorImg from "../assets/products/sensor.png";
import fuenteImg from "../assets/products/fuente.png";
import cableImg from "../assets/products/cable.png";

// Íconos de Material UI
import SensorsIcon from "@mui/icons-material/Sensors";       // sensores
import PowerIcon from "@mui/icons-material/Power";           // fuentes
import CableIcon from "@mui/icons-material/Cable";           // accesorios

export const products = {
  sensores: [
    {
      code: "BGS-2V100CP",
      desc: "Sensor fotoeléctrico BGS 100 mm, Optex",
      img: sensorImg,
      price: 120.5, // 💲 Precio en USD (ejemplo)
      icon: SensorsIcon,
    },
    {
      code: "D1RF-T",
      desc: "Sensor retrorreflectivo con supresión de fondo, Optex",
      img: sensorImg,
      price: 98.0,
      icon: SensorsIcon,
    },
    {
      code: "ZT-L3000P",
      desc: "Sensor láser de distancia 3 m, Optex",
      img: sensorImg,
      price: 250.75,
      icon: SensorsIcon,
    },
  ],
  fuentes: [
    {
      code: "LRS-350-24",
      desc: "Fuente Mean Well 350 W, 24 V, salida única",
      img: fuenteImg,
      price: 65.99,
      icon: PowerIcon,
    },
    {
      code: "LRS-100-12",
      desc: "Fuente Mean Well 100 W, 12 V, compacta",
      img: fuenteImg,
      price: 28.5,
      icon: PowerIcon,
    },
    {
      code: "NDR-480-24",
      desc: "Fuente Mean Well 480 W, 24 V, riel DIN",
      img: fuenteImg,
      price: 120.0,
      icon: PowerIcon,
    },
  ],
  accesorios: [
    {
      code: "CAB-5M-M12",
      desc: "Cable M12 macho 5 m, blindado",
      img: cableImg,
      price: 15.99,
      icon: CableIcon,
    },
    {
      code: "SOP-SENSOR",
      desc: "Soporte universal metálico para sensores",
      img: cableImg,
      price: 9.5,
      icon: CableIcon,
    },
    {
      code: "CAB-2X1.5",
      desc: "Cable de alimentación 2x1.5 mm², industrial",
      img: cableImg,
      price: 7.75,
      icon: CableIcon,
    },
  ],
};



