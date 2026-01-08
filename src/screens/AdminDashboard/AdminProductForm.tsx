import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { addProduct, updateProduct, getProduct, Product } from "../../lib/firebaseProducts";
import { uploadProductImage } from "../../lib/firebaseStorage";
import { X } from "lucide-react";
import { getClosestColorName } from "../../lib/colorUtils";

const CATEGORIES = ["New Arrivals", "Tape-Ins", "Ponytails", "Clip-Ins", "Trending", "Best Selling"];
const HAIR_EXTENSION_TYPES = ["Luxury Wigs", "Invisible Tape", "Hand-Tied Weft", "Classic Weft"];
const FILTER_SHADES = ["Black", "Brown", "Blonde", "Red"];
const FILTER_LENGTHS = ["14\"", "16\"", "18\"", "20\"", "22\"", "24\""];

// Predefined color swatches with hex values matching "Shop by Shade"
const PREDEFINED_SWATCHES = [
  { name: "Black", color: "#1a1a1a" },
  { name: "Brown", color: "#8B4513" },
  { name: "Blonde", color: "#E8C872" },
  { name: "Red", color: "#B22222" },
];

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
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [colorSwatchHex, setColorSwatchHex] = useState("#000000");
  const [lengthLabel, setLengthLabel] = useState("");
  const [lengthPrice, setLengthPrice] = useState("");
  const [shadeLabel, setShadeLabel] = useState("");
  const [relatedProductId, setRelatedProductId] = useState("");

  // Auto-generate color name when hex changes
  const colorSwatchName = getClosestColorName(colorSwatchHex);

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

      // Sanitize lengthOptions to ensure proper data format
      const sanitizedLengthOptions = (formData.lengthOptions || []).map((opt, idx) => ({
        id: String(opt.id || `length-${Date.now()}-${idx}`),
        label: String(opt.label || ''),
        ...(opt.price !== undefined && !isNaN(Number(opt.price)) ? { price: Number(opt.price) } : {}),
      }));

      // Sanitize colorSwatches to ensure proper data format
      const sanitizedColorSwatches = (formData.colorSwatches || []).map((swatch, idx) => ({
        id: String(swatch.id || `swatch-${Date.now()}-${idx}`),
        color: String(swatch.color || '#000000'),
        name: String(swatch.name || ''),
      }));

      // Sanitize shadeOptions
      const sanitizedShadeOptions = (formData.shadeOptions || []).map((opt) => ({
        id: String(opt.id || opt.label.toLowerCase().replace(/\s+/g, '-')),
        label: String(opt.label || ''),
      }));

      const productData = {
        ...formData,
        images: imageUrls,
        price: isNaN(formData.price) ? 0 : formData.price,
        lengthOptions: sanitizedLengthOptions,
        colorSwatches: sanitizedColorSwatches,
        shadeOptions: sanitizedShadeOptions,
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
    if (colorSwatchHex && (formData.colorSwatches?.length || 0) < 7) {
      const newId = `swatch-${Date.now()}`; // Use string ID for consistency
      setFormData((prev) => ({
        ...prev,
        colorSwatches: [
          ...(prev.colorSwatches || []),
          {
            id: newId,
            color: colorSwatchHex,
            name: colorSwatchName,
          },
        ],
      }));
      setColorSwatchHex("#000000");
    }
  };

  const handleRemoveColorSwatch = (id: string | number) => {
    setFormData((prev) => ({
      ...prev,
      colorSwatches: prev.colorSwatches?.filter((s) => String(s.id) !== String(id)) || [],
    }));
  };

  const handleAddLengthOption = () => {
    if (lengthLabel.trim()) {
      const newId = `length-${Date.now()}`; // Use string ID for consistency
      const parsedPrice = parseFloat(lengthPrice);
      setFormData((prev) => ({
        ...prev,
        lengthOptions: [
          ...(prev.lengthOptions || []),
          {
            id: newId,
            label: lengthLabel.trim(),
            price: lengthPrice && !isNaN(parsedPrice) ? parsedPrice : undefined,
          },
        ],
      }));
      setLengthLabel("");
      setLengthPrice("");
    }
  };

  const handleRemoveLengthOption = (id: string | number) => {
    setFormData((prev) => ({
      ...prev,
      lengthOptions: prev.lengthOptions?.filter((l) => String(l.id) !== String(id)) || [],
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
    <div className="w-full max-w-4xl mx-auto py-4 sm:py-6 lg:py-8 px-0">
      <Card className="overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">{isEdit ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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

            {/* Filter: Shades (for shop filtering) */}
            <div>
              <label className="block text-sm font-medium mb-2">Filter Shades (for shop page filtering)</label>
              <div className="flex flex-wrap gap-3">
                {FILTER_SHADES.map((shade) => (
                  <label key={shade} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shades?.includes(shade) || false}
                      onChange={() => {
                        const currentShades = formData.shades || [];
                        const newShades = currentShades.includes(shade)
                          ? currentShades.filter((s) => s !== shade)
                          : [...currentShades, shade];
                        setFormData({ ...formData, shades: newShades });
                      }}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{shade}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Lengths (for shop filtering) */}
            <div>
              <label className="block text-sm font-medium mb-2">Filter Lengths (for shop page filtering)</label>
              <div className="flex flex-wrap gap-3">
                {FILTER_LENGTHS.map((length) => (
                  <label key={length} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.lengths?.includes(length) || false}
                      onChange={() => {
                        const currentLengths = formData.lengths || [];
                        const newLengths = currentLengths.includes(length)
                          ? currentLengths.filter((l) => l !== length)
                          : [...currentLengths, length];
                        setFormData({ ...formData, lengths: newLengths });
                      }}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{length}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images</label>
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Product ${index + 1}`} className="w-full h-24 sm:h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
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
              <label className="block text-sm font-medium mb-2">Detailed Length Options (with pricing)</label>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
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
                  className="w-full sm:w-32 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Price (optional)"
                  step="0.01"
                />
                <Button type="button" onClick={handleAddLengthOption} className="w-full sm:w-auto whitespace-nowrap">
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
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={shadeLabel}
                  onChange={(e) => setShadeLabel(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="e.g., ALL, BLACK, BLONDE"
                />
                <Button type="button" onClick={handleAddShadeOption} className="w-full sm:w-auto whitespace-nowrap">
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
              <label className="block text-sm font-medium mb-2">
                Color Swatches ({formData.colorSwatches?.length || 0}/7)
              </label>
              
              {/* Quick Select: Predefined Swatches */}
              <div className="mb-3">
                <span className="text-xs text-muted-foreground mb-2 block">Quick Add (Black, Brown, Blonde, Red):</span>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_SWATCHES.map((swatch) => {
                    const isAlreadyAdded = formData.colorSwatches?.some(
                      (s) => s.name?.toLowerCase() === swatch.name.toLowerCase()
                    );
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => {
                          if (!isAlreadyAdded && (formData.colorSwatches?.length || 0) < 7) {
                            const newId = `swatch-${Date.now()}`;
                            setFormData((prev) => ({
                              ...prev,
                              colorSwatches: [
                                ...(prev.colorSwatches || []),
                                { id: newId, color: swatch.color, name: swatch.name },
                              ],
                            }));
                          }
                        }}
                        disabled={isAlreadyAdded || (formData.colorSwatches?.length || 0) >= 7}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                          isAlreadyAdded
                            ? "bg-muted border-muted-foreground/30 opacity-50 cursor-not-allowed"
                            : "bg-background border-border hover:bg-secondary cursor-pointer"
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-border"
                          style={{ backgroundColor: swatch.color }}
                        />
                        <span className="text-sm">{swatch.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Picker */}
              <div className="mb-3">
                <span className="text-xs text-muted-foreground mb-2 block">Or add custom color:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colorSwatchHex}
                      onChange={(e) => setColorSwatchHex(e.target.value)}
                      className="w-12 h-10 border border-border rounded-md cursor-pointer"
                      title="Pick a color"
                    />
                    <span className="text-sm text-muted-foreground">{colorSwatchHex}</span>
                  </div>
                  <input
                    type="text"
                    value={colorSwatchName}
                    readOnly
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-muted text-foreground"
                    placeholder="Color name (auto-detected)"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddColorSwatch} 
                    className="w-full sm:w-auto whitespace-nowrap"
                    disabled={(formData.colorSwatches?.length || 0) >= 7}
                  >
                    Add Custom
                  </Button>
                </div>
              </div>

              {/* Selected Swatches Display */}
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
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  value={relatedProductId}
                  onChange={(e) => setRelatedProductId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Product ID"
                />
                <Button type="button" onClick={handleAddRelatedProduct} className="w-full sm:w-auto whitespace-nowrap">
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

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-border">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/products")}
                className="w-full sm:w-auto"
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
