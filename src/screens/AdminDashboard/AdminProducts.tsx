import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getAllProducts, deleteProduct, Product } from "../../lib/firebaseProducts";
import { deleteProductImage } from "../../lib/firebaseStorage";
import { Badge } from "../../components/ui/badge";

export const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, images: string[]) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await Promise.all(images.map(img => deleteProductImage(img)));
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading products...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Products</h1>
        <Button onClick={() => navigate("/admin/products/new")} className="w-full sm:w-auto">
          <Plus size={20} className="mr-2" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">No products yet</p>
            <Button onClick={() => navigate("/admin/products/new")}>
              <Plus size={20} className="mr-2" />
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-4">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{product.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-sm font-medium">${product.price}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                    {product.inStock ? (
                      <Badge className="bg-green-500 text-xs">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id!, product.images)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
