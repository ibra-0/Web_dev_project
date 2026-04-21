from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClubViewSet# Убедись, что эта строчка есть и она ПЕРЕД urlpatterns
from .views import (
    ClubViewSet,
    login, 
    register_user, 
    clubs, 
    delete_club,
    PlayerListAPIView, 
    PlayerDetailAPIView,
    MatchListAPIView, 
    TournamentViewSet, # Используем только этот класс для турниров
    transfers
)

router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
urlpatterns = [
    # Авторизация
    path('login/', login),
    
    path('signup/', register_user),
    
    # Клубы
 path('', include(router.urls)),
    
    # Игроки
    path('players/', PlayerListAPIView.as_view()),
    path('players/<int:pk>/', PlayerDetailAPIView.as_view()),
    
    # Трансферы
    path('transfers/', transfers),
    
    # Матчи и Турниры (используем .as_view(), так как это классы CBV)
   path('tournaments/', TournamentViewSet.as_view({'get': 'list', 'post': 'create'})),
    
    # Турниры: Детали и Удаление
    path('tournaments/<int:pk>/', TournamentViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'})),
    
    # Финиш турнира (уже есть у тебя)
    path('tournaments/<int:pk>/finish/', TournamentViewSet.as_view({'post': 'finish'})),

    path('matches/', MatchListAPIView.as_view()),


    path('register/', register_user, name='register'),
        ]