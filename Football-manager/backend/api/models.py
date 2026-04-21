from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Club(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    budget = models.DecimalField(max_digits=15, decimal_places=2, default=10000000)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    manager = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='managed_club'
    )

    def __str__(self):
        return self.name

class Player(models.Model):
    name = models.CharField(max_length=100)
    POSITION_CHOICES = [
        ('GK', 'Goalkeeper'),
        ('CB', 'Center Back'),
        ('LB', 'Left Back'),
        ('RB', 'Right Back'),
        ('CDM', 'Defensive Midfielder'),
        ('CM', 'Central Midfielder'),
        ('CAM', 'Attacking Midfielder'),
        ('LM', 'Left Midfielder'),
        ('RM', 'Right Midfielder'),
        ('LW', 'Left Winger'),
        ('RW', 'Right Winger'),
        ('ST', 'Striker'),
        ('CF', 'Center Forward'),
    ]


    name = models.CharField(max_length=100)
    position = models.CharField(
        max_length=10, 
        choices=POSITION_CHOICES, 
        default='ST'
    )    
    rating = models.IntegerField()
    age = models.IntegerField()
    club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, related_name='players')
    price = models.IntegerField(default=0)
    is_starting = models.BooleanField(default=False)
    def __str__(self):
       return f"{self.name} ({self.position})"
    
TOURNAMENT_TYPES = [
    ('league', 'League'),
    ('playoff', 'Play-off'),
]

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    prize_money = models.IntegerField(default=0)
    tournament_type = models.CharField(
        max_length=10, 
        choices=TOURNAMENT_TYPES, 
        default='league'
    )
    teams = models.ManyToManyField('Club', related_name='tournaments')
    created_at = models.DateTimeField(auto_now_add=True)
    is_finished = models.BooleanField(default=False) 
    winner = models.ForeignKey('Club', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, null=True, blank=True)
    home_team = models.ForeignKey(Club, related_name='home_matches', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Club, related_name='away_matches', on_delete=models.CASCADE)
    home_score = models.IntegerField(default=0)
    away_score = models.IntegerField(default=0)
    is_played = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"

class Transfer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    # Добавь null=True, blank=True здесь:
    from_club = models.ForeignKey(Club, on_delete=models.SET_NULL, null=True, blank=True, related_name='transfers_out')
    to_club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='transfers_in')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

