from django.http import JsonResponse
from .models import Product, Category


# 🔹 все продукты
def products_list(request):
    products = Product.objects.all()

    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "description": p.description,
            "count": p.count,
            "is_active": p.is_active,
            "category": p.category.id
        }
        for p in products
    ]

    return JsonResponse(data, safe=False)


# 🔹 один продукт
def product_detail(request, id):
    try:
        p = Product.objects.get(id=id)

        data = {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "description": p.description,
            "count": p.count,
            "is_active": p.is_active,
            "category": p.category.id
        }

        return JsonResponse(data)

    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"})


# 🔹 все категории
def categories_list(request):
    categories = Category.objects.all()

    data = [{"id": c.id, "name": c.name} for c in categories]

    return JsonResponse(data, safe=False)


# 🔹 одна категория
def category_detail(request, id):
    try:
        c = Category.objects.get(id=id)

        data = {"id": c.id, "name": c.name}

        return JsonResponse(data)

    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"})


# 🔹 продукты по категории
def category_products(request, id):
    products = Product.objects.filter(category_id=id)

    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "description": p.description,
            "count": p.count,
            "is_active": p.is_active,
            "category": p.category.id
        }
        for p in products
    ]

    return JsonResponse(data, safe=False)