import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { addProduct, updateProduct, getProduct, Product } from "../../lib/firebaseProducts";
import { uploadProductImage } from "../../lib/firebaseStorage";
import { X } from "lucide-react";

const CATEGORIES = ["New Arrivals", "Tape-Ins", "Ponytails", "Clip-Ins", "Trending", "Best Selling"];
const HAIR_EXTENSION_TYPES = ["Luxury Wigs", "Invisible Tape", "Hand-Tied Weft", "Classic Weft"];
const SHADES = ["Black", "Brown", "Blonde", "Red"];
const LENGTHS = ["14\"", "16\"", "18\"", "20\"", "22\"", "24\""];

export const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: "",
    description: "",
    fullDescription: "",
    price: 0,
    category: "",
    hairExtensionType: "",
    badge: "",
    images: [],
    colors: [],
    shades: [],
    lengths: [],
    colorSwatches: [],
    lengthOptions: [],
    shadeOptions: [],
    faqItems: [],
    relatedProductIds: [],
    inStock: true,
    featured: false,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [colorSwatchHex, setColorSwatchHex] = useState("");
  const [colorSwatchName, setColorSwatchName] = useState("");
  const [lengthLabel, setLengthLabel] = useState("");
  const [lengthPrice, setLengthPrice] = useState("");
  const [shadeLabel, setShadeLabel] = useState("");
  const [relatedProductId, setRelatedProductId] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      loadProduct(id);
    }
  }, [id, isEdit]);

  const loadProduct = async (productId: string) => {
    try {
      const product = await getProduct(productId);
      if (product) {
        setFormData(product);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [...formData.images];

      if (imageFiles.length > 0) {
        const tempId = id || `temp-${Date.now()}`;
        const uploadPromises = imageFiles.map((file) => uploadProductImage(file, tempId));
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const productData = {
        ...formData,
        images: imageUrls,
      };

      if (isEdit && id) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddColor = () => {
    if (colorInput && !formData.colors?.includes(colorInput)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...(prev.colors || []), colorInput],
      }));
      setColorInput("");
    }
  };

  const handleRemoveColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors?.filter((c) => c !== color) || [],
    }));
  };

  const toggleArrayItem = (field: 'shades' | 'lengths', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field]?.filter((item) => item !== value)
        : [...(prev[field] || []), value],
    }));
  };

  const handleAddFaq = () => {
    if (faqQuestion) {
      setFormData((prev) => ({
        ...prev,
        faqItems: [...(prev.faqItems || []), { question: faqQuestion, answer: faqAnswer }],
      }));
      setFaqQuestion("");
      setFaqAnswer("");
    }
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqItems: prev.faqItems?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddColorSwatch = () => {
    if (colorSwatchHex) {
      setFormData((prev) => ({
        ...prev,
        colorSwatches: [
          ...(prev.colorSwatches || []),
          {
            id: (prev.colorSwatches?.length || 0) + 1,
            color: colorSwatchHex,
            name: colorSwatchName || undefined,
          },
        ],
      }));
      setColorSwatchHex("");
      setColorSwatchName("");
    }
  };

  const handleRemoveColorSwatch = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      colorSwatches: prev.colorSwatches?.filter((s) => s.id !== id) || [],
    }));
  };

  const handleAddLengthOption = () => {
    if (lengthLabel) {
      setFormData((prev) => ({
        ...prev,
        lengthOptions: [
          ...(prev.lengthOptions || []),
          {
            id: (prev.lengthOptions?.length || 0) + 1,
            label: lengthLabel,
            price: lengthPrice ? parseFloat(lengthPrice) : undefined,
          },
        ],
      }));
      setLengthLabel("");
      setLengthPrice("");
    }
  };

  const handleRemoveLengthOption = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      lengthOptions: prev.lengthOptions?.filter((l) => l.id !== id) || [],
    }));
  };

  const handleAddShadeOption = () => {
    if (shadeLabel) {
      const id = shadeLabel.toLowerCase().replace(/\s+/g, "-");
      setFormData((prev) => ({
        ...prev,
        shadeOptions: [...(prev.shadeOptions || []), { id, label: shadeLabel }],
      }));
      setShadeLabel("");
    }
  };

  const handleRemoveShadeOption = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      shadeOptions: prev.shadeOptions?.filter((s) => s.id !== id) || [],
    }));
  };

  const handleAddRelatedProduct = () => {
    if (relatedProductId && !formData.relatedProductIds?.includes(relatedProductId)) {
      setFormData((prev) => ({
        ...prev,
        relatedProductIds: [...(prev.relatedProductIds || []), relatedProductId],
      }));
      setRelatedProductId("");
    }
  };

  const handleRemoveRelatedProduct = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedProductIds: prev.relatedProductIds?.filter((pid) => pid !== id) || [],
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={2}
                placeholder="Enter short product description (shown in preview)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Description (Optional)</label>
              <textarea
                value={formData.fullDescription || ""}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={6}
                placeholder="Enter detailed product description (shown on product page)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hair Extension Type (Optional)</label>
              <select
                value={formData.hairExtensionType || ""}
                onChange={(e) => setFormData({ ...formData, hairExtensionType: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">Select type</option>
                {HAIR_EXTENSION_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Badge (Optional)</label>
              <input
                type="text"
                value={formData.badge || ""}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                placeholder="e.g., SEMI-PERMANENT, TEMPORARY, NEW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images</label>
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Colors (Hex Codes)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="#000000"
                />
                <Button type="button" onClick={handleAddColor}>
                  Add Color
                </Button>
              </div>
              {formData.colors && formData.colors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md"
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm">{color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Shades</label>
              <div className="flex flex-wrap gap-2">
                {SHADES.map((shade) => (
                  <label key={shade} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shades?.includes(shade)}
                      onChange={() => toggleArrayItem('shades', shade)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{shade}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Basic Lengths</label>
              <div className="flex flex-wrap gap-2">
                {LENGTHS.map((length) => (
                  <label key={length} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.lengths?.includes(length)}
                      onChange={() => toggleArrayItem('lengths', length)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{length}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Detailed Length Options (with pricing)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={lengthLabel}
                  onChange={(e) => setLengthLabel(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="e.g., 16 IN / 50"
                />
                <input
                  type="number"
                  value={lengthPrice}
                  onChange={(e) => setLengthPrice(e.target.value)}
                  className="w-32 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Price (optional)"
                  step="0.01"
                />
                <Button type="button" onClick={handleAddLengthOption}>
                  Add Length
                </Button>
              </div>
              {formData.lengthOptions && formData.lengthOptions.length > 0 && (
                <div className="space-y-2">
                  {formData.lengthOptions.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                      <span className="text-sm">
                        {option.label} {option.price ? `($${option.price})` : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLengthOption(option.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Shade Options (for Select Your Shade dropdown)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={shadeLabel}
                  onChange={(e) => setShadeLabel(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="e.g., ALL, BLACK, BLONDE"
                />
                <Button type="button" onClick={handleAddShadeOption}>
                  Add Shade
                </Button>
              </div>
              {formData.shadeOptions && formData.shadeOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.shadeOptions.map((shade) => (
                    <div key={shade.id} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md">
                      <span className="text-sm">{shade.label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveShadeOption(shade.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color Swatches</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorSwatchHex}
                  onChange={(e) => setColorSwatchHex(e.target.value)}
                  className="w-32 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="#000000"
                />
                <input
                  type="text"
                  value={colorSwatchName}
                  onChange={(e) => setColorSwatchName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Color name (optional)"
                />
                <Button type="button" onClick={handleAddColorSwatch}>
                  Add Swatch
                </Button>
              </div>
              {formData.colorSwatches && formData.colorSwatches.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.colorSwatches.map((swatch) => (
                    <div key={swatch.id} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md">
                      <div
                        className="w-6 h-6 rounded-full border border-border"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <span className="text-sm">{swatch.name || swatch.color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColorSwatch(swatch.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">FAQ Items</label>
              <div className="space-y-2 mb-2">
                <input
                  type="text"
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="FAQ Question"
                />
                <textarea
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                  placeholder="FAQ Answer"
                />
                <Button type="button" onClick={handleAddFaq}>
                  Add FAQ
                </Button>
              </div>
              {formData.faqItems && formData.faqItems.length > 0 && (
                <div className="space-y-2">
                  {formData.faqItems.map((faq, index) => (
                    <div key={index} className="p-3 bg-secondary rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-sm">{faq.question}</strong>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Related Product IDs (for Explore More section)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={relatedProductId}
                  onChange={(e) => setRelatedProductId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Product ID"
                />
                <Button type="button" onClick={handleAddRelatedProduct}>
                  Add Related
                </Button>
              </div>
              {formData.relatedProductIds && formData.relatedProductIds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.relatedProductIds.map((id) => (
                    <div key={id} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-md">
                      <span className="text-sm">{id}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRelatedProduct(id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Featured Product</span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
