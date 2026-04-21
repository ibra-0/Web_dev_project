from urllib import request

from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Club, Player, Match, Tournament, Transfer
from .serializers import (
    ClubSerializer, PlayerSerializer, MatchSerializer, 
    TournamentSerializer, TransferSerializer
)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )

    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)

    token, _ = Token.objects.get_or_create(user=user)

    role = 'user'
    if user.is_superuser:
        role = 'superuser'
    elif user.is_staff:
        role = 'manager'

    club_id = None
    club_name = None

    if hasattr(user, 'managed_club') and user.managed_club:
        club_id = user.managed_club.id
        club_name = user.managed_club.name

    return Response({
        'token': token.key,
        'role': role,
        'club_id': club_id,
        'club_name': club_name
    })
@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def register_user(request):   
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')
    club_id = request.data.get('club_id')

    if not username or not password:
        return Response({"error": "Введите логин и пароль"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Пользователь уже существует"}, status=400)

    user = User.objects.create_user(username=username, password=password)

    if role == 'manager':
        user.is_staff = True  
        user.save()

        if not club_id:
            return Response({"error": "Выберите клуб"}, status=400)

        try:
            club = Club.objects.get(id=club_id)

            if club.manager:
                return Response({"error": "У клуба уже есть менеджер"}, status=400)

            club.manager = user
            club.save()

        except Club.DoesNotExist:
            return Response({"error": "Club not found"}, status=404)

    return Response({"message": "Registration successful"}, status=201)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def clubs(request):
    if request.method == 'GET':
        available_only = request.query_params.get('available')
        clubs = Club.objects.all()
        if available_only == 'true':
            clubs = clubs.filter(manager__isnull=True)
        else:
            clubs_list = Club.objects.all()

        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not request.user or not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

    serializer = ClubSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)
@api_view(['DELETE'])
def delete_club(request, id):
    try:
        club = Club.objects.get(id=id)
        club.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Club.DoesNotExist:
        return Response({"error": "Club not found"}, status=404)

class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

def partial_update(self, request, *args, **kwargs):
    player = self.get_object()

    if not request.user.is_superuser:
        if not hasattr(request.user, 'managed_club') or not request.user.managed_club:
            raise PermissionDenied("You don't have a club")

        if player.club != request.user.managed_club:
            raise PermissionDenied("You can't modify another club's player")

    return super().partial_update(request, *args, **kwargs)
    if new_is_starting is True or new_is_starting == 'true':
            club = player.club

            starting_players = Player.objects.filter(club=club, is_starting=True).exclude(id=player.id)

            if starting_players.count() >= 11:
                return Response(
                    {'error': 'Only 11 players can be marked as starting'},
                    status=400
                )

            limits = {
                'GK': 1,
                'LB': 1,
                'RB': 1,
                'CB': 2,
                'CDM': 1,
                'CM': 2,
                'LW': 1,
                'ST': 1,
                'RW': 1
            }

            same_position_count = starting_players.filter(position=new_position).count()

            if new_position in limits and same_position_count >= limits[new_position]:
                return Response(
                    {'error': f'Too many players on position {new_position}'},
                    status=400
                )


class PlayerListAPIView(generics.ListCreateAPIView):
    serializer_class = PlayerSerializer
    # Общая база для всех
    queryset = Player.objects.all()

    def get_queryset(self):
        queryset = Player.objects.all()
        club_id = self.request.query_params.get('club')
        if club_id and club_id not in ['null', 'undefined']:
            queryset = queryset.filter(club_id=club_id)
        return queryset

class PlayerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class MatchListAPIView(generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Match.objects.all().order_by('-id')
       #queryset = Match.objects.all().order_by('-date')
        #t_id = self.request.query_params.get('tournament')
        #if t_id:
         #   queryset = queryset.filter(tournament_id=t_id)
        #turn queryset



class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    @action(detail=True, methods=['post'])
    def finish(self, request, pk=None):
        tournament = self.get_object()
        winner_id = request.data.get('winner_id')
        
        if tournament.is_finished:
            return Response({'error': 'Tournament already finished'}, status=400)
            
        try:
            club = Club.objects.get(id=winner_id)
            club.budget += tournament.prize_money
            club.save()
            
            tournament.is_finished = True
            tournament.winner = club
            tournament.save()
            
            return Response({'message': f'Winner: {club.name}. Prizes paid.'})
        except Club.DoesNotExist:
            return Response({'error': 'Club not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_transfer(request):
    player_id = request.data.get('player_id')
    target_club_id = request.data.get('club_id')

    try:
        player = Player.objects.get(id=player_id)
        target_club = Club.objects.get(id=target_club_id)
    except:
        return Response({"error": "Player or club not found"}, status=404)

    if not request.user.is_superuser:
        if not hasattr(request.user, 'managed_club') or not request.user.managed_club:
            raise PermissionDenied("You don't have a club")

        if request.user.managed_club.id != target_club.id:
            raise PermissionDenied("You can only buy players for your own club")

    price = player.price

    if target_club.budget < price:
        return Response({"error": "Insufficient budget"}, status=400)

    target_club.budget -= price
    target_club.save()

    if player.club:
        from_club = player.club
        from_club.budget += price
        from_club.save()

    Transfer.objects.create(
        player=player,
        from_club=player.club,
        to_club=target_club,
        price=price
    )

    player.club = target_club
    player.save()

    return Response({"message": "Transfer successful"})
@api_view(['GET', 'POST'])
def transfers(request):
    if request.method == 'POST':
        player_id = request.data.get('player_id')
        to_club_id = request.data.get('to_club_id')
        price = request.data.get('price')

        try:
            player = Player.objects.get(id=player_id)
            to_club = Club.objects.get(id=to_club_id)

            if to_club.budget < price:
                return Response({"error": "Insufficient budget"}, status=400)
            
            to_club.budget -= price
            to_club.save()
            
            if player.club:
                from_club = player.club
                from_club.budget += price
                from_club.save()

            Transfer.objects.create(
                player=player,
                from_club=player.club,
                to_club=to_club,
                price=price
            )

            player.club = to_club
            player.save()
            
            return Response({"message": "Transfer successful"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
    
    data = Transfer.objects.all().order_by('-date')
    return Response(TransferSerializer(data, many=True).data)

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]