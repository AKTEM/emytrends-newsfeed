// CSS color names with their hex values for matching
const CSS_COLORS: { name: string; hex: string; rgb: [number, number, number] }[] = [
  { name: "Black", hex: "#000000", rgb: [0, 0, 0] },
  { name: "White", hex: "#FFFFFF", rgb: [255, 255, 255] },
  { name: "Red", hex: "#FF0000", rgb: [255, 0, 0] },
  { name: "Lime", hex: "#00FF00", rgb: [0, 255, 0] },
  { name: "Blue", hex: "#0000FF", rgb: [0, 0, 255] },
  { name: "Yellow", hex: "#FFFF00", rgb: [255, 255, 0] },
  { name: "Cyan", hex: "#00FFFF", rgb: [0, 255, 255] },
  { name: "Magenta", hex: "#FF00FF", rgb: [255, 0, 255] },
  { name: "Silver", hex: "#C0C0C0", rgb: [192, 192, 192] },
  { name: "Gray", hex: "#808080", rgb: [128, 128, 128] },
  { name: "Maroon", hex: "#800000", rgb: [128, 0, 0] },
  { name: "Olive", hex: "#808000", rgb: [128, 128, 0] },
  { name: "Green", hex: "#008000", rgb: [0, 128, 0] },
  { name: "Purple", hex: "#800080", rgb: [128, 0, 128] },
  { name: "Teal", hex: "#008080", rgb: [0, 128, 128] },
  { name: "Navy", hex: "#000080", rgb: [0, 0, 128] },
  { name: "Orange", hex: "#FFA500", rgb: [255, 165, 0] },
  { name: "Pink", hex: "#FFC0CB", rgb: [255, 192, 203] },
  { name: "Brown", hex: "#A52A2A", rgb: [165, 42, 42] },
  { name: "Coral", hex: "#FF7F50", rgb: [255, 127, 80] },
  { name: "Gold", hex: "#FFD700", rgb: [255, 215, 0] },
  { name: "Khaki", hex: "#F0E68C", rgb: [240, 230, 140] },
  { name: "Lavender", hex: "#E6E6FA", rgb: [230, 230, 250] },
  { name: "Beige", hex: "#F5F5DC", rgb: [245, 245, 220] },
  { name: "Ivory", hex: "#FFFFF0", rgb: [255, 255, 240] },
  { name: "Tan", hex: "#D2B48C", rgb: [210, 180, 140] },
  { name: "Chocolate", hex: "#D2691E", rgb: [210, 105, 30] },
  { name: "SaddleBrown", hex: "#8B4513", rgb: [139, 69, 19] },
  { name: "Sienna", hex: "#A0522D", rgb: [160, 82, 45] },
  { name: "Peru", hex: "#CD853F", rgb: [205, 133, 63] },
  { name: "SandyBrown", hex: "#F4A460", rgb: [244, 164, 96] },
  { name: "Wheat", hex: "#F5DEB3", rgb: [245, 222, 179] },
  { name: "BurlyWood", hex: "#DEB887", rgb: [222, 184, 135] },
  { name: "RosyBrown", hex: "#BC8F8F", rgb: [188, 143, 143] },
  { name: "IndianRed", hex: "#CD5C5C", rgb: [205, 92, 92] },
  { name: "Crimson", hex: "#DC143C", rgb: [220, 20, 60] },
  { name: "Tomato", hex: "#FF6347", rgb: [255, 99, 71] },
  { name: "OrangeRed", hex: "#FF4500", rgb: [255, 69, 0] },
  { name: "DarkOrange", hex: "#FF8C00", rgb: [255, 140, 0] },
  { name: "Salmon", hex: "#FA8072", rgb: [250, 128, 114] },
  { name: "LightCoral", hex: "#F08080", rgb: [240, 128, 128] },
  { name: "HotPink", hex: "#FF69B4", rgb: [255, 105, 180] },
  { name: "DeepPink", hex: "#FF1493", rgb: [255, 20, 147] },
  { name: "MediumVioletRed", hex: "#C71585", rgb: [199, 21, 133] },
  { name: "Plum", hex: "#DDA0DD", rgb: [221, 160, 221] },
  { name: "Orchid", hex: "#DA70D6", rgb: [218, 112, 214] },
  { name: "Violet", hex: "#EE82EE", rgb: [238, 130, 238] },
  { name: "Indigo", hex: "#4B0082", rgb: [75, 0, 130] },
  { name: "SlateBlue", hex: "#6A5ACD", rgb: [106, 90, 205] },
  { name: "MediumSlateBlue", hex: "#7B68EE", rgb: [123, 104, 238] },
  { name: "RoyalBlue", hex: "#4169E1", rgb: [65, 105, 225] },
  { name: "DodgerBlue", hex: "#1E90FF", rgb: [30, 144, 255] },
  { name: "SteelBlue", hex: "#4682B4", rgb: [70, 130, 180] },
  { name: "CornflowerBlue", hex: "#6495ED", rgb: [100, 149, 237] },
  { name: "SkyBlue", hex: "#87CEEB", rgb: [135, 206, 235] },
  { name: "LightBlue", hex: "#ADD8E6", rgb: [173, 216, 230] },
  { name: "Turquoise", hex: "#40E0D0", rgb: [64, 224, 208] },
  { name: "Aquamarine", hex: "#7FFFD4", rgb: [127, 255, 212] },
  { name: "MediumAquamarine", hex: "#66CDAA", rgb: [102, 205, 170] },
  { name: "DarkCyan", hex: "#008B8B", rgb: [0, 139, 139] },
  { name: "SeaGreen", hex: "#2E8B57", rgb: [46, 139, 87] },
  { name: "MediumSeaGreen", hex: "#3CB371", rgb: [60, 179, 113] },
  { name: "LightGreen", hex: "#90EE90", rgb: [144, 238, 144] },
  { name: "PaleGreen", hex: "#98FB98", rgb: [152, 251, 152] },
  { name: "SpringGreen", hex: "#00FF7F", rgb: [0, 255, 127] },
  { name: "LawnGreen", hex: "#7CFC00", rgb: [124, 252, 0] },
  { name: "Chartreuse", hex: "#7FFF00", rgb: [127, 255, 0] },
  { name: "GreenYellow", hex: "#ADFF2F", rgb: [173, 255, 47] },
  { name: "YellowGreen", hex: "#9ACD32", rgb: [154, 205, 50] },
  { name: "OliveDrab", hex: "#6B8E23", rgb: [107, 142, 35] },
  { name: "DarkKhaki", hex: "#BDB76B", rgb: [189, 183, 107] },
  { name: "PaleGoldenrod", hex: "#EEE8AA", rgb: [238, 232, 170] },
  { name: "LemonChiffon", hex: "#FFFACD", rgb: [255, 250, 205] },
  { name: "LightGoldenrodYellow", hex: "#FAFAD2", rgb: [250, 250, 210] },
  { name: "Moccasin", hex: "#FFE4B5", rgb: [255, 228, 181] },
  { name: "PapayaWhip", hex: "#FFEFD5", rgb: [255, 239, 213] },
  { name: "PeachPuff", hex: "#FFDAB9", rgb: [255, 218, 185] },
  { name: "NavajoWhite", hex: "#FFDEAD", rgb: [255, 222, 173] },
  { name: "Bisque", hex: "#FFE4C4", rgb: [255, 228, 196] },
  { name: "BlanchedAlmond", hex: "#FFEBCD", rgb: [255, 235, 205] },
  { name: "AntiqueWhite", hex: "#FAEBD7", rgb: [250, 235, 215] },
  { name: "Linen", hex: "#FAF0E6", rgb: [250, 240, 230] },
  { name: "OldLace", hex: "#FDF5E6", rgb: [253, 245, 230] },
  { name: "Seashell", hex: "#FFF5EE", rgb: [255, 245, 238] },
  { name: "MistyRose", hex: "#FFE4E1", rgb: [255, 228, 225] },
  { name: "Snow", hex: "#FFFAFA", rgb: [255, 250, 250] },
  { name: "FloralWhite", hex: "#FFFAF0", rgb: [255, 250, 240] },
  { name: "MintCream", hex: "#F5FFFA", rgb: [245, 255, 250] },
  { name: "Azure", hex: "#F0FFFF", rgb: [240, 255, 255] },
  { name: "AliceBlue", hex: "#F0F8FF", rgb: [240, 248, 255] },
  { name: "GhostWhite", hex: "#F8F8FF", rgb: [248, 248, 255] },
  { name: "WhiteSmoke", hex: "#F5F5F5", rgb: [245, 245, 245] },
  { name: "Gainsboro", hex: "#DCDCDC", rgb: [220, 220, 220] },
  { name: "LightGray", hex: "#D3D3D3", rgb: [211, 211, 211] },
  { name: "DarkGray", hex: "#A9A9A9", rgb: [169, 169, 169] },
  { name: "DimGray", hex: "#696969", rgb: [105, 105, 105] },
  { name: "SlateGray", hex: "#708090", rgb: [112, 128, 144] },
  { name: "DarkSlateGray", hex: "#2F4F4F", rgb: [47, 79, 79] },
];

// Convert hex to RGB
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  }
  return null;
}

// Calculate color distance (Euclidean distance in RGB space)
function colorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
}

// Get the closest CSS color name for a given hex color
export function getClosestColorName(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "Unknown";

  let closestColor = CSS_COLORS[0];
  let minDistance = Infinity;

  for (const color of CSS_COLORS) {
    const distance = colorDistance(rgb, color.rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }

  return closestColor.name;
}
