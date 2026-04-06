from django.urls import path
from api import views

urlpatterns = [
    # Products
    path('products/', views.ProductListAPIView.as_view()),
    path('products/<int:product_id>/', views.ProductDetailAPIView.as_view()),
    
    # Categories
    path('categories/', views.CategoryListAPIView.as_view()),
    path('categories/<int:id>/', views.CategoryDetailAPIView.as_view()),
    
    # Products in specific category
    path('categories/<int:id>/products/', views.CategoryProductsAPIView.as_view()),
]