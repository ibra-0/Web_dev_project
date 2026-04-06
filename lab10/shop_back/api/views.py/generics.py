from rest_framework import generics
from api.models import Product, Category
from api.serializers import ProductSerializer, CategorySerializer

# --- PRODUCT VIEWS ---

class ProductListAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'product_id'

# --- CATEGORY VIEWS ---

class CategoryListAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # По умолчанию DRF ищет 'pk', но мы можем переопределить на 'id' или 'category_id'
    lookup_field = 'id' 

# --- CUSTOM VIEW (Products by Category) ---

class CategoryProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('id')
        return Product.objects.filter(category_id=category_id)