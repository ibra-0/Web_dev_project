# serializers.py
from rest_framework import serializers
from .models import Club, Player, Match, Tournament, Transfer

class ClubSerializer(serializers.ModelSerializer):
    logo = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    class Meta:
        model = Club
        fields = '__all__'
        extra_kwargs = {'created_by': {'read_only': True}}



class PlayerSerializer(serializers.ModelSerializer):
    club_name = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = ['id', 'name', 'position', 'rating', 'age', 'club', 'price', 'club_name', 'is_starting']

    def get_club_name(self, obj):
        if obj.club:
            return obj.club.name
        return "Free Agent"

class TransferSerializer(serializers.ModelSerializer):
    player_name = serializers.ReadOnlyField(source='player.name')
    from_club_name = serializers.ReadOnlyField(source='from_club.name')
    to_club_name = serializers.ReadOnlyField(source='to_club.name')

    class Meta:
        model = Transfer
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    tournament_name = serializers.ReadOnlyField(source='tournament.name', default="Товарищеский")
    home_team_name = serializers.ReadOnlyField(source='home_team.name', default="Unknown")
    away_team_name = serializers.ReadOnlyField(source='away_team.name', default="Unknown")

    class Meta:
        model = Match
        fields = '__all__'
class TournamentSerializer(serializers.ModelSerializer):
    teams = serializers.PrimaryKeyRelatedField(many=True, queryset=Club.objects.all())
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'prize_money', 'tournament_type', 'teams', 'is_finished', 'winner']

class BudgetUpdateSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    reason = serializers.CharField(max_length=200)

class MatchResultSerializer(serializers.Serializer):
    home_score = serializers.IntegerField()
    away_score = serializers.IntegerField()
    winner_name = serializers.CharField()