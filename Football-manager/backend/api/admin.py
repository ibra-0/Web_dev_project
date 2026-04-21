from django.contrib import admin
from .models import Club, Player, Match, Tournament, Transfer

admin.site.register(Club)
admin.site.register(Player)
admin.site.register(Match)
admin.site.register(Tournament)
admin.site.register(Transfer)